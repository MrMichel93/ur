import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';

interface DiceProps {
    value: number | null; // 0-4
    rolling: boolean;
    onRoll: () => void;
    canRoll: boolean;
}

// Visual representation of 4 tetrahedral dice
// If value is null, show ? or 0
export const Dice: React.FC<DiceProps> = ({ value, rolling, onRoll, canRoll }) => {
    // Use simple rotation or bounce
    const offset = useSharedValue(0);

    useEffect(() => {
        if (rolling) {
            offset.value = withSequence(
                withTiming(-10, { duration: 100 }),
                withTiming(10, { duration: 100 }),
                withTiming(-10, { duration: 100 }),
                withTiming(10, { duration: 100 }),
                withSpring(0)
            );
        }
    }, [rolling]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    return (
        <TouchableOpacity
            onPress={onRoll}
            disabled={!canRoll || rolling}
            style={{
                padding: 20,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 140,
                backgroundColor: canRoll ? '#f3e5ab' : '#a8a29e', // Parchment : stone-400
                opacity: canRoll ? 1 : 0.7,
                borderWidth: 3,
                borderColor: canRoll ? '#92400e' : '#78716c',
                // 3D depth
                borderBottomWidth: canRoll ? 5 : 3,
                borderRightWidth: canRoll ? 5 : 3,
                borderBottomColor: canRoll ? '#78350f' : '#57534e',
                borderRightColor: canRoll ? '#78350f' : '#57534e',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: canRoll ? 0.4 : 0.2,
                shadowRadius: 8,
                elevation: canRoll ? 12 : 4,
            }}
        >
            <Animated.View style={[animatedStyle, { flexDirection: 'row', gap: 10 }]}>
                {/* Render 4 dice visuals - Tetrahedral dice (pyramids) */}
                {[0, 1, 2, 3].map(i => {
                    const isOn = value !== null && i < value;

                    return (
                        <View key={i} style={{
                            width: 36,
                            height: 36,
                            transform: [{ rotate: '45deg' }],
                            borderWidth: 2,
                            borderColor: '#78350f', // Deep amber
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isOn ? '#1e3a8a' : '#f5f5f4', // Lapis blue : ivory/white
                            shadowColor: isOn ? '#1e3a8a' : 'transparent',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.6,
                            shadowRadius: 6,
                            elevation: isOn ? 4 : 0,
                        }}>
                            {/* Pyramid tip indicator - gold dot */}
                            {isOn && <View style={{ 
                                width: 10, 
                                height: 10, 
                                backgroundColor: '#f59e0b', 
                                borderRadius: 5,
                                shadowColor: '#f59e0b',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 4,
                            }} />}
                        </View>
                    );
                })}
            </Animated.View>
            <Text style={{
                marginTop: 12,
                fontWeight: 'bold',
                color: canRoll ? '#78350f' : '#57534e',
                textAlign: 'center',
                textTransform: 'uppercase',
                fontSize: 14,
                letterSpacing: 1.5,
                fontFamily: 'serif',
            }}>
                {rolling ? 'Rolling...' : value !== null ? `Rolled: ${value}` : 'Tap to Roll Dice'}
            </Text>
        </TouchableOpacity>
    );
};
