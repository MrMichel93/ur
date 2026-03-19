import { createInitialState } from "../logic/engine";
import { CHALLENGE_IDS, calculateComebackCheckpoint } from "./challenges";
import { evaluateChallengesForMatchSummary } from "../backend/modules/challenges";

describe("challenge helpers", () => {
  it("flags deterministic comeback checkpoints when progress or borne-off deficit exists", () => {
    const state = createInitialState();
    state.light.pieces[0].position = 0;
    state.dark.pieces[0].position = 6;
    state.dark.finishedCount = 1;
    state.dark.pieces[1].position = 14;
    state.dark.pieces[1].isFinished = true;

    const checkpoint = calculateComebackCheckpoint(state, "light");

    expect(checkpoint.wasBehind).toBe(true);
    expect(checkpoint.reasons).toEqual(expect.arrayContaining(["progress_deficit", "borne_off_deficit"]));
  });

  it("evaluates the configured challenge list from a normalized summary", () => {
    const completed = evaluateChallengesForMatchSummary({
      matchId: "match-1",
      playerUserId: "user-1",
      opponentType: "hard_bot",
      didWin: true,
      totalMoves: 72,
      playerMoveCount: 36,
      piecesLost: 0,
      maxRollCount: 3,
      capturesMade: 3,
      capturesSuffered: 0,
      contestedTilesLandedCount: 4,
      borneOffCount: 7,
      opponentBorneOffCount: 5,
      wasBehindDuringMatch: true,
      behindCheckpointCount: 2,
      behindReasons: ["progress_deficit"],
      timestamp: "2026-03-19T12:00:00.000Z",
    });

    expect(completed).toEqual(
      expect.arrayContaining([
        CHALLENGE_IDS.FIRST_VICTORY,
        CHALLENGE_IDS.FAST_FINISH,
        CHALLENGE_IDS.SAFE_PLAY,
        CHALLENGE_IDS.LUCKY_ROLL,
        CHALLENGE_IDS.CAPTURE_MASTER,
        CHALLENGE_IDS.COMEBACK_WIN,
        CHALLENGE_IDS.RISK_TAKER,
        CHALLENGE_IDS.BEAT_HARD_BOT,
      ])
    );
    expect(completed).not.toContain(CHALLENGE_IDS.HOME_STRETCH);
    expect(completed).not.toContain(CHALLENGE_IDS.BEAT_PERFECT_BOT);
  });

  it("allows Capture Master without requiring a win", () => {
    const completed = evaluateChallengesForMatchSummary({
      matchId: "match-2",
      playerUserId: "user-1",
      opponentType: "human",
      didWin: false,
      totalMoves: 112,
      playerMoveCount: 55,
      piecesLost: 2,
      maxRollCount: 1,
      capturesMade: 3,
      capturesSuffered: 2,
      contestedTilesLandedCount: 1,
      borneOffCount: 5,
      opponentBorneOffCount: 7,
      wasBehindDuringMatch: false,
      behindCheckpointCount: 0,
      behindReasons: [],
      timestamp: "2026-03-19T12:05:00.000Z",
    });

    expect(completed).toEqual([CHALLENGE_IDS.CAPTURE_MASTER]);
  });
});
