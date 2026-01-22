import { Board } from '@/components/game/Board';
import { Dice } from '@/components/game/Dice';
import { Modal } from '@/components/ui/Modal';
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
                {/* Status Bar */}
                <View className="flex-row justify-between w-full mb-6 px-2">
                    <View className="items-center bg-mesopotamia-dusk/60 px-6 py-3 rounded-2xl border border-player-light-glow/30">
                        <Text className="font-bold text-player-light-glow text-base">YOU</Text>
                        <Text className="text-desert-sand text-sm mt-1">Finished: {gameState.light.finishedCount}/7</Text>
                    </View>
                    <View className="items-center bg-mesopotamia-dusk/60 px-6 py-3 rounded-2xl border border-player-dark-glow/30">
                        <Text className="font-bold text-player-dark-glow text-base">BOT</Text>
                        <Text className="text-desert-sand text-sm mt-1">Finished: {gameState.dark.finishedCount}/7</Text>
                    </View>
                </View>

                {/* Turn Indicator */}
                <View className={`mb-6 px-6 py-3 rounded-full shadow-lg ${isMyTurn ? 'bg-player-light' : 'bg-player-dark'}`}>
                    <Text className="text-white font-bold uppercase tracking-wider text-center">
                        {isMyTurn ? "Your Turn" : "Opponent's Turn"}
                    </Text>
                </View>

                {/* Board Container - High contrast background */}
                <View className="bg-desert-sand rounded-3xl shadow-board p-6 mb-6" style={{ 
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.5,
                    shadowRadius: 30,
                    elevation: 20,
                }}>
                    {/* Inner border for luxury feel */}
                    <View className="border-2 border-royal-amber/40 rounded-2xl p-2">
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

                {/* History Log */}
                <View className="mt-6 w-full bg-mesopotamia-dusk/80 p-5 rounded-2xl border border-royal-gold/20">
                    <Text className="font-bold mb-3 text-royal-gold text-base">Game History</Text>
                    {gameState.history.slice(-3).map((log, i) => (
                        <Text key={i} className="text-sm text-desert-sand/90 leading-5">{log}</Text>
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
