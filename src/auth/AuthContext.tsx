import { createContext } from 'react';

import type {
  ClaimUsernameRpcResponse,
  UsernameOnboardingStatusRpcResponse,
} from '@/shared/usernameOnboarding';
import { User } from '@/src/types/user';

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  usernameOnboardingStatus: UsernameOnboardingStatusRpcResponse | null;
  isUsernameOnboardingLoading: boolean;
  usernameOnboardingError: string | null;
  isUsernameOnboardingRequired: boolean;
  refreshUsernameOnboardingStatus: () => Promise<UsernameOnboardingStatusRpcResponse | null>;
  claimUsername: (username: string) => Promise<ClaimUsernameRpcResponse>;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  linkGoogleAccount: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
