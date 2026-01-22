import { Board } from '@/components/game/Board';
import { Dice } from '@/components/game/Dice';
import { Modal } from '@/components/ui/Modal';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useGameStore } from '@/store/useGameStore';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default function GameRoom() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Game Loop Hook (Bot)
    useGameLoop();

    const gameState = useGameStore(state => state.gameState);
    const roll = useGameStore(state => state.roll);
    const reset = useGameStore(state => state.reset);

    // Local Player is Light
    const isMyTurn = gameState.currentTurn === 'light';
    const canRoll = isMyTurn && gameState.phase === 'rolling';

    const handleRoll = () => {
        if (canRoll) roll();
    };

    const [showWinModal, setShowWinModal] = React.useState(false);

    useEffect(() => {
        if (gameState.winner) {
            setShowWinModal(true);
        }
    }, [gameState.winner]);

    const handleExit = () => {
        setShowWinModal(false);
        reset();
        router.replace('/');
    };

    return (
        <LinearGradient
            colors={['#0a0e1a', '#1a1f35', '#2d1b4e']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Stack.Screen options={{ title: `Celestial Battle #${id}` }} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Player Status Cards */}
                <View style={styles.statusContainer}>
                    {/* Player (Light) */}
                    <View style={[styles.playerCard, isMyTurn && styles.activeCard]}>
                        <LinearGradient
                            colors={['rgba(255, 216, 155, 0.2)', 'rgba(246, 185, 59, 0.1)']}
                            style={styles.playerCardGradient}
                        >
                            <Text style={styles.playerName}>YOU</Text>
                            <View style={styles.playerDot} />
                            <Text style={styles.playerScore}>{gameState.light.finishedCount}/7</Text>
                            <Text style={styles.playerLabel}>Ascended</Text>
                        </LinearGradient>
                    </View>

                    {/* Bot (Dark) */}
                    <View style={[styles.playerCard, !isMyTurn && styles.activeCard]}>
                        <LinearGradient
                            colors={['rgba(102, 126, 234, 0.2)', 'rgba(118, 75, 162, 0.1)']}
                            style={styles.playerCardGradient}
                        >
                            <Text style={styles.playerName}>BOT</Text>
                            <View style={[styles.playerDot, { backgroundColor: '#667eea' }]} />
                            <Text style={styles.playerScore}>{gameState.dark.finishedCount}/7</Text>
                            <Text style={styles.playerLabel}>Ascended</Text>
                        </LinearGradient>
                    </View>
                </View>

                {/* Turn Indicator */}
                <View style={styles.turnIndicatorContainer}>
                    <LinearGradient
                        colors={isMyTurn 
                            ? ['#ffd89b', '#f6b93b']
                            : ['#667eea', '#764ba2']
                        }
                        style={styles.turnIndicator}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.turnText}>
                            ✦ {isMyTurn ? "YOUR TURN" : "BOT'S TURN"} ✦
                        </Text>
                    </LinearGradient>
                </View>

                {/* Board */}
                <Board />

                {/* Dice Controls */}
                <View style={styles.diceContainer}>
                    <Dice
                        value={gameState.rollValue}
                        rolling={false}
                        onRoll={handleRoll}
                        canRoll={canRoll}
                    />
                </View>

                {/* Game Log */}
                <View style={styles.logContainer}>
                    <LinearGradient
                        colors={['rgba(26, 31, 53, 0.6)', 'rgba(10, 14, 26, 0.4)']}
                        style={styles.logGradient}
                    >
                        <Text style={styles.logTitle}>✦ Cosmic Chronicle ✦</Text>
                        <View style={styles.logDivider} />
                        {gameState.history.slice(-4).reverse().map((log, i) => (
                            <Text key={i} style={styles.logText}>· {log}</Text>
                        ))}
                        {gameState.history.length === 0 && (
                            <Text style={[styles.logText, { fontStyle: 'italic' }]}>
                                The journey begins...
                            </Text>
                        )}
                    </LinearGradient>
                </View>

                {/* Decorative stars */}
                <View style={styles.starsContainer}>
                    {[...Array(30)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.star,
                                {
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    opacity: 0.2 + Math.random() * 0.4,
                                }
                            ]}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Win Modal */}
            <Modal
                visible={showWinModal}
                title={gameState.winner === 'light' ? "✦ COSMIC VICTORY ✦" : "✦ STELLAR DEFEAT ✦"}
                message={gameState.winner === 'light' 
                    ? "The stars shine upon your triumph! The ancient game is yours." 
                    : "The cosmic forces favor the Bot. Better luck among the stars next time."
                }
                actionLabel="Return to the Cosmos"
                onAction={handleExit}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        alignItems: 'center',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
        gap: 12,
    },
    playerCard: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(74, 85, 104, 0.3)',
    },
    activeCard: {
        borderColor: 'rgba(255, 216, 155, 0.6)',
        shadowColor: '#ffd89b',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    playerCardGradient: {
        padding: 12,
        alignItems: 'center',
    },
    playerName: {
        fontSize: 16,
        fontFamily: 'Cinzel_700Bold',
        color: '#e8d5b7',
        letterSpacing: 2,
        marginBottom: 4,
    },
    playerDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ffd89b',
        marginVertical: 6,
        shadowColor: '#ffd89b',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
    playerScore: {
        fontSize: 24,
        fontFamily: 'Cinzel_700Bold',
        color: '#ffd89b',
    },
    playerLabel: {
        fontSize: 10,
        fontFamily: 'Quicksand_400Regular',
        color: '#c9d1d9',
        opacity: 0.7,
        letterSpacing: 1,
    },
    turnIndicatorContainer: {
        width: '100%',
        marginBottom: 16,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#ffd89b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    turnIndicator: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    turnText: {
        fontSize: 16,
        fontFamily: 'Cinzel_700Bold',
        color: '#0a0e1a',
        letterSpacing: 3,
    },
    diceContainer: {
        marginTop: 24,
        width: '100%',
        maxWidth: 400,
    },
    logContainer: {
        marginTop: 24,
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(74, 85, 104, 0.3)',
    },
    logGradient: {
        padding: 16,
    },
    logTitle: {
        fontSize: 14,
        fontFamily: 'Cinzel_700Bold',
        color: '#e8d5b7',
        textAlign: 'center',
        letterSpacing: 2,
        marginBottom: 8,
    },
    logDivider: {
        width: '100%',
        height: 1,
        backgroundColor: '#4a5568',
        opacity: 0.3,
        marginBottom: 12,
    },
    logText: {
        fontSize: 12,
        fontFamily: 'Quicksand_400Regular',
        color: '#c9d1d9',
        marginBottom: 6,
        opacity: 0.8,
    },
    starsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    star: {
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: '#e8d5b7',
        borderRadius: 1,
    },
});
