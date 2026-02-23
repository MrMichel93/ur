import { urTheme, urTextures } from '@/constants/urTheme';
import { isRosette, isWarZone } from '@/logic/constants';
import { PlayerColor } from '@/logic/types';
import React, { useEffect, useMemo, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Polygon } from 'react-native-svg';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Piece } from './Piece';

interface TileProps {
  row: number;
  col: number;
  cellSize?: number;
  piece?: { id: string; color: PlayerColor };
  isValidTarget?: boolean;
  isSelectedPiece?: boolean;
  isInteractive?: boolean;
  onPress?: () => void;
  highlightMode?: 'subtle' | 'theatrical';
}

const RosetteArtwork: React.FC<{ size: number }> = ({ size }) => {
  const cx = size / 2;
  const cy = size / 2;
  const petalRx = size * 0.18;
  const petalRy = size * 0.1;
  const petalOffset = size * 0.19;
  const colors = ['#2AA89A', '#D4702A', '#2AA89A', '#D4702A', '#2AA89A', '#D4702A', '#2AA89A', '#D4702A'];
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: 'absolute' }}
      pointerEvents="none"
    >
      <G>
        {angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const ex = cx + Math.cos(rad) * petalOffset;
          const ey = cy + Math.sin(rad) * petalOffset;
          return (
            <Ellipse
              key={i}
              cx={ex}
              cy={ey}
              rx={petalRx}
              ry={petalRy}
              fill={colors[i]}
              opacity={0.88}
              transform={`rotate(${angle}, ${ex}, ${ey})`}
            />
          );
        })}
        <Circle cx={cx} cy={cy} r={size * 0.14} fill="#F2E8D5" stroke="#C8981E" strokeWidth={1.2} />
        <Circle cx={cx} cy={cy} r={size * 0.05} fill="#1A1208" />
        <Circle cx={cx} cy={cy} r={size * 0.42} fill="none" stroke="#C8981E" strokeWidth={1} opacity={0.7} />
      </G>
    </Svg>
  );
};

const PipArtwork: React.FC<{ size: number }> = ({ size }) => {
  const positions = [
    { x: size * 0.33, y: size * 0.33 },
    { x: size * 0.67, y: size * 0.33 },
    { x: size * 0.33, y: size * 0.67 },
    { x: size * 0.67, y: size * 0.67 },
  ];

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: 'absolute' }}
      pointerEvents="none"
    >
      {positions.map((pos, i) => (
        <Circle key={i} cx={pos.x} cy={pos.y} r={size * 0.065} fill="rgba(90,60,30,0.52)" />
      ))}
    </Svg>
  );
};

const WarArtwork: React.FC<{ size: number }> = ({ size }) => {
  const half = size / 2;
  const d = size * 0.13;
  const diamonds = [
    { cx: half * 0.6, cy: half * 0.6 },
    { cx: half * 1.4, cy: half * 0.6 },
    { cx: half * 0.6, cy: half * 1.4 },
    { cx: half * 1.4, cy: half * 1.4 },
  ];

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: 'absolute' }}
      pointerEvents="none"
    >
      {diamonds.map((pos, i) => (
        <Polygon
          key={i}
          points={`${pos.cx},${pos.cy - d} ${pos.cx + d},${pos.cy} ${pos.cx},${pos.cy + d} ${pos.cx - d},${pos.cy}`}
          fill="rgba(60,30,10,0.38)"
        />
      ))}
    </Svg>
  );
};

export const Tile: React.FC<TileProps> = ({
  row,
  col,
  cellSize = 44,
  piece,
  isValidTarget = false,
  isSelectedPiece = false,
  isInteractive = false,
  onPress,
  highlightMode = 'theatrical',
}) => {
  const rosette = isRosette(row, col);
  const war = isWarZone(row, col);
  const pulse = useSharedValue(isValidTarget ? 1 : 0);
  const selectedPulse = useSharedValue(isSelectedPiece ? 1 : 0);
  const rosetteGlow = useSharedValue(rosette ? 0.2 : 0);
  const rosetteBurst = useSharedValue(0);
  const prevPieceId = useRef<string | null>(piece?.id ?? null);

  const tileSeed = useMemo(() => (row * 13 + col * 7) % 5, [col, row]);
  const toneOffset = tileSeed * 4;
  const cellRenderedSize = cellSize;

  useEffect(() => {
    if (isValidTarget) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1, {
            duration: highlightMode === 'theatrical' ? 520 : 900,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(0.45, {
            duration: highlightMode === 'theatrical' ? 520 : 900,
            easing: Easing.inOut(Easing.quad),
          }),
        ),
        -1,
        true,
      );
      return;
    }

    cancelAnimation(pulse);
    pulse.value = withTiming(0, { duration: 180 });
  }, [highlightMode, isValidTarget, pulse]);

  useEffect(() => {
    if (isSelectedPiece) {
      selectedPulse.value = withRepeat(
        withSequence(
          withTiming(0.95, { duration: 520, easing: Easing.inOut(Easing.quad) }),
          withTiming(0.25, { duration: 520, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        true,
      );
      return;
    }

    cancelAnimation(selectedPulse);
    selectedPulse.value = withTiming(0, { duration: 180 });
  }, [isSelectedPiece, selectedPulse]);

  useEffect(() => {
    if (rosette) {
      rosetteGlow.value = withRepeat(
        withSequence(
          withTiming(0.52, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
          withTiming(0.18, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        true,
      );
      return;
    }

    rosetteGlow.value = 0;
  }, [rosette, rosetteGlow]);

  useEffect(() => {
    const prev = prevPieceId.current;
    const next = piece?.id ?? null;
    if (rosette && next && prev !== next) {
      rosetteBurst.value = withSequence(
        withTiming(1, { duration: 160, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 360, easing: Easing.inOut(Easing.quad) }),
      );
    }
    prevPieceId.current = next;
  }, [piece?.id, rosette, rosetteBurst]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: highlightMode === 'theatrical' ? pulse.value : pulse.value * 0.6,
    transform: [{ scale: 0.9 + pulse.value * (highlightMode === 'theatrical' ? 0.26 : 0.14) }],
  }));

  const rosetteGlowStyle = useAnimatedStyle(() => ({
    opacity: rosetteGlow.value,
  }));

  const selectedPulseStyle = useAnimatedStyle(() => ({
    opacity: selectedPulse.value,
    transform: [{ scale: 0.93 + selectedPulse.value * 0.13 }],
  }));

  const rosetteBurstStyle = useAnimatedStyle(() => ({
    opacity: rosetteBurst.value * 0.8,
    transform: [{ scale: 0.82 + rosetteBurst.value * 0.7 }],
  }));

  const baseBackground = rosette
    ? `rgb(${178 + toneOffset}, ${122 + Math.floor(toneOffset / 2)}, ${52 + Math.floor(toneOffset / 3)})`
    : war
      ? `rgb(${168 + toneOffset}, ${110 + Math.floor(toneOffset / 2)}, ${52 + Math.floor(toneOffset / 3)})`
      : `rgb(${192 + toneOffset}, ${152 + Math.floor(toneOffset / 2)}, ${88 + Math.floor(toneOffset / 3)})`;
  const borderColor = rosette ? 'rgba(255, 219, 144, 0.65)' : 'rgba(98, 62, 36, 0.46)';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isInteractive}
      activeOpacity={0.86}
      style={[
        styles.tile,
        {
          backgroundColor: baseBackground,
          borderColor,
          borderWidth: rosette ? 1.8 : 1.1,
        },
        isValidTarget && styles.validTile,
        isSelectedPiece && styles.selectedTile,
      ]}
    >
      <Image source={urTextures.wood} resizeMode="repeat" style={styles.tileTexture} />
      {rosette && <RosetteArtwork size={cellRenderedSize} />}
      {!rosette && war && <WarArtwork size={cellRenderedSize} />}
      {!rosette && !war && <PipArtwork size={cellRenderedSize} />}

      <View style={[styles.innerInset, rosette && styles.rosetteInset]} />
      <View style={styles.edgeHighlight} />
      <View style={styles.lowerShade} />

      {isSelectedPiece && <Animated.View style={[styles.selectedRing, selectedPulseStyle]} />}
      {isValidTarget && <Animated.View style={[styles.validRing, pulseStyle]} />}
      {rosette && <Animated.View style={[styles.rosetteGlow, rosetteGlowStyle]} />}
      {rosette && <Animated.View style={[styles.rosetteBurst, rosetteBurstStyle]} />}

      {isValidTarget && !piece && <View style={styles.validDot} />}

      {piece && (
        <View style={styles.pieceWrap}>
          <Piece color={piece.color} highlight={isValidTarget} state={isValidTarget ? 'active' : 'idle'} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: urTheme.radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#1A0E06',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  validTile: {
    shadowColor: urTheme.colors.gold,
    shadowOpacity: 0.34,
    shadowRadius: 7,
    elevation: 5,
  },
  selectedTile: {
    borderColor: 'rgba(240, 192, 64, 0.84)',
    shadowColor: urTheme.colors.goldGlow,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 7,
  },
  tileTexture: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.22,
  },
  innerInset: {
    ...StyleSheet.absoluteFillObject,
    margin: 2.4,
    borderRadius: urTheme.radii.xs,
    borderWidth: 1,
    borderColor: 'rgba(53, 31, 17, 0.3)',
    backgroundColor: 'rgba(37, 21, 12, 0.06)',
  },
  rosetteInset: {
    borderColor: 'rgba(252, 220, 155, 0.4)',
  },
  edgeHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '34%',
    backgroundColor: 'rgba(255, 226, 176, 0.16)',
  },
  lowerShade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '28%',
    backgroundColor: 'rgba(34, 17, 9, 0.14)',
  },
  validRing: {
    position: 'absolute',
    width: '78%',
    height: '78%',
    borderRadius: urTheme.radii.pill,
    borderWidth: 2.2,
    borderColor: 'rgba(240, 192, 64, 0.98)',
  },
  selectedRing: {
    position: 'absolute',
    width: '88%',
    height: '88%',
    borderRadius: urTheme.radii.pill,
    borderWidth: 1.7,
    borderColor: 'rgba(240, 192, 64, 0.92)',
    backgroundColor: 'rgba(240, 192, 64, 0.12)',
  },
  rosetteGlow: {
    position: 'absolute',
    width: '82%',
    height: '82%',
    borderRadius: urTheme.radii.pill,
    backgroundColor: 'rgba(255, 210, 120, 0.2)',
  },
  rosetteBurst: {
    position: 'absolute',
    width: '72%',
    height: '72%',
    borderRadius: urTheme.radii.pill,
    borderWidth: 2,
    borderColor: 'rgba(255, 239, 196, 0.92)',
  },
  validDot: {
    width: 14,
    height: 14,
    borderRadius: urTheme.radii.pill,
    backgroundColor: 'rgba(251, 224, 173, 0.86)',
    borderWidth: 1,
    borderColor: 'rgba(67, 40, 21, 0.45)',
  },
  pieceWrap: {
    opacity: 0.98,
  },
});
