import { urTheme } from '@/constants/urTheme';
import { PlayerColor } from '@/logic/types';
import React, { useEffect, useMemo } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type PieceVariant = 'light' | 'dark' | 'reserve';

interface PieceProps {
  color: PlayerColor;
  highlight?: boolean;
  size?: 'sm' | 'md' | 'lg';
  pixelSize?: number;
  artScale?: number;
  artOffsetX?: number;
  artOffsetY?: number;
  variant?: PieceVariant;
  state?: 'idle' | 'active' | 'captured';
}

const PIECE_SIZE_PRESETS = {
  sm: 34,
  md: 38,
  lg: 46,
} as const;

const PIECE_ART_SOURCES: Record<PieceVariant, ImageSourcePropType> = {
  light: require('../../assets/pieces/piece_light.png'),
  dark: require('../../assets/pieces/piece_dark.png'),
  reserve: require('../../assets/pieces/piece_light.png'),
};

// The visible token body occupies about 62.5% of the exported PNG frame.
export const PIECE_ART_VISIBLE_COVERAGE = 0.625;

export const Piece: React.FC<PieceProps> = ({
  color,
  highlight = false,
  size = 'md',
  pixelSize,
  artScale = 1,
  artOffsetX = 0,
  artOffsetY = 0,
  variant,
  state = 'idle',
}) => {
  const intro = useSharedValue(0.9);
  const glowPulse = useSharedValue(0);
  const motion = useSharedValue(0);

  const resolvedVariant: PieceVariant = variant ?? color;
  const resolvedSource = useMemo(() => {
    if (resolvedVariant === 'reserve') {
      return color === 'dark' ? PIECE_ART_SOURCES.dark : PIECE_ART_SOURCES.light;
    }

    return PIECE_ART_SOURCES[resolvedVariant];
  }, [color, resolvedVariant]);

  useEffect(() => {
    intro.value = withSpring(1, urTheme.motion.spring.game);
  }, [intro]);

  useEffect(() => {
    if (highlight) {
      glowPulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: urTheme.motion.duration.base, easing: Easing.inOut(Easing.quad) }),
          withTiming(0.2, { duration: urTheme.motion.duration.base, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        true,
      );
      return;
    }

    cancelAnimation(glowPulse);
    glowPulse.value = withTiming(0, { duration: urTheme.motion.duration.fast });
  }, [glowPulse, highlight]);

  useEffect(() => {
    if (state === 'captured') {
      motion.value = withSequence(
        withTiming(1, { duration: 120, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 260, easing: Easing.in(Easing.cubic) }),
      );
      return;
    }

    if (state === 'active') {
      motion.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 420, easing: Easing.inOut(Easing.quad) }),
          withTiming(0, { duration: 420, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        true,
      );
      return;
    }

    cancelAnimation(motion);
    motion.value = withTiming(0, { duration: urTheme.motion.duration.fast });
  }, [motion, state]);

  const sizePx = useMemo(() => {
    // Gameplay geometry can pass an exact pixel size; presets remain as fallback for rails/cues.
    if (typeof pixelSize === 'number' && Number.isFinite(pixelSize) && pixelSize > 0) {
      return pixelSize;
    }
    return PIECE_SIZE_PRESETS[size];
  }, [pixelSize, size]);

  const artSizePx = useMemo(() => Math.max(1, sizePx * artScale), [artScale, sizePx]);
  // Additional 15% reduction from the prior 0.8x size target.
  const targetGlowSizePx = useMemo(() => Math.max(1, Math.round(sizePx * 0.68)), [sizePx]);

  const pieceStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: intro.value * interpolate(motion.value, [0, 1], [1, 1.045], Extrapolation.CLAMP) },
      { translateY: interpolate(motion.value, [0, 1], [0, -1], Extrapolation.CLAMP) },
    ],
    opacity: state === 'captured' ? interpolate(motion.value, [0, 1], [1, 0.35], Extrapolation.CLAMP) : 1,
  }));

  const shadowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(motion.value, [0, 1], [0.22, 0.14], Extrapolation.CLAMP),
    transform: [
      { scaleX: interpolate(motion.value, [0, 1], [1, 0.94], Extrapolation.CLAMP) },
      { scaleY: interpolate(motion.value, [0, 1], [1, 0.88], Extrapolation.CLAMP) },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowPulse.value * 0.9,
    transform: [{ scale: 0.95 + glowPulse.value * 0.2 }],
  }));

  return (
    <Animated.View style={[styles.wrap, { width: sizePx, height: sizePx }, pieceStyle]}>
      {highlight && (
        <Animated.View
          style={[
            styles.targetGlow,
            glowStyle,
            {
              width: targetGlowSizePx,
              height: targetGlowSizePx,
            },
          ]}
        />
      )}

      <Animated.View
        style={[
          styles.baseShadow,
          shadowStyle,
          {
            width: sizePx * 0.62,
            height: Math.max(4, sizePx * 0.16),
            bottom: Math.max(1, sizePx * 0.06),
          },
        ]}
      />
      <View style={[styles.artFrame, { width: sizePx, height: sizePx }]}>
        <Image
          source={resolvedSource}
          resizeMode="contain"
          style={[
            styles.artImage,
            {
              width: artSizePx,
              height: artSizePx,
              transform: [
                { translateX: artOffsetX },
                { translateY: artOffsetY },
              ],
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetGlow: {
    position: 'absolute',
    borderRadius: urTheme.radii.pill,
    borderWidth: 1.6,
    borderColor: 'rgba(246, 212, 138, 0.9)',
    backgroundColor: 'rgba(240, 192, 64, 0.18)',
  },
  baseShadow: {
    position: 'absolute',
    borderRadius: urTheme.radii.pill,
    backgroundColor: 'rgba(5, 8, 11, 0.26)',
  },
  artFrame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  artImage: {
    opacity: 0.98,
  },
});
