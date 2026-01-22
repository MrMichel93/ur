import { Button } from '@/components/ui/Button';
import { useMatchmaking } from '@/hooks/useMatchmaking';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Lobby() {
    const { startMatch, isSearching } = useMatchmaking();

    const handleStart = async () => {
        await startMatch();
    };

    return (
        <LinearGradient
            colors={['#0a0e1a', '#1a1f35', '#2d1b4e']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.content}>
                {/* Cosmic title */}
                <View style={styles.header}>
                    <Text style={styles.title}>✦ Cosmic Lobby ✦</Text>
                    <Text style={styles.subtitle}>
                        The stars align for your challenge
                    </Text>
                </View>

                {/* Info card */}
                <View style={styles.card}>
                    <LinearGradient
                        colors={['rgba(45, 27, 78, 0.6)', 'rgba(26, 31, 53, 0.6)']}
                        style={styles.cardGradient}
                    >
                        <Text style={styles.cardTitle}>Face the Ancient AI</Text>
                        <Text style={styles.cardText}>
                            Challenge the Sumerian Bot, crafted with the wisdom of millennia.
                        </Text>
                        <Text style={styles.cardText}>
                            Victory brings glory across the cosmos.
                        </Text>

                        <View style={styles.divider} />

                        <Button
                            title={isSearching ? "Aligning Stars..." : "Begin Celestial Battle"}
                            loading={isSearching}
                            onPress={handleStart}
                        />
                    </LinearGradient>
                </View>

                {/* Decorative stars */}
                <View style={styles.starsContainer}>
                    {[...Array(15)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.star,
                                {
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    opacity: 0.3 + Math.random() * 0.4,
                                }
                            ]}
                        />
                    ))}
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    content: {
        width: '100%',
        maxWidth: 500,
        alignItems: 'center',
        zIndex: 10,
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Cinzel_700Bold',
        color: '#e8d5b7',
        textAlign: 'center',
        letterSpacing: 3,
        textShadowColor: 'rgba(255, 216, 155, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Quicksand_400Regular',
        color: '#667eea',
        textAlign: 'center',
        letterSpacing: 1,
        opacity: 0.9,
    },
    card: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(232, 213, 183, 0.2)',
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    cardGradient: {
        padding: 24,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 24,
        fontFamily: 'Cinzel_700Bold',
        color: '#ffd89b',
        marginBottom: 16,
        textAlign: 'center',
    },
    cardText: {
        fontSize: 14,
        fontFamily: 'Quicksand_400Regular',
        color: '#c9d1d9',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 8,
    },
    divider: {
        width: '60%',
        height: 1,
        backgroundColor: '#4a5568',
        marginVertical: 24,
        opacity: 0.5,
    },
    starsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        pointerEvents: 'none',
    },
    star: {
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: '#e8d5b7',
        borderRadius: 1,
    },
});
