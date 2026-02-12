import { hasNakamaConfig, isNakamaEnabled } from '@/config/nakama';
import { cancelMatchmaking, findMatch } from '@/services/matchmaking';
import { useGameStore } from '@/store/useGameStore';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export const useMatchmaking = () => {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'searching' | 'matched' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const initGame = useGameStore(state => state.initGame);
    const setMatchId = useGameStore(state => state.setMatchId);
    const setNakamaSession = useGameStore(state => state.setNakamaSession);
    const setUserId = useGameStore(state => state.setUserId);
    const setSocketState = useGameStore(state => state.setSocketState);
    const setOnlineMode = useGameStore(state => state.setOnlineMode);
    const setPlayerColor = useGameStore(state => state.setPlayerColor);
    const router = useRouter();

    useEffect(() => {
        return () => {
            void cancelMatchmaking();
        };
    }, []);

    const startMatch = async () => {
        setErrorMessage(null);
        setStatus('connecting');
        setSocketState('connecting');
        setPlayerColor(null);
        try {
            await cancelMatchmaking();

            if (!isNakamaEnabled() || !hasNakamaConfig()) {
                setOnlineMode('offline');
                const localMatchId = `local-${Date.now()}`;
                setMatchId(localMatchId);
                initGame(localMatchId);
                setSocketState('connected');
                setStatus('matched');
                router.push(`/match/${localMatchId}?offline=1`);
                return;
            }

            setOnlineMode('nakama');
            const result = await findMatch({
                onSearching: () => setStatus('searching')
            });
            setNakamaSession(result.session);
            setUserId(result.userId);
            setMatchId(result.matchId);
            initGame(result.matchId);
            setPlayerColor(result.playerColor);
            setSocketState('connected');
            setStatus('matched');
            router.push(`/match/${result.matchId}`);
        } catch (e) {
            await cancelMatchmaking();
            const message = e instanceof Error ? e.message : 'Unable to find a match.';
            setErrorMessage(message);
            setStatus('error');
            setSocketState('error');
        }
    };

    return { startMatch, status, errorMessage };
};
