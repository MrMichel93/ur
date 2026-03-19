import React, { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getTransportMode } from '@/config/nakama';
import { getUserProgression } from '@/services/progression';
import { useAuth } from '@/src/auth/useAuth';
import type { User } from '@/src/types/user';
import { useGameStore } from '@/store/useGameStore';
import type { ProgressionSnapshot } from '@/shared/progression';

export type ProgressionStatus = 'idle' | 'loading' | 'ready' | 'error' | 'unsupported';

export type ProgressionContextValue = {
  progression: ProgressionSnapshot | null;
  status: ProgressionStatus;
  errorMessage: string | null;
  unsupportedMessage: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  refresh: (options?: { silent?: boolean }) => Promise<ProgressionSnapshot | null>;
};

export const ProgressionContext = createContext<ProgressionContextValue | undefined>(undefined);

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Unable to load progression right now.';

const getUnsupportedMessage = (user: User | null): string | null => {
  if (!user) {
    return null;
  }

  if (getTransportMode() !== 'nakama') {
    return 'XP tracking is disabled while the app is running in offline mode. Connect to the live Nakama server to load progression.';
  }

  if (!user.nakamaUserId) {
    return 'This local guest session is not connected to the live XP service. Sign in with Google or use an online account to load progression.';
  }

  return null;
};

export const ProgressionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const lastProgressionAward = useGameStore((state) => state.lastProgressionAward);
  const [progression, setProgression] = useState<ProgressionSnapshot | null>(null);
  const [status, setStatus] = useState<ProgressionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unsupportedMessage, setUnsupportedMessage] = useState<string | null>(null);
  const activeUserIdRef = useRef<string | null>(null);
  const appliedAwardKeyRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);

  const resetState = useCallback(() => {
    requestIdRef.current += 1;
    activeUserIdRef.current = null;
    appliedAwardKeyRef.current = null;
    setProgression(null);
    setStatus('idle');
    setErrorMessage(null);
    setUnsupportedMessage(null);
  }, []);

  const refresh = useCallback(
    async (options?: { silent?: boolean }): Promise<ProgressionSnapshot | null> => {
      if (!user) {
        resetState();
        return null;
      }

      const nextUnsupportedMessage = getUnsupportedMessage(user);
      if (nextUnsupportedMessage) {
        requestIdRef.current += 1;
        activeUserIdRef.current = user.id;
        setProgression(null);
        setStatus('unsupported');
        setErrorMessage(null);
        setUnsupportedMessage(nextUnsupportedMessage);
        return null;
      }

      requestIdRef.current += 1;
      const requestId = requestIdRef.current;

      setErrorMessage(null);
      setUnsupportedMessage(null);
      if (!options?.silent || !progression) {
        setStatus('loading');
      }

      try {
        const nextProgression = await getUserProgression();

        if (requestIdRef.current !== requestId) {
          return null;
        }

        activeUserIdRef.current = user.id;
        setProgression(nextProgression);
        setStatus('ready');
        setUnsupportedMessage(null);
        return nextProgression;
      } catch (error) {
        if (requestIdRef.current !== requestId) {
          return null;
        }

        setErrorMessage(getErrorMessage(error));
        setStatus(progression ? 'ready' : 'error');
        return null;
      }
    },
    [progression, resetState, user],
  );

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user) {
      resetState();
      return;
    }

    if (activeUserIdRef.current !== user.id) {
      void refresh();
    }
  }, [isAuthLoading, refresh, resetState, user]);

  useEffect(() => {
    if (!user || !lastProgressionAward) {
      return;
    }

    if (getUnsupportedMessage(user)) {
      return;
    }

    const awardKey = `${lastProgressionAward.matchId}:${lastProgressionAward.newTotalXp}`;
    if (appliedAwardKeyRef.current === awardKey) {
      return;
    }

    appliedAwardKeyRef.current = awardKey;
    activeUserIdRef.current = user.id;
    requestIdRef.current += 1;
    setProgression(lastProgressionAward.progression);
    setStatus('ready');
    setErrorMessage(null);
    setUnsupportedMessage(null);
  }, [lastProgressionAward, user]);

  const value = useMemo<ProgressionContextValue>(
    () => ({
      progression,
      status,
      errorMessage,
      unsupportedMessage,
      isLoading: status === 'loading' && !progression,
      isRefreshing: status === 'loading' && Boolean(progression),
      refresh,
    }),
    [errorMessage, progression, refresh, status, unsupportedMessage],
  );

  return <ProgressionContext.Provider value={value}>{children}</ProgressionContext.Provider>;
};
