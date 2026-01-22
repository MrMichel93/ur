# Visual Primitives - Carved Wood Aesthetic

This directory contains reusable visual primitive components that implement the "Carved Wood" aesthetic for the Royal Game of Ur, as specified in the design system documentation.

## Components

### 1. WoodTextureView.tsx
**Purpose:** Container component that applies a dark vertical plank background texture.

**Features:**
- Dark blue-grey stained wood color (#1e293b)
- Vertical grain lines created with SVG
- Simulates a tabletop surface or museum display environment

**Usage:**
```tsx
import { WoodTextureView } from '@/components/ui/WoodTextureView';

<WoodTextureView className="flex-1">
  {/* Your content here */}
</WoodTextureView>
```

**Props:**
- Extends `ViewProps` from React Native
- `children`: React nodes to render inside the textured background
- `className`: NativeWind/Tailwind classes for styling
- All standard `View` props

---

### 2. TileBase.tsx
**Purpose:** Represents a single wooden tile with beveled/carved appearance.

**Features:**
- Warm wood background color (#b8906a - medium oak)
- Inner shadow (top-left) for depth
- Highlight (bottom-right) for 3D beveled effect
- Cross-platform shadow support (iOS shadowOffset, Android elevation)

**Usage:**
```tsx
import { TileBase } from '@/components/ui/TileBase';

<TileBase size={60}>
  {/* Optional: Add inlay or content */}
</TileBase>
```

**Props:**
- Extends `ViewProps` from React Native
- `size`: Number - Width and height of the square tile (default: 60)
- `children`: React nodes to render inside the tile
- `className`: NativeWind/Tailwind classes for styling

---

### 3. ZigZagBorder.tsx
**Purpose:** Decorative border pattern with alternating red and cream triangles.

**Features:**
- Traditional inlay pattern inspired by Royal Game of Ur artifact
- Deep red (#c41e3a) and cream (#f5e6d3) color scheme
- Supports both horizontal and vertical orientations
- Implemented using react-native-svg for crisp rendering

**Usage:**
```tsx
import { ZigZagBorder } from '@/components/ui/ZigZagBorder';

// Horizontal border
<ZigZagBorder 
  width={300} 
  height={20} 
  triangleSize={20} 
  orientation="horizontal" 
/>

// Vertical border
<ZigZagBorder 
  width={20} 
  height={200} 
  triangleSize={20} 
  orientation="vertical" 
/>
```

**Props:**
- `width`: Number - Total width of the border strip (default: 300)
- `height`: Number - Total height of the border strip (default: 20)
- `triangleSize`: Number - Size of each triangle unit (default: 20)
- `orientation`: 'horizontal' | 'vertical' - Direction of the border (default: 'horizontal')

---

### 4. RosetteInlay.tsx
**Purpose:** 8-pointed star SVG component representing traditional rosette inlay.

**Features:**
- Multi-layered design with outer star, middle star, and inner circle
- Two color variants: 'red-blue-gold' and 'blue-red-gold'
- Traditional colors: Deep red (#c41e3a), Royal blue (#1e3a8a), Gold (#ffd700), Cream accent (#f5e6d3)
- Concentric layering for visual depth
- Scalable SVG implementation

**Usage:**
```tsx
import { RosetteInlay } from '@/components/ui/RosetteInlay';

<RosetteInlay 
  size={40} 
  variant="red-blue-gold" 
/>

<RosetteInlay 
  size={50} 
  variant="blue-red-gold" 
/>
```

**Props:**
- `size`: Number - Diameter of the rosette (default: 40)
- `variant`: 'red-blue-gold' | 'blue-red-gold' - Color scheme (default: 'red-blue-gold')

---

## Demo

A demo screen is available at `app/component-demo.tsx` that showcases all the visual primitives in various combinations. To view:

1. Start the Expo development server: `npm start`
2. Navigate to `/component-demo` route in your app

The demo includes:
- Individual component examples
- Combined compositions
- Board preview showing how components work together

---

## Design System Compliance

These components follow the specifications in:
- `SKILL.md` - UI Specialist guidelines
- `specs/03_ui_design_system.md` - Materials and palette
- `specs/04_implementation_guide.md` - Implementation strategy

### Key Design Principles Applied:

1. **No Flat Colors**: Uses specific material representations (wood grain, carved details)
2. **Depth & Shadows**: Every element has shadow/elevation for 3D effect
3. **Layering Strategy**: Components can be composed in layers (base → inlay → content)
4. **Skeuomorphic Aesthetic**: Simulates physical materials (wood, carved inlays)
5. **Cross-Platform Support**: Works on both iOS (shadows) and Android (elevation)

---

## Technical Stack

- **React Native**: Core UI framework
- **NativeWind**: Tailwind CSS for React Native styling
- **react-native-svg**: For crisp vector graphics (borders, rosettes)
- **TypeScript**: Type-safe component interfaces

---

## Next Steps

These are standalone visual primitives ready for integration. They do not yet interact with game logic. Future phases will:

1. Integrate TileBase into the game board grid
2. Apply ZigZagBorder as board frame
3. Conditionally render RosetteInlay on special tiles
4. Wrap game screens in WoodTextureView for consistent aesthetic

Refer to `specs/04_implementation_guide.md` Phase 2 and Phase 3 for integration instructions.
