import React from 'react';
import { Animated, ImageSourcePropType, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MIN_WIDE_WEB_BACKGROUND_WIDTH = 768;

type WideScreenBackgroundProps = {
  source: ImageSourcePropType;
  visible: boolean;
  overlayColor?: string;
  imageOpacity?: number;
};

export function WideScreenBackground({
  source,
  visible,
  overlayColor = 'rgba(6, 9, 14, 0.26)',
  imageOpacity = 1,
}: WideScreenBackgroundProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const overscan = Platform.OS === 'web' ? Math.max(48, Math.round(Math.max(width, height) * 0.08)) : 0;
  const containerBounds = React.useMemo(
    () =>
      ({
        ...(Platform.OS === 'web' ? { position: 'fixed' as const } : {}),
        top: -overscan - insets.top,
        left: -overscan - insets.left,
        width: width + overscan * 2 + insets.left + insets.right,
        height: height + overscan * 2 + insets.top + insets.bottom,
      }) as any,
    [height, insets.bottom, insets.left, insets.right, insets.top, overscan, width],
  );

  const handleLoad = React.useCallback(() => {
    Animated.timing(opacity, {
      toValue: imageOpacity,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacity, imageOpacity]);

  if (!visible) {
    return null;
  }

  return (
    <View pointerEvents="none" style={[styles.container, containerBounds]}>
      <Animated.Image
        accessible={false}
        source={source}
        resizeMode="cover"
        onLoad={handleLoad}
        style={[styles.image, { opacity }]}
      />
      <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgb(6, 9, 14)',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
