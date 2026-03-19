import { CHALLENGE_DEFINITIONS } from "../../shared/challenges";
import { ensureChallengeDefinitions } from "./challenges";

describe("ensureChallengeDefinitions", () => {
  it("retries after a version conflict and succeeds once the definitions are already synced", () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
    };

    const staleObjects = CHALLENGE_DEFINITIONS.map((definition) => ({
      collection: "challenge_definitions",
      key: definition.id,
      value: {
        ...definition,
        rewardXp: definition.rewardXp + 1,
      },
      version: `v-${definition.id}`,
    }));

    const syncedObjects = CHALLENGE_DEFINITIONS.map((definition) => ({
      collection: "challenge_definitions",
      key: definition.id,
      value: {
        ...definition,
        syncedAt: "2026-03-19T20:00:00.000Z",
      },
      version: `v2-${definition.id}`,
    }));

    const nk = {
      storageRead: jest
        .fn()
        .mockReturnValueOnce(staleObjects)
        .mockReturnValueOnce(syncedObjects),
      storageWrite: jest.fn().mockImplementationOnce(() => {
        throw new Error("Storage write rejected - version check failed.");
      }),
    };

    expect(() => ensureChallengeDefinitions(nk, logger)).not.toThrow();
    expect(nk.storageRead).toHaveBeenCalledTimes(2);
    expect(nk.storageWrite).toHaveBeenCalledTimes(1);
    expect(logger.warn).toHaveBeenCalledWith(
      "Challenge definition sync attempt %d/%d failed: %s",
      1,
      4,
      "Storage write rejected - version check failed."
    );
  });
});
