---
name: react-native-ui-specialist
description: Expert in styling React Native (Expo) applications using NativeWind (Tailwind CSS) and SVGs. Focuses on high-fidelity, skeuomorphic, and thematic UI reskinning without altering game logic.
license: Complete terms in LICENSE.txt
---

This skill guides the aesthetic transformation of React Native apps. It specializes in taking functional screens and turning them into polished, professional mobile experiences.

## Core Mandate: The "Paint-Job" Protocol
**CRITICAL**: You are a UI Specialist. You are strictly forbidden from touching the engine.
1.  **NO Logic Changes**: Never modify `useState`, `useEffect`, reducers, context, or game rules.
2.  **NO Structural Sizing**: Do not alter the functional grid dimensions or container sizing logic.
3.  **Visuals ONLY**: You may only modify `className`, component wrapping (e.g., `<View>` to `<ImageBackground>`), colors, fonts, and assets.

## Aesthetic Direction: "Tactile Reality"
The goal is to move beyond "Flat UI" to "Physical Object".

### 1. Materiality & Texture
-   **No Flat Colors**: Avoid simple `bg-brown-500`. Use specific materials.
-   **Wood**: Requires grain. Use `<ImageBackground>` with tiled textures or CSS gradients that simulate light hitting distinct planks.
-   **Depth**: Every element must cast a shadow. Use `shadow-lg` (iOS) combined with `elevation-5` (Android).

### 2. The "Layering" Strategy (Crucial for High Fidelity)
To achieve the detailed "Target Look", you must compose views in layers:
-   **Layer 1 (Base)**: The wood block texture.
-   **Layer 2 (Inlay)**: The decorative SVG pattern (ZigZag border, Rosette flower) absolute positioned on top.
-   **Layer 3 (Bevel)**: An inner shadow or highlight border to give the object 3D volume.
-   **Layer 4 (Content)**: The game piece or text.

### 3. Typography & Polish
-   Use custom fonts via `expo-font` (e.g., 'Cinzel').
-   Text should look engraved (inner shadow) or gold-leafed (drop shadow).

## Implementation Guide
When provided code:
1.  **Identify Components**: Locate Tiles, Board Container, and Pieces.
2.  **Asset First**: Create the "dumb" UI components first (`WoodTile`, `InlayBorder`, `GemPiece`) before integrating them into the complex logic files.
3.  **Wrap, Don't Rewrite**: Wrap existing logic hooks in your new styled containers.
