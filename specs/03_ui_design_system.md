# Specification: UI/UX & Design System

## 1. Theme Philosophy: "The Museum Artifact"
The UI must simulate a physical object—specifically the "Royal Game of Ur" artifact. The user is not interacting with an app; they are looking down at a wooden board with inlaid tiles.
* **Core Aesthetic**: Skeuomorphic, Tactile, Historical.
* **Vibe**: A dimly lit museum display case. High contrast between the board and the background.

## 2. Technical Stack & Styling Strategy
* **Framework**: React Native (Expo).
* **Styling**: NativeWind (Tailwind CSS) + `react-native-svg` for patterns.
* **Constraint**: NO layout resizing that breaks game logic. Visuals only.

## 3. Materials & Palette (UPDATED)
The aesthetic targets a "Carved Wood" look rather than "Lapis & Ivory".

### A. The Environment (App Background)
* **Texture**: Vertical Wood Planks.
* **Color**: Dark Blue-Grey Stained Wood (`bg-[#1e293b]` with black vertical grain lines).
* **Vibe**: Tabletop surface.

### B. The Board (Container)
* **Material**: Medium Oak/Wood.
* **Border**: "The Zig-Zag Inlay". A distinct decorative border pattern consisting of repeating red and white triangles/diamonds.
* **Shadows**: Deep drop shadows to lift the board off the background planks.

### C. The Tiles (Grid Cells)
* **Base Material**: Wood grain (identical to board or slightly lighter).
* **Differentiation**: Do NOT use background colors to distinguish tiles. Use **Inlays/Engravings**:
    * **Safe/War Tiles**: 5-dot patterns or 4-eye patterns carved into the wood.
    * **Rosettes**: Bright, colorful 8-pointed flower inlays (Red/Blue/Gold) that pop against the wood.
* **Depth**: Each tile must look like a separate wooden block with a bevel (inner shadow top-left, highlight bottom-right).

## 5. Component Design Specs (UPDATED)

### The Pieces (Tokens)
* **Shape**: 3D Spheres/Domes (not flat circles).
* **Visuals**:
    * **Player 1**: Light Marble/Pearl with gold star inlay.
    * **Player 2**: Dark Onyx/Blue with gold star inlay.
* **Off-Board State**: **Stacked**. Pieces waiting to be played should visually overlap like a stack of coins on the side of the board.

### The Dice
* **Shape**: 3D Tetrahedrons (Pyramids).
* **View**: Top-down view of a 3-sided pyramid tip. White tipped corners.

## 6. Interaction & Feedback
* **Valid Moves**: Do not just change the color. Add a "Glow" effect or a pulsing semi-transparent overlay (`bg-green-500/30`) to the valid destination tiles.
* **Selection**: When a piece is selected, lift it visually (increase shadow opacity and offset).
* **Dice**: Use 3D-styled tetrahedrons (triangles) if possible, or stylized coin flips.

## 7. Platform Specifics (React Native)
* **Shadows**:
    * **iOS**: Use `shadow-color`, `shadow-offset`, `shadow-opacity`, `shadow-radius`.
    * **Android**: Use `elevation`.
    * *Rule*: Always define BOTH for cross-platform depth.
* **Gradients**: Use `expo-linear-gradient` for metallic effects (Gold/Silver borders), do not rely on CSS `linear-gradient`.
