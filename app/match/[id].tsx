import { Board } from '@/components/game/Board';
import { Dice } from '@/components/game/Dice';
import { Modal } from '@/components/ui/Modal';
import { SERIF_FONT } from '@/constants/typography';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useGameStore } from '@/store/useGameStore';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

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
        <View className="flex-1 bg-mesopotamia-night">
            <Stack.Screen options={{ title: `Game #${id}` }} />

            <ScrollView contentContainerStyle={{ padding: 16, alignItems: 'center' }}>
                {/* Status Bar - Museum Display Labels */}
                <View className="flex-row justify-between w-full mb-6 px-2">
                    <View style={{
                        alignItems: 'center',
                        backgroundColor: '#f3e5ab', // Parchment
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: '#92400e',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 3,
                    }}>
                        <Text style={{ 
                            fontWeight: 'bold',
                            color: '#1e40af', // Lapis blue
                            fontSize: 16,
                            fontFamily: SERIF_FONT,
                            letterSpacing: 1,
                        }}>YOU</Text>
                        <Text style={{ 
                            color: '#57534e',
                            fontSize: 13,
                            marginTop: 4,
                            fontFamily: SERIF_FONT,
                        }}>Finished: {gameState.light.finishedCount}/7</Text>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        backgroundColor: '#f3e5ab', // Parchment
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: '#92400e',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 3,
                    }}>
                        <Text style={{ 
                            fontWeight: 'bold',
                            color: '#292524', // Onyx
                            fontSize: 16,
                            fontFamily: SERIF_FONT,
                            letterSpacing: 1,
                        }}>BOT</Text>
                        <Text style={{ 
                            color: '#57534e',
                            fontSize: 13,
                            marginTop: 4,
                            fontFamily: SERIF_FONT,
                        }}>Finished: {gameState.dark.finishedCount}/7</Text>
                    </View>
                </View>

                {/* Turn Indicator - Engraved Style */}
                <View style={{
                    marginBottom: 24,
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    borderRadius: 20,
                    backgroundColor: isMyTurn ? '#f3e5ab' : '#e7e5e4',
                    borderWidth: 2,
                    borderColor: isMyTurn ? '#92400e' : '#78716c',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 6,
                }}>
                    <Text style={{
                        color: isMyTurn ? '#78350f' : '#44403c',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        textAlign: 'center',
                        fontSize: 14,
                        fontFamily: SERIF_FONT,
                    }}>
                        {isMyTurn ? "Your Turn" : "Opponent's Turn"}
                    </Text>
                </View>

                {/* Board Container - Dark Lacquered Wood Frame */}
                <View style={{
                    backgroundColor: '#1a120b', // Deep brown/black wood
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: 4,
                    borderColor: '#92400e', // Amber border
                    // Layered depth
                    borderBottomWidth: 6,
                    borderRightWidth: 6,
                    borderBottomColor: '#000000',
                    borderRightColor: '#000000',
                    marginBottom: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 15 },
                    shadowOpacity: 0.6,
                    shadowRadius: 25,
                    elevation: 20,
                }}>
                    {/* Inner decorative border */}
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#d97706',
                        borderRadius: 8,
                        padding: 8,
                    }}>
                        <Board />
                    </View>
                </View>

                {/* Controls */}
                <View className="mt-4 w-full max-w-xs">
                    <Dice
                        value={gameState.rollValue}
                        rolling={false}
                        onRoll={handleRoll}
                        canRoll={canRoll}
                    />
                </View>

                {/* History Log - Museum Plaque / Parchment Style */}
                <View style={{
                    marginTop: 24,
                    width: '100%',
                    backgroundColor: '#f3e5ab', // Parchment/Ivory color
                    padding: 20,
                    borderRadius: 8,
                    borderWidth: 3,
                    borderColor: '#92400e', // Deep amber/bronze border
                    // 3D frame effect
                    borderBottomWidth: 5,
                    borderRightWidth: 5,
                    borderBottomColor: '#78350f',
                    borderRightColor: '#78350f',
                    shadowColor: '#000',
                    shadowOffset: { width: 2, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                }}>
                    {/* Ornate header bar */}
                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        marginBottom: 12,
                        paddingBottom: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#92400e',
                    }}>
                        <View style={{ 
                            width: 8, 
                            height: 8, 
                            backgroundColor: '#92400e', 
                            borderRadius: 4,
                            marginRight: 8,
                        }} />
                        <Text style={{ 
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: '#78350f', // Deep amber text
                            fontFamily: SERIF_FONT,
                            letterSpacing: 1.5,
                        }}>Game History</Text>
                        <View style={{ 
                            width: 8, 
                            height: 8, 
                            backgroundColor: '#92400e', 
                            borderRadius: 4,
                            marginLeft: 8,
                        }} />
                    </View>
                    {gameState.history.slice(-3).map((log, i) => (
                        <Text key={i} style={{ 
                            fontSize: 13,
                            color: '#44403c', // Stone-700
                            lineHeight: 20,
                            fontFamily: SERIF_FONT,
                            marginBottom: 4,
                        }}>{log}</Text>
                    ))}
                </View>

            </ScrollView>

            {/* Win Modal */}
            <Modal
                visible={showWinModal}
                title={gameState.winner === 'light' ? "VICTORY!" : "DEFEAT"}
                message={gameState.winner === 'light' ? "The Royal Game is yours!" : "The Bot has bested you."}
                actionLabel="Return to Menu"
                onAction={handleExit}
            />
        </View>
    );
}
