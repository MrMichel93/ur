export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 16;
export const USERNAME_ALLOWED_PATTERN = /^[A-Za-z0-9_]+$/;

export type UsernameValidationResult = {
  input: string;
  trimmed: string;
  display: string;
  canonical: string;
  isValid: boolean;
  errorMessage: string | null;
};

export type UsernameOnboardingStatusRpcRequest = {
  displayNameHint?: string | null;
  emailHint?: string | null;
};

export type UsernameOnboardingStatusRpcResponse = {
  onboardingComplete: boolean;
  currentUsername: string | null;
  suggestedUsername: string | null;
};

export type ClaimUsernameRpcRequest = {
  username: string;
};

export type ClaimUsernameErrorCode =
  | 'INVALID_USERNAME'
  | 'USERNAME_TAKEN'
  | 'USERNAME_ALREADY_SET'
  | 'SERVER_ERROR';

export type ClaimUsernameSuccessResponse = {
  success: true;
  usernameDisplay: string;
  onboardingComplete: true;
};

export type ClaimUsernameErrorResponse = {
  success: false;
  errorCode: ClaimUsernameErrorCode;
  errorMessage: string;
};

export type ClaimUsernameRpcResponse = ClaimUsernameSuccessResponse | ClaimUsernameErrorResponse;

export const normalizeUsernameInput = (input: string): Omit<UsernameValidationResult, 'isValid' | 'errorMessage'> => {
  const trimmed = input.trim();

  return {
    input,
    trimmed,
    display: trimmed,
    canonical: trimmed.toLowerCase(),
  };
};

export const validateUsername = (input: string): UsernameValidationResult => {
  const normalized = normalizeUsernameInput(input);

  if (normalized.trimmed.length === 0) {
    return {
      ...normalized,
      isValid: false,
      errorMessage: 'Username is required.',
    };
  }

  if (
    normalized.trimmed.length < USERNAME_MIN_LENGTH ||
    normalized.trimmed.length > USERNAME_MAX_LENGTH
  ) {
    return {
      ...normalized,
      isValid: false,
      errorMessage: 'Username must be 3-16 characters long.',
    };
  }

  if (!USERNAME_ALLOWED_PATTERN.test(normalized.trimmed)) {
    return {
      ...normalized,
      isValid: false,
      errorMessage: 'Username can only contain letters, numbers, and underscores.',
    };
  }

  return {
    ...normalized,
    isValid: true,
    errorMessage: null,
  };
};

export const sanitizeUsernameSuggestionBase = (input: string): string => {
  const trimmed = input.trim();
  if (!trimmed) {
    return '';
  }

  return trimmed
    .replace(/[\s-]+/g, '_')
    .replace(/[^A-Za-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, USERNAME_MAX_LENGTH);
};

export const isUsernameOnboardingStatusResponse = (
  value: unknown,
): value is UsernameOnboardingStatusRpcResponse => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<UsernameOnboardingStatusRpcResponse>;
  return (
    typeof candidate.onboardingComplete === 'boolean' &&
    (typeof candidate.currentUsername === 'string' || candidate.currentUsername === null) &&
    (typeof candidate.suggestedUsername === 'string' || candidate.suggestedUsername === null)
  );
};

export const isClaimUsernameRpcResponse = (value: unknown): value is ClaimUsernameRpcResponse => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<ClaimUsernameRpcResponse>;
  if (candidate.success === true) {
    return (
      typeof candidate.usernameDisplay === 'string' &&
      candidate.onboardingComplete === true
    );
  }

  if (candidate.success === false) {
    return (
      typeof candidate.errorCode === 'string' &&
      typeof candidate.errorMessage === 'string'
    );
  }

  return false;
};
