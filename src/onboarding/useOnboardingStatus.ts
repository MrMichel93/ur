import { useAuth } from '@/src/auth/useAuth';

export const useOnboardingStatus = () => {
  const {
    usernameOnboardingStatus,
    isUsernameOnboardingLoading,
    usernameOnboardingError,
    isUsernameOnboardingRequired,
    refreshUsernameOnboardingStatus,
    claimUsername,
  } = useAuth();

  return {
    status: usernameOnboardingStatus,
    isLoading: isUsernameOnboardingLoading,
    errorMessage: usernameOnboardingError,
    requiresOnboarding: isUsernameOnboardingRequired,
    refresh: refreshUsernameOnboardingStatus,
    claimUsername,
  };
};
