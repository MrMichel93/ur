import { getMatchConfig } from '@/logic/matchConfigs';
import { applyMove, createInitialState, getValidMoves } from '@/logic/engine';
import { getPathLength } from '@/logic/pathVariants';

describe('engine variants', () => {
  it('creates reduced-piece matches from the centralized mode config', () => {
    const threePieceState = createInitialState(getMatchConfig('gameMode_3_pieces'));

    expect(threePieceState.matchConfig.modeId).toBe('gameMode_3_pieces');
    expect(threePieceState.light.pieces).toHaveLength(3);
    expect(threePieceState.dark.pieces).toHaveLength(3);
  });

  it('supports the full-path variant without altering the default path', () => {
    const fullPathConfig = getMatchConfig('gameMode_full_path');
    const state = createInitialState(fullPathConfig);
    const fullPathLength = getPathLength(fullPathConfig.pathVariant);

    state.currentTurn = 'light';
    state.phase = 'moving';
    state.rollValue = 1;
    state.light.pieces[0].position = fullPathLength - 1;

    const moves = getValidMoves(state, 1);

    expect(moves).toContainEqual({
      pieceId: state.light.pieces[0].id,
      fromIndex: fullPathLength - 1,
      toIndex: fullPathLength,
    });

    const next = applyMove(state, moves[0]!);
    expect(next.light.finishedCount).toBe(1);
    expect(next.light.pieces[0].isFinished).toBe(true);
    expect(next.matchConfig.pathVariant).toBe('full-path');
  });
});
