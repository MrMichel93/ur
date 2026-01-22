import { isRosette, isWarZone } from '@/logic/constants';
import { PlayerColor } from '@/logic/types';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
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

export const Tile: React.FC<TileProps> = ({ 
    row, 
    col, 
    piece, 
    isValidTarget, 
    onPress, 
    lastMoveSource, 
    lastMoveDest 
}) => {
    const rosette = isRosette(row, col);
    const war = isWarZone(row, col);

    // Choose gradient colors based on tile type
    let gradientColors = ['#1a1f35', '#0f1424']; // Normal nebula
    
    if (rosette) {
        gradientColors = ['#2d3748', '#1a202c']; // Darker with mystical feel
    } else if (war) {
        gradientColors = ['#1e2738', '#131824']; // War zone subtle
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!isValidTarget}
            activeOpacity={0.7}
            style={styles.touchable}
        >
            <LinearGradient
                colors={gradientColors}
                style={[
                    styles.tile,
                    isValidTarget && styles.validTarget,
                    lastMoveDest && styles.lastMove,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Rosette constellation pattern */}
                {rosette && !piece && (
                    <View style={styles.rosettePattern}>
                        <View style={styles.rosetteOuter} />
                        <View style={styles.rosetteInner} />
                        {/* Four corner stars */}
                        <View style={[styles.rosetteStar, { top: 4, left: 4 }]} />
                        <View style={[styles.rosetteStar, { top: 4, right: 4 }]} />
                        <View style={[styles.rosetteStar, { bottom: 4, left: 4 }]} />
                        <View style={[styles.rosetteStar, { bottom: 4, right: 4 }]} />
                    </View>
                )}

                {/* Valid move indicator - glowing circle */}
                {isValidTarget && !piece && (
                    <View style={styles.validIndicator}>
                        <View style={styles.validDot} />
                    </View>
                )}

                {/* Piece with cosmic glow */}
                {piece && (
                    <View style={[
                        styles.pieceContainer,
                        isValidTarget && styles.capturablepiece
                    ]}>
                        <Piece color={piece.color} highlight={isValidTarget} />
                    </View>
                )}

                {/* Border glow for special tiles */}
                {(rosette || isValidTarget) && (
                    <View style={[
                        styles.borderGlow,
                        rosette && styles.rosetteBorder,
                        isValidTarget && styles.validBorder,
                    ]} />
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchable: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
    },
    tile: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        borderWidth: 1,
        borderColor: 'rgba(74, 85, 104, 0.3)',
    },
    validTarget: {
        borderWidth: 2,
        borderColor: '#f6b93b',
    },
    lastMove: {
        backgroundColor: 'rgba(246, 185, 59, 0.1)',
    },
    rosettePattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rosetteOuter: {
        width: 32,
        height: 32,
        transform: [{ rotate: '45deg' }],
        borderWidth: 2,
        borderColor: '#c79100',
        opacity: 0.3,
    },
    rosetteInner: {
        position: 'absolute',
        width: 16,
        height: 16,
        transform: [{ rotate: '45deg' }],
        borderWidth: 1,
        borderColor: '#e5b800',
        opacity: 0.5,
    },
    rosetteStar: {
        position: 'absolute',
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#ffd89b',
        opacity: 0.6,
    },
    validIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(246, 185, 59, 0.2)',
    },
    validDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#f6b93b',
        shadowColor: '#ffd89b',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
    },
    pieceContainer: {
        opacity: 1,
    },
    capturablepiece: {
        opacity: 0.7,
    },
    borderGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    rosetteBorder: {
        borderColor: 'rgba(199, 145, 0, 0.4)',
        shadowColor: '#c79100',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    validBorder: {
        borderColor: 'rgba(246, 185, 59, 0.6)',
        shadowColor: '#ffd89b',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
});
