import './index';

type RuntimeGlobals = typeof globalThis & {
  rpcGetUsernameOnboardingStatus: (
    ctx: { userId?: string | null },
    logger: { info: jest.Mock; warn: jest.Mock; error?: jest.Mock },
    nk: {
      storageRead: jest.Mock;
      storageWrite: jest.Mock;
    },
    payload: string,
  ) => string;
  rpcClaimUsername: (
    ctx: { userId?: string | null },
    logger: { info: jest.Mock; warn: jest.Mock; error?: jest.Mock },
    nk: {
      storageRead: jest.Mock;
      storageWrite: jest.Mock;
    },
    payload: string,
  ) => string;
  rpcCreatePrivateMatch: (
    ctx: { userId?: string | null },
    logger: { info: jest.Mock; warn: jest.Mock; error?: jest.Mock },
    nk: {
      storageRead: jest.Mock;
      storageWrite: jest.Mock;
      matchCreate: jest.Mock;
    },
    payload: string,
  ) => string;
};

type StoredObject = {
  collection: string;
  key: string;
  userId: string;
  version: string;
  value: unknown;
};

const makeStorageKey = (collection: string, key: string, userId = ''): string =>
  `${collection}:${key}:${userId}`;

const createRuntimeStorage = () => {
  const storage = new Map<string, StoredObject>();
  let versionCounter = 0;

  const nk = {
    storageRead: jest.fn((requests: { collection: string; key: string; userId?: string }[]) =>
      requests
        .map((request) => storage.get(makeStorageKey(request.collection, request.key, request.userId ?? '')))
        .filter(Boolean),
    ),
    storageWrite: jest.fn(
      (
        writes: {
          collection: string;
          key: string;
          userId?: string;
          value: unknown;
          version?: string;
        }[],
      ) => {
        writes.forEach((write) => {
          const userId = write.userId ?? '';
          const storageKey = makeStorageKey(write.collection, write.key, userId);
          const existing = storage.get(storageKey);
          const requestedVersion = write.version ?? '';

          if (requestedVersion === '*') {
            if (existing) {
              throw new Error(`Storage object already exists for ${storageKey}`);
            }
          } else if (requestedVersion && (!existing || existing.version !== requestedVersion)) {
            throw new Error(`Storage version mismatch for ${storageKey}`);
          }

          versionCounter += 1;
          storage.set(storageKey, {
            collection: write.collection,
            key: write.key,
            userId,
            version: `version-${versionCounter}`,
            value: write.value,
          });
        });
      },
    ),
    matchCreate: jest.fn(() => 'match-1'),
  };

  return {
    storage,
    nk,
  };
};

describe('username onboarding RPCs', () => {
  const runtime = globalThis as RuntimeGlobals;
  const logger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns onboarding status with a backend-generated username suggestion', () => {
    const { storage, nk } = createRuntimeStorage();

    const response = runtime.rpcGetUsernameOnboardingStatus(
      { userId: 'google-user-1' },
      logger,
      nk,
      JSON.stringify({
        displayNameHint: 'Michel',
        emailHint: 'michel@example.com',
      }),
    );

    expect(JSON.parse(response)).toEqual({
      onboardingComplete: false,
      currentUsername: null,
      suggestedUsername: 'Michel',
    });

    const storedProfile = storage.get(makeStorageKey('user_profile', 'profile', 'google-user-1'));
    expect(storedProfile?.value).toEqual(
      expect.objectContaining({
        userId: 'google-user-1',
        usernameDisplay: null,
        usernameCanonical: null,
        onboardingComplete: false,
        authProvider: 'google',
      }),
    );
  });

  it('claims a username and rejects case-insensitive duplicates', () => {
    const firstUserRuntime = createRuntimeStorage();

    const firstClaim = JSON.parse(
      runtime.rpcClaimUsername(
        { userId: 'google-user-1' },
        logger,
        firstUserRuntime.nk,
        JSON.stringify({ username: 'Royal_One' }),
      ),
    );

    expect(firstClaim).toEqual({
      success: true,
      usernameDisplay: 'Royal_One',
      onboardingComplete: true,
    });

    const profileObject = firstUserRuntime.storage.get(makeStorageKey('user_profile', 'profile', 'google-user-1'));
    expect(profileObject?.value).toEqual(
      expect.objectContaining({
        userId: 'google-user-1',
        usernameDisplay: 'Royal_One',
        usernameCanonical: 'royal_one',
        onboardingComplete: true,
      }),
    );

    const usernameIndexObject = firstUserRuntime.storage.get(
      makeStorageKey('username_canonical_index', 'royal_one', '00000000-0000-0000-0000-000000000000'),
    );
    expect(usernameIndexObject?.value).toEqual(
      expect.objectContaining({
        userId: 'google-user-1',
        usernameDisplay: 'Royal_One',
        usernameCanonical: 'royal_one',
      }),
    );

    const duplicateClaim = JSON.parse(
      runtime.rpcClaimUsername(
        { userId: 'google-user-2' },
        logger,
        firstUserRuntime.nk,
        JSON.stringify({ username: 'royal_one' }),
      ),
    );

    expect(duplicateClaim).toEqual({
      success: false,
      errorCode: 'USERNAME_TAKEN',
      errorMessage: 'That username is already taken.',
    });
  });

  it('blocks multiplayer RPCs once a Google onboarding profile exists but is incomplete', () => {
    const { nk } = createRuntimeStorage();

    runtime.rpcGetUsernameOnboardingStatus(
      { userId: 'google-user-1' },
      logger,
      nk,
      JSON.stringify({ displayNameHint: 'Michel' }),
    );

    expect(() =>
      runtime.rpcCreatePrivateMatch(
        { userId: 'google-user-1' },
        logger,
        nk,
        JSON.stringify({ modeId: 'standard' }),
      ),
    ).toThrow('Choose a username before accessing multiplayer or social features.');
  });
});
