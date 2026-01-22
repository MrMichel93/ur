import { PlayerColor } from '@/logic/types';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PieceProps {
    color: PlayerColor;
    highlight?: boolean;
}

export const Piece: React.FC<PieceProps> = ({ color, highlight }) => {
    // Light = Golden starlight, Dark = Mystical purple ether
    const isLight = color === 'light';
    
    return (
        <View style={[
            styles.container,
            highlight && styles.highlighted
        ]}>
            <LinearGradient
                colors={isLight 
                    ? ['#ffd89b', '#f6b93b', '#c79100']  // Golden star
                    : ['#667eea', '#764ba2', '#4a5568']  // Purple ether
                }
                style={styles.outerCircle}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Glow effect */}
                <View style={[
                    styles.glowRing,
                    { 
                        shadowColor: isLight ? '#ffd89b' : '#667eea',
                        shadowOpacity: highlight ? 0.8 : 0.5,
                    }
                ]} />
                
                {/* Inner cosmic detail */}
                <View style={styles.innerCircle}>
                    <View style={[
                        styles.centerDot,
                        { backgroundColor: isLight ? '#e8d5b7' : '#c9d1d9' }
                    ]} />
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    highlighted: {
        transform: [{ scale: 1.1 }],
    },
    outerCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 8,
    },
    glowRing: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 22,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 12,
        elevation: 12,
    },
    innerCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(10, 14, 26, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    centerDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
});
