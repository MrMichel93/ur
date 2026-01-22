---
name: react-native-frontend-design
description: Create distinctive, production-grade React Native interfaces for the Royal Game of Ur with high design quality. Generates creative, polished code optimized for iOS, Android, and Web that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
project: Royal Game of Ur (micho8cho93/ur)
---

This skill guides creation of distinctive, production-grade React Native interfaces for the Royal Game of Ur game that work seamlessly across iOS, Android, and Web. Implement real working code with exceptional attention to aesthetic details, responsive design, and platform-specific optimizations.

The user provides frontend requirements: a component, screen, game element, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Technical Context

**Stack:**
- React Native (Expo)
- NativeWind (Tailwind CSS for React Native)
- TypeScript
- File-based routing (Expo Router)

**Platform Targets:**
- iOS native
- Android native
- Web (responsive)

**Styling Approach:**
- NativeWind utility classes for cross-platform styling
- Platform-specific variations using `Platform` API when needed
- Responsive design using Tailwind breakpoints adapted for React Native

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction that fits the ancient yet timeless nature of the Royal Game of Ur:

- **Purpose**: What problem does this interface solve? Who uses it? Consider the historical nature of the game (4,500+ years old) and modern gaming expectations.
- **Tone**: Pick an extreme that honors the game's heritage while being fresh:
  - Ancient/Archaeological: Cuneiform textures, aged materials, museum-quality presentation
  - Modern/Minimalist: Clean geometry, strategic focus, contemporary board game aesthetic
  - Mystical/Atmospheric: Mesopotamian mysticism, cosmic elements, ritualistic feel
  - Playful/Accessible: Colorful, friendly, modern casual gaming
  - Luxury/Premium: Rich materials, gold accents, high-end board game aesthetic
  - Tactical/Technical: Grid-based, analytical, strategy game UI
- **Constraints**: Cross-platform compatibility, touch interactions, game state visualization, multiplayer sync
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember about this game's design?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. The ancient nature of the game provides rich thematic material - use it creatively without being cliché.

Then implement working React Native code that is:
- Production-grade and functional across all platforms
- Visually striking and memorable
- Touch-optimized with clear interactive states
- Responsive across screen sizes (phone, tablet, web)
- Performant with smooth animations
- Cohesive with a clear aesthetic point-of-view

## CRITICAL: Visibility & Functionality Preservation

### 🚨 ABSOLUTE REQUIREMENTS - NEVER VIOLATE

**GAME BOARD VISIBILITY:**
1. **The game board MUST remain fully visible at all times during gameplay**
2. **All game pieces MUST be clearly visible with proper contrast**
3. **All text (turn indicators, scores, player names) MUST be readable**
4. **Interactive elements MUST show clear visual states (selected, disabled, active)**

**IF YOU BREAK VISIBILITY, YOU HAVE FAILED THE TASK COMPLETELY.**

### Common Visibility Mistakes to AVOID:

❌ **DO NOT:**
- Set background colors that hide the board (e.g., dark background with dark board)
- Use text colors that don't contrast with backgrounds
- Add overlays or layers that obscure game elements
- Change z-index values without understanding the layering hierarchy
- Modify absolute positioning of game elements without testing
- Set opacity too low on game-critical elements
- Use `display: none` or `hidden` on game elements
- Change the parent container styling in ways that affect child visibility
- Apply transforms that move elements off-screen
- Set dimensions (width/height) that cause elements to collapse

✅ **DO:**
- Test visibility BEFORE submitting any changes
- Maintain proper color contrast (WCAG AA minimum: 4.5:1 for text)
- Keep game elements in separate layers from decorative backgrounds
- Preserve existing z-index hierarchy for game boards
- Use the existing component structure for game rendering
- Test on both light and dark backgrounds
- Verify text is readable on all background variations
- Check that pieces are visible on all tile types

### Mandatory Visibility Testing Checklist

Before finalizing ANY design changes, verify:

- [ ] Can you see the entire game board?
- [ ] Can you see all game pieces clearly?
- [ ] Can you read all text (player names, scores, turn info)?
- [ ] Is there sufficient contrast between text and backgrounds?
- [ ] Are interactive elements clearly distinguishable?
- [ ] Does the board look correct on light AND dark mode?
- [ ] Are special tiles (rosettes, safe squares) visually distinct?
- [ ] Can you see piece selection/hover states?
- [ ] Does everything work on small phone screens?
- [ ] Does everything work on large tablet/web screens?

**If you answer "no" to ANY of these, DO NOT PROCEED. Fix visibility issues first.**

## React Native Aesthetics Guidelines

### Typography
- Use distinctive fonts that work across platforms
- For custom fonts, use Expo's font loading system
- Avoid generic system fonts; create character with typography
- Consider using fonts that evoke the game's heritage (geometric, ancient-inspired, or surprisingly modern contrasts)
- **CRITICAL**: Ensure text color contrasts with background (minimum 4.5:1 ratio)
- NativeWind classes: `font-{family}`, `text-{size}`, `tracking-{spacing}`, `leading-{height}`
- Always specify text color explicitly - never rely on defaults in games

### Color & Theme
- Commit to a cohesive aesthetic using Tailwind color utilities
- Use semantic color naming in tailwind.config.js for game elements (e.g., player1, player2, rosette, safe)
- **CRITICAL**: Test dark mode thoroughly - ensure all elements remain visible
- Dominant colors with sharp accents outperform timid palettes
- Consider the board's visual hierarchy: background, paths, special squares, pieces
- **Background colors MUST NOT obscure foreground game elements**
- Use transparency carefully - game pieces should never be semi-transparent unless intentional hover effect
- Define explicit colors for: board background, tile backgrounds, piece colors, text colors, special tile indicators

### Layout & Spacing
- Use Flexbox extensively (`flex`, `flex-row`, `items-center`, `justify-between`)
- Responsive sizing with percentage-based or `flex-{n}` values
- Consistent spacing scale using Tailwind's spacing utilities
- Platform-safe areas: wrap screens in `SafeAreaView` from `react-native-safe-area-context`
- Responsive breakpoints: Use conditional rendering or `className` arrays for different screen sizes
- **CRITICAL**: DO NOT change flex/positioning on game board containers without understanding implications
- Preserve game board's container dimensions and positioning logic
- Only style visual appearance, not structural layout of core game components

### Motion & Animation
- Use `react-native-reanimated` for performant animations
- Simple animations: `Animated` API from React Native
- Transition pieces smoothly across the board
- Dice roll animations should be satisfying and clear
- Subtle micro-interactions on touch (scale, opacity changes)
- Consider using `LayoutAnimation` for automatic layout transitions
- NativeWind transition utilities: `transition-{property}`, `duration-{ms}`, `ease-{timing}`
- **CRITICAL**: Animations should never cause elements to disappear or become unreadable
- Test that animated elements return to proper visible state

### Interactive Elements
- Clear touch targets (minimum 44x44 points on iOS, 48x48 dp on Android)
- Active states: use `active:` prefix in NativeWind or `onPressIn`/`onPressOut`
- Haptic feedback for important actions using `Haptics` from Expo
- Disable interactions during animations to prevent bugs
- Visual feedback should be immediate (<100ms)
- **CRITICAL**: Interactive states (hover, active, selected) must be clearly visible
- Selected game pieces need obvious visual distinction
- Disabled states should be obvious but still readable

### Game-Specific Elements

**Board Design:**
- Distinctive square styling for different tile types (normal, rosette, safe)
- Clear visual differentiation between player paths
- Responsive board sizing that works on all screen sizes
- Consider using `Dimensions` API or percentage-based sizing
- Grid layout using Flexbox or absolute positioning
- **CRITICAL**: Board must have distinct background from screen background
- Tiles must be clearly delineated with borders or spacing
- Special tiles (rosettes, safe squares) need unique, obvious styling

**Game Pieces:**
- Memorable piece design (avoid generic circles)
- Clear player differentiation (color, shape, texture)
- Shadow/elevation to show "lifted" state during moves
- Smooth movement animations between squares
- **CRITICAL**: Pieces must contrast strongly with tile backgrounds
- Minimum contrast ratio of 4.5:1 between piece and tile
- Pieces should have borders or shadows to separate from background
- Never use opacity below 0.8 for active pieces

**Dice/Random Element:**
- Visually interesting dice design (ancient 4-sided pyramid dice were used historically)
- Satisfying roll animation
- Clear result display
- **CRITICAL**: Dice result must be immediately obvious
- High contrast between dice face and pips/numbers

**UI Chrome:**
- Turn indicator that's impossible to miss
- Score/capture display
- Match history or chat (if multiplayer)
- Settings and menu access
- **CRITICAL**: Turn indicator must be prominent and unambiguous
- Current player should be instantly recognizable
- Score/status text must be large enough and high contrast

### Backgrounds & Visual Details
Create atmosphere and depth rather than defaulting to solid colors:
- Gradient meshes using `LinearGradient` from Expo
- Subtle patterns using `ImageBackground`
- Layered transparencies with opacity
- Shadows using `shadow-{size}` utilities (iOS) and `elevation-{level}` (Android)
- Custom textures for the board surface
- Particle effects or ambient animations for premium feel
- **CRITICAL**: Background styling should be applied to screen container, NOT game board
- Game board should have its own distinct background layer
- Decorative elements should be behind or around the game board, never on top
- Use z-index appropriately: background (-1), board (0), pieces (1), UI (2)

### Responsive Design
**Phone Portrait (default):**
- Vertical board layout
- Thumb-accessible controls at bottom
- Compact UI elements
- **CRITICAL**: Ensure board fits in viewport without scrolling

**Phone Landscape:**
- Horizontal board layout
- Side panels for player info
- Optimized for viewing angle
- **CRITICAL**: Board should remain primary focus

**Tablet:**
- Larger board with more generous spacing
- Additional information displays
- Two-handed interaction patterns
- **CRITICAL**: Scale up, don't just add padding

**Web:**
- Centered layout with max-width
- Mouse hover states
- Keyboard shortcuts consideration
- Responsive grid breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- **CRITICAL**: Test in browser, not just mobile emulator

## Implementation Guidelines

### Component Structure
```typescript
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';

// Styled components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
```

### Safe Styling Pattern for Game Board
```typescript
// ✅ CORRECT: Style screen background, keep board separate
<View className="flex-1 bg-gradient-to-b from-slate-900 to-slate-800">
  {/* Decorative background */}
  <ImageBackground source={texture} className="absolute inset-0 opacity-20" />
  
  {/* Game board - preserve its structure */}
  <View className="flex-1 items-center justify-center p-4">
    {/* Board with its own distinct background */}
    <View className="bg-amber-100 rounded-lg shadow-2xl p-4">
      {/* Original board rendering logic */}
      <GameBoard />
    </View>
  </View>
  
  {/* UI Chrome */}
  <View className="absolute top-safe p-4">
    <Text className="text-white text-lg font-bold">
      Current Turn: Player 1
    </Text>
  </View>
</View>

// ❌ WRONG: Don't wrap board in styling that might hide it
<View className="bg-black"> {/* This could hide everything! */}
  <GameBoard />
</View>
```

### Ensuring Text Visibility
```typescript
// ✅ CORRECT: Explicit colors with good contrast
<Text className="text-white bg-slate-900 px-3 py-2 rounded">
  Turn: Player 1
</Text>

// ✅ CORRECT: Use shadows for text on complex backgrounds
<Text className="text-white text-shadow-lg shadow-black/50">
  Score: 5
</Text>

// ❌ WRONG: No color specified, might be invisible
<Text>Turn: Player 1</Text>

// ❌ WRONG: Poor contrast
<Text className="text-gray-400 bg-gray-300">Score: 5</Text>
```

### Responsive Patterns
```typescript
import { Dimensions, Platform } from 'react-native';
import { useWindowDimensions } from 'react-native';

const { width, height } = useWindowDimensions();
const isSmallDevice = width < 375;
const isTablet = width >= 768;

// Conditional styling
<View className={`p-4 ${isTablet ? 'md:p-8' : ''}`}>
```

### Platform-Specific Code
```typescript
import { Platform } from 'react-native';

const styles = {
  shadow: Platform.select({
    ios: 'shadow-lg shadow-black/30',
    android: 'elevation-4',
    web: 'shadow-lg',
  }),
};
```

### Animation Example
```typescript
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: withSpring(isPressed ? 0.95 : 1) }],
  // CRITICAL: Never animate to opacity: 0 for game elements
  opacity: withTiming(isPressed ? 0.9 : 1),
}));
```

## Critical Rules

**NEVER:**
- Break game board visibility (if you do, you've failed)
- Break text readability (if you do, you've failed)
- Use poor color contrast (check with tools if unsure)
- Modify game logic or state management
- Change core component structure without understanding it
- Apply styling that changes layout behavior
- Use generic AI aesthetics (purple gradients on white backgrounds)
- Use overused fonts (Inter, Roboto) without intention
- Create cookie-cutter layouts
- Submit changes without testing visibility

**ALWAYS:**
- Verify all elements are visible BEFORE finalizing
- Test on multiple screen sizes and color schemes
- Preserve existing game logic and state management
- Maintain component sizing logic from the original codebase
- Use explicit color values for game elements
- Test dark mode if implementing it
- Ensure smooth performance (60fps target)
- Support both light and dark modes properly
- Make touch targets adequately sized
- Provide clear visual feedback for all interactions
- Keep game board rendering on a separate layer from decorative backgrounds
- Use proper z-index hierarchy
- Test contrast ratios for text and game elements

**IF YOU'RE UNSURE:**
- Style the screen container, not the game board itself
- Add decorative elements around the board, not over it
- Preserve more of the original structure than you think necessary
- Test visibility first, aesthetics second
- Ask for clarification rather than guessing

## Debugging Visibility Issues

If elements become invisible after your changes:

1. **Check background colors**: Is the background the same color as the element?
2. **Check text colors**: Is text color specified explicitly?
3. **Check z-index**: Are elements being layered incorrectly?
4. **Check opacity**: Is anything set below 0.8?
5. **Check positioning**: Did you use `absolute` without coordinates?
6. **Check dimensions**: Did you set width/height to 0 accidentally?
7. **Check flex**: Did you remove `flex-1` from containers?
8. **Check overflow**: Is content clipped by parent container?
9. **Check dark mode**: Does your color work in both themes?
10. **Check the actual device/emulator**: Don't trust the preview alone

## Ancient Game, Modern Interface

The Royal Game of Ur is 4,500 years old - one of humanity's oldest board games. This creates a unique design challenge: honor the historical significance while making it engaging for modern players. Consider:

- **Historical Authenticity**: Research actual archaeological artifacts, cuneiform patterns, Mesopotamian art
- **Modern Playability**: Clear UI, immediate feedback, contemporary UX patterns
- **Cultural Bridge**: Find creative ways to blend ancient aesthetics with modern design language

Don't default to obvious "ancient" clichés (sepia tones, papyrus textures). Instead, find unexpected ways to celebrate the game's heritage through bold color choices, geometric patterns inspired by archaeological finds, or surprisingly modern interpretations of ancient design elements.

**REMEMBER**: A beautiful design that hides the game board is worthless. Visibility and functionality come FIRST. Aesthetics come SECOND. If you must choose between beautiful and functional, choose functional every time.

Remember: Claude is capable of extraordinary creative work that is BOTH beautiful AND functional. Show what can truly be created when thinking outside the box while maintaining rock-solid core functionality.