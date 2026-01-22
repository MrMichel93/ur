# Game Board, Dice, and Pieces - Visual Documentation

This document provides detailed visual descriptions and ASCII representations of the game UI components on the match page (`/match/[id]`).

## 1. Game Board (`components/game/Board.tsx`)

### Overall Board Structure
The game board is a **3×8 grid** with two gaps (creating the distinctive Royal Game of Ur shape):

```
┌─────────────────────────────────────────────────────────────┐
│                    GAME BOARD                               │
│  Dark Lacquered Wood Frame (#1a120b)                       │
│  Wood Frame Border (#78350f) - Thick 3D Beveled Edge      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Row 0 (Light's Safe Zone):                              │
│   ┌───┬───┬───┬───┬─ ─┬─ ─┬───┬───┐                       │
│   │ T │ T │ T │ R │   │   │ T │ T │  (Ivory/Cream)        │
│   └───┴───┴───┴───┴─ ─┴─ ─┴───┴───┘                       │
│                                                             │
│   Row 1 (War Zone - Shared Path):                         │
│   ┌───┬───┬───┬───┬───┬───┬───┬───┐                       │
│   │ T │ T │ T │ R │ T │ T │ T │ T │  (Lapis Blue)         │
│   └───┴───┴───┴───┴───┴───┴───┴───┘                       │
│                                                             │
│   Row 2 (Dark's Safe Zone):                               │
│   ┌───┬───┬───┬───┬─ ─┬─ ─┬───┬───┐                       │
│   │ T │ T │ T │ R │   │   │ T │ T │  (Ivory/Cream)        │
│   └───┴───┴───┴───┴─ ─┴─ ─┴───┴───┘                       │
│                                                             │
│   Legend:                                                   │
│   T = Regular Tile with 3D inset effect                   │
│   R = Rosette (8-pointed star pattern)                    │
│   [blank] = Gap in board                                   │
└─────────────────────────────────────────────────────────────┘
```

### Board Visual Details

**Dimensions:**
- Width: 100% of container (max 672px = 2xl)
- Aspect Ratio: 8:3
- Minimum Height: 200px

**Colors & Materials:**
- **Background**: `#1a120b` (Deep brown/black lacquered wood)
- **Frame Border**: `#78350f` (Amber-900 wood frame)
  - Top/Left: 8px
  - Bottom: 12px (creates 3D depth)
  - Right: 10px (creates 3D depth)
- **Border Radius**: 8px
- **Shadow**: Large outer shadow (elevation: 12)

### Tile Details

#### Ivory/Cream Tiles (Rows 0 & 2)
```
┌─────────────────────┐
│  ╱╲ (light border)  │
│ │  │   #f3e5ab     │← Background color
│ │  │   (Ivory)     │
│  ╲╱ (dark border)   │← 3D inset effect
└─────────────────────┘
```
- Background: `#f3e5ab` (Ivory cream)
- Top/Left borders: `#fef5d4` (lighter - highlight)
- Bottom/Right borders: `#d4c594` (darker - shadow)
- Creates 3D inset/carved appearance

#### Lapis Blue Tiles (Row 1 - War Zone)
```
┌─────────────────────┐
│  ╱╲ (light border)  │
│ │  │   #1e3a8a     │← Background color
│ │  │   (Lapis)     │
│  ╲╱ (dark border)   │← 3D inset effect
└─────────────────────┘
```
- Background: `#1e3a8a` (Lapis deep blue)
- Top/Left borders: `#3b82f6` (lighter blue - highlight)
- Bottom/Right borders: `#172554` (darker blue - shadow)

#### Valid Move Tiles (Highlighted)
```
┌─────────────────────┐
│  ╱╲ (green glow)    │
│ │●│   #dcfce7      │← Greenish tint
│ │ │   (Ivory var)  │
│  ╲╱ (green border)  │← Thick green borders
└─────────────────────┘
```
- Background: `#dcfce7` (green-tinted ivory) or `#065f46` (green-tinted lapis)
- Borders: `#22c55e` (green - 4px thick)
- Center dot: `#4ade80` (bright green, semi-transparent)

### Rosette Pattern (SVG)

Located at: Row 0 Col 3, Row 1 Col 3, Row 2 Col 3

```
       ✶
     ✶ ✶ ✶
   ✶   ✶   ✶
     ✶ ✶ ✶
       ✶
```
- 8-pointed star SVG
- Color on Ivory tiles: `#7f1d1d` (dark red)
- Color on Lapis tiles: `#fbbf24` (gold)
- Size: 48px

### Eye Pattern (War Zone non-rosette tiles)

Located on Row 1 (war zone) tiles that aren't rosettes:

```
  ◉  ◉
  ◉  ◉
```
- 4 dots in a square pattern
- Color: `#fbbf24` (gold)
- Size: 32px

---

## 2. Game Pieces (`components/game/Piece.tsx`)

### Light Piece (Pearl/Ivory)
```
     ┌─────────┐
    ╱   ✧     ╲     ← Inner highlight (white)
   │  ┌───┐    │
   │  │   │    │    ← Main body (#f5f5f4 pearl)
   │  └───┘    │
    ╲   ◯     ╱     ← Gold accent ring
     └─────────┘
      └Shadow┘       ← Drop shadow
```

**Visual Properties:**
- **Shape**: Circular (40×40px, borderRadius: 20)
- **Main Color**: `#f5f5f4` (Pearl/Stone white)
- **Border**: `#e7e5e4` (Lighter pearl, 2-3px depending on highlight)
- **Inner Highlight**: 
  - Position: Top-left (offset 8px)
  - Size: 20×20px
  - Color: `#ffffff` (white, 60% opacity)
  - Creates 3D sphere/dome effect
- **Gold Accent Ring**:
  - Size: 28×28px
  - Border: `#f59e0b` (gold, 1px)
  - Opacity: 40%
- **Shadow**:
  - iOS: shadowOffset (0, 4), opacity 0.4, radius 6
  - Android: elevation 8

### Dark Piece (Onyx/Dark Stone)
```
     ┌─────────┐
    ╱   ✧     ╲     ← Inner highlight (slate)
   │  ┌───┐    │
   │  │   │    │    ← Main body (#1e293b onyx)
   │  └───┘    │
    ╲   ◯     ╱     ← Gold accent ring
     └─────────┘
      └Shadow┘       ← Drop shadow
```

**Visual Properties:**
- **Shape**: Circular (40×40px, borderRadius: 20)
- **Main Color**: `#1e293b` (Onyx/Dark slate)
- **Border**: `#0f172a` (Darker slate, 2-3px)
- **Inner Highlight**: 
  - Position: Top-left (offset 8px)
  - Size: 20×20px
  - Color: `#334155` (lighter slate, 60% opacity)
  - Creates 3D sphere/dome effect
- **Gold Accent Ring**:
  - Size: 28×28px
  - Border: `#f59e0b` (gold, 1px)
  - Opacity: 40%
- **Shadow**: Same as Light piece

---

## 3. Dice (`components/game/Dice.tsx`)

The game uses 4 tetrahedral dice (pyramid-shaped) displayed horizontally:

### Dice Container (Ready to Roll)
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                ┃
┃   ◆    ◆    ◆    ◆            ┃  ← 4 dice (pyramids)
┃   1    2    3    4            ┃
┃                                ┃
┃      TAP TO ROLL               ┃
┃                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Container Visual Properties:**
- **Background**: `#f59e0b` (amber/gold when active)
- **Background**: `#78350f` (dark brown when inactive)
- **Opacity**: 1.0 when active, 0.6 when inactive
- **Border**:
  - Standard: 4px
  - Bottom: 6px (3D depth)
  - Right: 5px (3D depth)
  - Color when active: `#78350f` (dark brown)
  - Top/Left when active: `#fbbf24` (lighter gold - highlight)
- **Shadow**: Larger when active (elevation 10), smaller when inactive (elevation 4)
- **Padding**: 20px
- **Border Radius**: 12px
- **Min Height**: 120px

### Individual Die (Pyramid/Tetrahedron)

Each die is a rotated square (45° rotation) to appear diamond-shaped:

**Die "OFF" (Value 0 - not counted):**
```
   ╱╲
  ╱  ╲
 │    │   ← Cream/beige (#f3e5ab)
  ╲  ╱
   ╲╱
```
- Background: `#f3e5ab` (cream/beige)
- Border: `#78350f` (dark brown, 2px)
- Bottom/Right borders: `#d4c594` (darker cream, 3px - shadow)
- Size: 36×36px
- Rotation: 45°
- No center dot

**Die "ON" (Counted in roll value):**
```
   ╱╲
  ╱●╲     ← Gold dot (#fbbf24)
 │    │   ← Royal blue (#1e3a8a)
  ╲  ╱
   ╲╱
```
- Background: `#1e3a8a` (royal blue)
- Border: `#78350f` (dark brown, 2px)
- Bottom/Right borders: `#172554` (darker blue, 3px - shadow)
- Center dot: `#fbbf24` (gold, 10×10px circle)
- Size: 36×36px
- Rotation: 45°

### Dice States

**Rolling Animation:**
- Dice shake/bounce up and down
- Text displays: "Rolling..."
- Animation: Rapid vertical translation (-10, 10, -10, 10, 0)

**After Roll (Value = 3):**
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                ┃
┃   ◆●   ◆●   ◆●   ◆            ┃
┃   ON   ON   ON   OFF          ┃  ← 3 dice ON, 1 OFF
┃                                ┃
┃      ROLLED: 3                 ┃
┃                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
- First 3 dice: Blue with gold dots
- Last die: Cream/empty
- Text: "Rolled: 3"

**Disabled State:**
- Container: Dark brown background (`#78350f`)
- Opacity: 0.6
- Border colors: Dark/muted
- Text color: `#f3e5ab` (cream)
- Not tappable

---

## 4. Full Match Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  Navigation: "Game #123"                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  STATUS BAR (Parchment Style #f3e5ab)          │   │
│  │  ┌──────────────────┬──────────────────┐       │   │
│  │  │ YOU (Light)      │ BOT (Dark)       │       │   │
│  │  │ Finished: 2/7    │ Finished: 1/7    │       │   │
│  │  └──────────────────┴──────────────────┘       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │     TURN INDICATOR (Royal Blue #1e3a8a)        │   │
│  │            "YOUR TURN"                          │   │
│  │         (Gold text #fbbf24)                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌═══════════════════════════════════════════════════┐ │
│  ║                                                   ║ │
│  ║              GAME BOARD (see above)              ║ │
│  ║          [3×8 grid with pieces]                  ║ │
│  ║                                                   ║ │
│  ╚═══════════════════════════════════════════════════╝ │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │            DICE AREA (see above)                │   │
│  │          [4 tetrahedral dice]                   │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  HISTORY LOG (Parchment Style #f3e5ab)         │   │
│  │  Game History:                                  │   │
│  │  - Light rolled 3                              │   │
│  │  - Light moved piece from (0,0) to (0,3)      │   │
│  │  - Dark rolled 2                               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Color Scheme Summary

**Background**: `#2d1810` (Dark brown/mahogany - entire page)

**Status Bar & History** (Museum Plaque/Parchment):
- Background: `#f3e5ab` (cream/parchment)
- Border: `#78350f` (brown, 3px)
- Text: `#78350f` (brown)
- Font: Serif, bold
- Shadow: Large drop shadow for lift

**Turn Indicator**:
- Background: `#1e3a8a` (royal blue when your turn) or `#1e293b` (slate when opponent)
- Border: `#f59e0b` (gold, gradient thickness)
- Text: `#fbbf24` (gold)
- Font: Serif, bold, uppercase, letter-spacing

**Board Frame**:
- Inner: `#1a120b` (very dark brown/black)
- Frame: `#78350f` (amber-900 brown)
- Heavy 3D beveled edges

**Tiles**:
- Ivory: `#f3e5ab` (cream)
- Lapis: `#1e3a8a` (royal blue)
- Valid move: Green tints
- Rosettes: Red (#7f1d1d) or Gold (#fbbf24) stars

**Pieces**:
- Light: `#f5f5f4` (pearl white)
- Dark: `#1e293b` (onyx/slate)
- Both have gold accent rings

**Dice**:
- Active container: `#f59e0b` (amber/gold)
- Inactive container: `#78350f` (dark brown)
- ON dice: `#1e3a8a` (royal blue) with `#fbbf24` (gold) dots
- OFF dice: `#f3e5ab` (cream)

---

## Color Palette Reference

| Element | Color | Hex Code |
|---------|-------|----------|
| Page Background | Dark Mahogany | `#2d1810` |
| Board Inner | Very Dark Brown | `#1a120b` |
| Board Frame | Amber-900 | `#78350f` |
| Ivory Tiles | Cream/Beige | `#f3e5ab` |
| Lapis Tiles | Royal Blue | `#1e3a8a` |
| Light Piece | Pearl White | `#f5f5f4` |
| Dark Piece | Onyx/Slate | `#1e293b` |
| Gold Accent | Amber-500 | `#f59e0b` |
| Gold Text | Amber-400 | `#fbbf24` |
| Rosette (Ivory) | Dark Red | `#7f1d1d` |
| Rosette (Lapis) | Gold | `#fbbf24` |
| Valid Move | Green-500 | `#22c55e` |
| Parchment | Cream | `#f3e5ab` |
| Brown Text | Amber-900 | `#78350f` |

---

## Notes

This visual documentation was created based on the actual component code from:
- `/app/match/[id].tsx` - Main game page
- `/components/game/Board.tsx` - Game board
- `/components/game/Tile.tsx` - Individual tiles
- `/components/game/Piece.tsx` - Game pieces
- `/components/game/Dice.tsx` - Dice component

The current implementation uses a **museum artifact aesthetic** with:
- Skeuomorphic 3D effects (bevels, shadows, insets)
- Traditional materials (wood, ivory, lapis lazuli, pearl, onyx)
- Rich color palette with gold accents
- Serif fonts for historical feel
- Parchment-style UI elements
