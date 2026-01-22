import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';

interface DiceProps {
    value: number | null; // 0-4
    rolling: boolean;
    onRoll: () => void;
    canRoll: boolean;
}

// Visual representation of 4 tetrahedral dice (pyramid shaped)
// Mesopotamians used pyramid dice with marked corners
export const Dice: React.FC<DiceProps> = ({ value, rolling, onRoll, canRoll }) => {
    const offset = useSharedValue(0);
    const rotation = useSharedValue(0);

    useEffect(() => {
        if (rolling) {
            offset.value = withSequence(
                withTiming(-15, { duration: 80 }),
                withTiming(15, { duration: 80 }),
                withTiming(-15, { duration: 80 }),
                withTiming(15, { duration: 80 }),
                withTiming(-10, { duration: 80 }),
                withTiming(10, { duration: 80 }),
                withSpring(0, { damping: 8 })
            );
            rotation.value = withSequence(
                withTiming(360, { duration: 400 }),
                withSpring(0)
            );
        }
    }, [rolling]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: offset.value },
            { rotate: `${rotation.value}deg` }
        ],
    }));

    return (
        <TouchableOpacity
            onPress={onRoll}
            disabled={!canRoll || rolling}
            activeOpacity={0.8}
            style={styles.container}
        >
            <LinearGradient
                colors={canRoll 
                    ? ['#667eea', '#764ba2', '#5a67d8']  // Mystical purple gradient
                    : ['#2d3748', '#1a202c']  // Disabled dark
                }
                style={[
                    styles.diceContainer,
                    !canRoll && styles.disabledContainer
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Animated.View style={[animatedStyle, styles.diceGrid]}>
                    {/* Render 4 pyramid dice visuals */}
                    {[0, 1, 2, 3].map(i => {
                        const isActive = value !== null && i < value;
                        
                        return (
                            <View key={i} style={styles.pyramidContainer}>
                                {/* Pyramid (diamond shape) */}
                                <View style={[
                                    styles.pyramid,
                                    isActive && styles.pyramidActive
                                ]}>
                                    {/* Center dot when active */}
                                    {isActive && (
                                        <View style={styles.pyramidDot} />
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </Animated.View>
                
                {/* Status text */}
                <Text style={styles.statusText}>
                    {rolling ? '✦ CASTING ✦' : value !== null ? `${value} MOVES` : 'TAP TO CAST'}
                </Text>

                {/* Cosmic particles around the dice when can roll */}
                {canRoll && !rolling && (
                    <View style={styles.particles}>
                        {[...Array(8)].map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.particle,
                                    {
                                        top: `${15 + Math.sin(i * Math.PI / 4) * 35}%`,
                                        left: `${50 + Math.cos(i * Math.PI / 4) * 40}%`,
                                    }
                                ]}
                            />
                        ))}
                    </View>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
    },
    diceContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 12,
    },
    disabledContainer: {
        shadowOpacity: 0,
        opacity: 0.5,
    },
    diceGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    pyramidContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pyramid: {
        width: 32,
        height: 32,
        transform: [{ rotate: '45deg' }],
        borderWidth: 2,
        borderColor: '#4a5568',
        backgroundColor: 'rgba(10, 14, 26, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pyramidActive: {
        borderColor: '#ffd89b',
        backgroundColor: 'rgba(246, 185, 59, 0.3)',
        shadowColor: '#ffd89b',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
    },
    pyramidDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e8d5b7',
        transform: [{ rotate: '-45deg' }],
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    statusText: {
        fontFamily: 'Cinzel_700Bold',
        fontSize: 14,
        color: '#e8d5b7',
        textAlign: 'center',
        letterSpacing: 2,
    },
    particles: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    particle: {
        position: 'absolute',
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#ffd89b',
        opacity: 0.6,
    },
});
