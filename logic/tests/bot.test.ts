import { getBotMove } from '@/logic/bot/bot';
import { PATH_LENGTH } from '@/logic/constants';
import { createInitialState } from '@/logic/engine';
import { GameState, PlayerColor } from '@/logic/types';

const setActivePieces = (state: GameState, color: PlayerColor, positions: Record<number, number>) => {
  const player = state[color];

  player.finishedCount = 0;
  player.pieces.forEach((piece, index) => {
    const position = positions[index];
    if (position === undefined) {
      piece.position = PATH_LENGTH;
      piece.isFinished = true;
      return;
    }

    piece.position = position;
    piece.isFinished = position >= PATH_LENGTH;
    if (piece.isFinished) {
      player.finishedCount += 1;
    }
  });
};

describe('bot difficulty selection', () => {
  it('easy returns the only legal move when there is no choice', () => {
    const state = createInitialState();
    state.currentTurn = 'dark';
    state.phase = 'moving';
    state.rollValue = 1;

    setActivePieces(state, 'dark', { 0: PATH_LENGTH - 1 });
    setActivePieces(state, 'light', {});

    expect(getBotMove(state, 1, 'easy')).toEqual({
      pieceId: state.dark.pieces[0].id,
      fromIndex: PATH_LENGTH - 1,
      toIndex: PATH_LENGTH,
    });
  });

  it('medium, hard, and perfect all prioritize an immediate capture over a quiet move', () => {
    const state = createInitialState();
    state.currentTurn = 'dark';
    state.phase = 'moving';
    state.rollValue = 1;

    setActivePieces(state, 'dark', {
      0: 4,
      1: 0,
    });
    setActivePieces(state, 'light', {
      0: 5,
    });

    const expectedMove = {
      pieceId: state.dark.pieces[0].id,
      fromIndex: 4,
      toIndex: 5,
    };

    expect(getBotMove(state, 1, 'medium')).toEqual(expectedMove);
    expect(getBotMove(state, 1, 'hard')).toEqual(expectedMove);
    expect(getBotMove(state, 1, 'perfect')).toEqual(expectedMove);
  });
});
