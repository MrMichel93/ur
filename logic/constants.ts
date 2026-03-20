import { Coordinates, TileNode } from './types';
import { DEFAULT_PATH_VARIANT, getPathVariantDefinition } from './pathVariants';

export const BOARD_ROWS = 3;
export const BOARD_COLS = 8;

export const ROSETTES: Coordinates[] = [
    { row: 0, col: 0 },
    { row: 2, col: 0 },
    { row: 1, col: 3 }, // The central war rosette
    { row: 0, col: 6 },
    { row: 2, col: 6 },
];

export const SAFE_ZONE_COORDS: Coordinates[] = [
    { row: 0, col: 4 }, { row: 0, col: 5 },
    { row: 2, col: 4 }, { row: 2, col: 5 },
];

// Path Definitions: Sequence of coordinates for each player
// 0: Start (4, 3, 2, 1, 0) - wait, standard is 4,3,2,1,0 for the first block?
// Let's us standard Ur path:
// 4 tiles in player row (from right to left? or left to right?)
// Rules say: Starts off-board -> (2,3) to (2,0) -> (1,0) to (1,7) -> (2,7) to (2,6) -> Finish.
// Wait, my spec said:
// Light (Bottom/Row 2): (2,3)->(2,0) then (1,0)->(1,7) then (2,7)->(2,6)
// Dark (Top/Row 0): (0,3)->(0,0) then (1,0)->(1,7) then (0,7)->(0,6)

const DEFAULT_PATH_DEFINITION = getPathVariantDefinition(DEFAULT_PATH_VARIANT);

export const PATH_LIGHT: Coordinates[] = DEFAULT_PATH_DEFINITION.light;

export const PATH_DARK: Coordinates[] = DEFAULT_PATH_DEFINITION.dark;

export const PATH_LENGTH = DEFAULT_PATH_DEFINITION.pathLength;
// Valid indices are 0 to 13. 
// A move equal to 14 bears off.

export const isRosette = (r: number, c: number) =>
    ROSETTES.some(coord => coord.row === r && coord.col === c);

export const isWarZone = (r: number, c: number) =>
    r === 1; // Middle row is war zone
