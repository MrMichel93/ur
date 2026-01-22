# Specification: Agent Implementation Strategy

## Overview
This file outlines the step-by-step prompts and execution order to achieve the "Target UI" defined in `03_ui_design_system.md`.

## Phase 1: The Asset Factory
*Goal: Build the visual building blocks in isolation.*

**Prompt for Agent**:
"Focusing on `components/ui/`, create the following pure UI components using NativeWind and `react-native-svg`:
1.  `WoodBackground`: A reusable container with the vertical dark plank texture.
2.  `TileBase`: A square component with a wood texture and an inner bevel (shadow-top-left, highlight-bottom-right).
3.  `ZigZagBorder`: An SVG pattern strip (Red/Cream triangles) to be used as a border.
4.  `RosetteIcon`: The 8-pointed star SVG.
5.  `Piece3D`: A circular component using Radial Gradients to look like a sphere."

## Phase 2: The Board Assembly
*Goal: Apply the assets to the Game Board.*

**Prompt for Agent**:
"Now, update the main `Board.tsx` component:
1.  Wrap the entire board in the `ZigZagBorder` pattern.
2.  Replace the existing grid cells with your `TileBase` component.
3.  Conditionally render the `RosetteIcon` SVG inside the tile if `isRosette` is true.
4.  Ensure the board floats above the background using `elevation-10` or `shadow-2xl`."

## Phase 3: The Polish
*Goal: Final touches.*

**Prompt for Agent**:
"Refine the HUD (Heads Up Display):
1.  Convert the 'Piece Counts' into a visual stack of your `Piece3D` components.
2.  Style the Dice Roll area to use the Tetrahedron shape.
3.  Apply the custom font to the 'Score' and 'Turn' indicators."
