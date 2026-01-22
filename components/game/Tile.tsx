import { isRosette, isWarZone } from '@/logic/constants';
import { PlayerColor } from '@/logic/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
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

export const Tile: React.FC<TileProps> = ({ row, col, piece, isValidTarget, onPress, lastMoveSource, lastMoveDest }) => {
    const rosette = isRosette(row, col);
    const war = isWarZone(row, col);

    // Base tile color - warm sandy tone
    let backgroundColor = '#fde68a'; // tile-normal (golden sand)
    let borderColor = '#d97706'; // tile-border (deep amber)
    let borderWidth = 1;
    
    // Rosette tiles - distinct lapis blue with gold border
    if (rosette) {
        backgroundColor = '#3b82f6'; // Lapis blue
        borderColor = '#f59e0b'; // royal-gold
        borderWidth = 3;
    }
    
    // Valid target - green glow
    if (isValidTarget) {
        backgroundColor = '#dcfce7'; // tile-valid (soft green)
        borderColor = '#22c55e'; // green-500
        borderWidth = 3;
    }
    
    // Last move destination - highlight
    if (lastMoveDest) {
        backgroundColor = '#fef3c7'; // yellow-100
        borderWidth = 2;
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
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 3,
                elevation: 3,
            }}
        >
            {/* Rosette Marker - Diamond pattern */}
            {rosette && !piece && (
                <View style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    opacity: 0.3 
                }}>
                    <View style={{ 
                        width: 24, 
                        height: 24, 
                        transform: [{ rotate: '45deg' }], 
                        borderWidth: 3, 
                        borderColor: '#f59e0b', // royal-gold
                        backgroundColor: 'rgba(245, 158, 11, 0.2)'
                    }} />
                </View>
            )}

            {/* Valid Move Indicator (Pulsing dot) */}
            {isValidTarget && !piece && (
                <View style={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: 10, 
                    backgroundColor: '#22c55e', // green-500
                    opacity: 0.7,
                    shadowColor: '#22c55e',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
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
