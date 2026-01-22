import { Button } from '@/components/ui/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Home() {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#0a0e1a', '#1a1f35', '#2d1b4e']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.content}>
                {/* Cosmic title with star effect */}
                <View style={styles.titleContainer}>
                    <Text 
                        style={styles.mainTitle}
                        className="text-cosmic-star"
                    >
                        ROYAL GAME
                    </Text>
                    <Text 
                        style={styles.mainTitle}
                        className="text-cosmic-star"
                    >
                        OF UR
                    </Text>
                </View>
                
                {/* Subtitle with mystical feel */}
                <View style={styles.subtitleContainer}>
                    <View style={styles.starDivider} />
                    <Text style={styles.subtitle}>
                        ✦ The Ancient Race of Kings ✦
                    </Text>
                    <Text style={styles.ageText}>
                        4,500 Years Among the Stars
                    </Text>
                    <View style={styles.starDivider} />
                </View>

                {/* Buttons with cosmic styling */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Play Local vs Bot"
                        onPress={() => router.push('/(game)/lobby')}
                        variant="primary"
                    />
                    <Button
                        title="Online Multiplayer"
                        variant="secondary"
                        disabled
                    />
                    <Text style={styles.comingSoonText}>
                        (Ascending to the cosmos soon...)
                    </Text>
                </View>
            </View>

            {/* Floating stars effect */}
            <View style={styles.starsContainer}>
                {[...Array(20)].map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.star,
                            {
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: 0.2 + Math.random() * 0.5,
                            }
                        ]}
                    />
                ))}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 32,
        alignItems: 'center',
        width: '100%',
        maxWidth: 500,
        zIndex: 10,
    },
    titleContainer: {
        marginBottom: 24,
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 48,
        fontFamily: 'Cinzel_700Bold',
        textAlign: 'center',
        color: '#e8d5b7',
        letterSpacing: 4,
        textShadowColor: 'rgba(255, 216, 155, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    subtitleContainer: {
        marginBottom: 48,
        alignItems: 'center',
        gap: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Quicksand_400Regular',
        color: '#c9d1d9',
        textAlign: 'center',
        letterSpacing: 2,
    },
    ageText: {
        fontSize: 12,
        fontFamily: 'Quicksand_400Regular',
        color: '#667eea',
        textAlign: 'center',
        letterSpacing: 1,
        opacity: 0.8,
    },
    starDivider: {
        width: 100,
        height: 1,
        backgroundColor: '#4a5568',
        opacity: 0.5,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
        alignItems: 'center',
    },
    comingSoonText: {
        fontSize: 12,
        fontFamily: 'Quicksand_400Regular',
        color: '#667eea',
        fontStyle: 'italic',
        marginTop: -8,
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
