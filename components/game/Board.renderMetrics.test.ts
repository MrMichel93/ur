import { getBoardPieceRenderMetrics } from './Board';
import { PIECE_ART_VISIBLE_COVERAGE } from './Piece';

describe('getBoardPieceRenderMetrics', () => {
  it.each([
    { viewportWidth: 390, boardScale: 1, orientation: 'vertical' as const },
    { viewportWidth: 768, boardScale: 1, orientation: 'vertical' as const },
    { viewportWidth: 1280, boardScale: 0.94, orientation: 'vertical' as const },
    { viewportWidth: 1024, boardScale: 1, orientation: 'horizontal' as const },
  ])(
    'targets 75% visible tile coverage for %o',
    ({ viewportWidth, boardScale, orientation }) => {
      const metrics = getBoardPieceRenderMetrics({ viewportWidth, boardScale, orientation });

      expect(metrics.pixelSize).toBeGreaterThanOrEqual(18);
      expect(metrics.artScale * PIECE_ART_VISIBLE_COVERAGE).toBeCloseTo(0.75, 5);
      expect(metrics.artOffsetY).toBeCloseTo(metrics.pixelSize * metrics.artScale * 0.02, 2);
      expect(metrics.artOffsetY).toBeGreaterThan(0);
    },
  );
});
