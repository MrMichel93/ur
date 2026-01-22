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

## React Native Aesthetics Guidelines

### Typography
- Use distinctive fonts that work across platforms
- For custom fonts, use Expo's font loading system
- Avoid generic system fonts; create character with typography
- Consider using fonts that evoke the game's heritage (geometric, ancient-inspired, or surprisingly modern contrasts)
- NativeWind classes: `font-{family}`, `text-{size}`, `tracking-{spacing}`, `leading-{height}`

### Color & Theme
- Commit to a cohesive aesthetic using Tailwind color utilities
- Use semantic color naming in tailwind.config.js for game elements (e.g., player1, player2, rosette, safe)
- Dark mode support via NativeWind's `dark:` prefix
- Dominant colors with sharp accents outperform timid palettes
- Consider the board's visual hierarchy: background, paths, special squares, pieces

### Layout & Spacing
- Use Flexbox extensively (`flex`, `flex-row`, `items-center`, `justify-between`)
- Responsive sizing with percentage-based or `flex-{n}` values
- Consistent spacing scale using Tailwind's spacing utilities
- Platform-safe areas: wrap screens in `SafeAreaView` from `react-native-safe-area-context`
- Responsive breakpoints: Use conditional rendering or `className` arrays for different screen sizes

### Motion & Animation
- Use `react-native-reanimated` for performant animations
- Simple animations: `Animated` API from React Native
- Transition pieces smoothly across the board
- Dice roll animations should be satisfying and clear
- Subtle micro-interactions on touch (scale, opacity changes)
- Consider using `LayoutAnimation` for automatic layout transitions
- NativeWind transition utilities: `transition-{property}`, `duration-{ms}`, `ease-{timing}`

### Interactive Elements
- Clear touch targets (minimum 44x44 points on iOS, 48x48 dp on Android)
- Active states: use `active:` prefix in NativeWind or `onPressIn`/`onPressOut`
- Haptic feedback for important actions using `Haptics` from Expo
- Disable interactions during animations to prevent bugs
- Visual feedback should be immediate (<100ms)

### Game-Specific Elements

**Board Design:**
- Distinctive square styling for different tile types (normal, rosette, safe)
- Clear visual differentiation between player paths
- Responsive board sizing that works on all screen sizes
- Consider using `Dimensions` API or percentage-based sizing
- Grid layout using Flexbox or absolute positioning

**Game Pieces:**
- Memorable piece design (avoid generic circles)
- Clear player differentiation (color, shape, texture)
- Shadow/elevation to show "lifted" state during moves
- Smooth movement animations between squares

**Dice/Random Element:**
- Visually interesting dice design (ancient 4-sided pyramid dice were used historically)
- Satisfying roll animation
- Clear result display

**UI Chrome:**
- Turn indicator that's impossible to miss
- Score/capture display
- Match history or chat (if multiplayer)
- Settings and menu access

### Backgrounds & Visual Details
Create atmosphere and depth rather than defaulting to solid colors:
- Gradient meshes using `LinearGradient` from Expo
- Subtle patterns using `ImageBackground`
- Layered transparencies with opacity
- Shadows using `shadow-{size}` utilities (iOS) and `elevation-{level}` (Android)
- Custom textures for the board surface
- Particle effects or ambient animations for premium feel

### Responsive Design
**Phone Portrait (default):**
- Vertical board layout
- Thumb-accessible controls at bottom
- Compact UI elements

**Phone Landscape:**
- Horizontal board layout
- Side panels for player info
- Optimized for viewing angle

**Tablet:**
- Larger board with more generous spacing
- Additional information displays
- Two-handed interaction patterns

**Web:**
- Centered layout with max-width
- Mouse hover states
- Keyboard shortcuts consideration
- Responsive grid breakpoints: `sm:`, `md:`, `lg:`, `xl:`

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
}));
```

## Critical Rules

**NEVER use:**
- Generic AI aesthetics (purple gradients on white backgrounds)
- Overused fonts (Inter, Roboto, system fonts without intention)
- Cookie-cutter layouts
- Predictable component patterns

**ALWAYS:**
- Preserve existing game logic and state management
- Maintain component sizing logic from the original codebase
- Test on multiple screen sizes
- Ensure smooth performance (60fps target)
- Support both light and dark modes
- Make touch targets adequately sized
- Provide clear visual feedback for all interactions

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist designs need restraint, precision, and careful attention to spacing, typography, and subtle details.

## Ancient Game, Modern Interface

The Royal Game of Ur is 4,500 years old - one of humanity's oldest board games. This creates a unique design challenge: honor the historical significance while making it engaging for modern players. Consider:

- **Historical Authenticity**: Research actual archaeological artifacts, cuneiform patterns, Mesopotamian art
- **Modern Playability**: Clear UI, immediate feedback, contemporary UX patterns
- **Cultural Bridge**: Find creative ways to blend ancient aesthetics with modern design language

Don't default to obvious "ancient" clichés (sepia tones, papyrus textures). Instead, find unexpected ways to celebrate the game's heritage through bold color choices, geometric patterns inspired by archaeological finds, or surprisingly modern interpretations of ancient design elements.

Remember: Claude is capable of extraordinary creative work. Show what can truly be created when thinking outside the box and committing fully to a distinctive vision that works seamlessly across iOS, Android, and Web.