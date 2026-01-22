import { isRosette, isWarZone } from '@/logic/constants';
import { PlayerColor } from '@/logic/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Piece } from './Piece';

interface TileProps {
    row: number;
    col: number;
    piece?: { id: string, color: PlayerColor }; // If occupied
    isValidTarget?: boolean; // If current roll allows moving here
    onPress?: () => void;
    lastMoveSource?: boolean; // Highlight previous position?
    lastMoveDest?: boolean;
}

// SVG Component for 8-pointed star rosette pattern
const RosetteStar: React.FC<{ color: string }> = ({ color }) => (
    <Svg width="40" height="40" viewBox="0 0 40 40" style={{ position: 'absolute' }}>
        {/* 8-pointed star - historical Ur rosette pattern */}
        <Path
            d="M20 2 L22 18 L38 20 L22 22 L20 38 L18 22 L2 20 L18 18 Z"
            fill={color}
            opacity={0.4}
        />
        <Circle cx="20" cy="20" r="8" fill={color} opacity={0.6} />
        {/* Inner detail circles */}
        <Circle cx="20" cy="20" r="3" fill={color} opacity={0.9} />
    </Svg>
);

// SVG Component for Eye/Dots decoration
const EyePattern: React.FC<{ color: string }> = ({ color }) => (
    <Svg width="30" height="30" viewBox="0 0 30 30" style={{ position: 'absolute' }}>
        {/* 4 dots in corners pattern */}
        <Circle cx="8" cy="8" r="2.5" fill={color} opacity={0.5} />
        <Circle cx="22" cy="8" r="2.5" fill={color} opacity={0.5} />
        <Circle cx="8" cy="22" r="2.5" fill={color} opacity={0.5} />
        <Circle cx="22" cy="22" r="2.5" fill={color} opacity={0.5} />
    </Svg>
);

export const Tile: React.FC<TileProps> = ({ row, col, piece, isValidTarget, onPress, lastMoveSource, lastMoveDest }) => {
    const rosette = isRosette(row, col);
    const war = isWarZone(row, col);

    // Material 1: Ivory (Cream/Off-White) - The "White" Squares
    // Material 2: Lapis Lazuli (Deep Royal Blue) - The "Blue" Squares
    let backgroundColor = '#f3e5ab'; // Ivory base
    let borderColor = '#d97706'; // Deep amber border
    let borderWidth = 2;
    let insetBorderColor = '#a16207'; // Darker amber for 3D inset
    
    // Rosette tiles - Lapis Lazuli with gold accents
    if (rosette) {
        backgroundColor = '#1e3a8a'; // Deep Royal Blue (Lapis Lazuli)
        borderColor = '#f59e0b'; // Gold border
        borderWidth = 3;
        insetBorderColor = '#713f12'; // Dark amber for inset
    }
    
    // Valid target - add green glow overlay
    let validGlow = false;
    if (isValidTarget) {
        validGlow = true;
        borderColor = '#22c55e'; // green-500
        borderWidth = 3;
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!isValidTarget}
            style={{
                width: '100%',
                height: '100%',
                aspectRatio: 1,
                backgroundColor,
                borderWidth,
                borderColor,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 4,
                // 3D Inset effect - tiles look set INTO the wood
                borderBottomWidth: borderWidth + 2,
                borderRightWidth: borderWidth + 2,
                borderBottomColor: insetBorderColor,
                borderRightColor: insetBorderColor,
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            {/* Rosette Pattern - 8-pointed star */}
            {rosette && !piece && (
                <RosetteStar color="#f59e0b" />
            )}

            {/* War zone Eye/Dots decoration */}
            {war && !rosette && !piece && (
                <EyePattern color="#92400e" />
            )}

            {/* Valid Move Glow Overlay */}
            {validGlow && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#22c55e',
                    opacity: 0.2,
                    borderRadius: 4,
                }} />
            )}

            {/* Valid Move Indicator (when no piece) */}
            {isValidTarget && !piece && (
                <View style={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: 8, 
                    backgroundColor: '#22c55e',
                    opacity: 0.8,
                    shadowColor: '#22c55e',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.9,
                    shadowRadius: 8,
                    elevation: 5,
                }} />
            )}

            {/* Piece */}
            {piece && (
                <View style={{ opacity: 1 }}>
                    <Piece color={piece.color} highlight={isValidTarget} />
                </View>
            )}
        </TouchableOpacity>
    );
};
