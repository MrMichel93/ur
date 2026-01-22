import { Button } from '@/components/ui/Button';
import { useMatchmaking } from '@/hooks/useMatchmaking';
import React from 'react';
import { Text, View } from 'react-native';

export default function Lobby() {
    const { startMatch, isSearching } = useMatchmaking();

    const handleStart = async () => {
        await startMatch();
    };

    return (
        <View className="flex-1 items-center justify-center bg-mesopotamia-dusk p-4">
            <View className="w-full max-w-md bg-desert-sand p-8 rounded-3xl items-center" style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 15 },
                shadowOpacity: 0.4,
                shadowRadius: 25,
                elevation: 15,
            }}>
                {/* Decorative top border */}
                <View className="w-24 h-1 bg-royal-gold rounded-full mb-6" />
                
                <Text className="text-3xl font-bold text-royal-lapis mb-2 text-center">Find a Match</Text>
                <Text className="text-stone-600 text-center mb-8 leading-6 px-4">
                    Challenge the ancient Sumerian Bot and prove your strategic mastery
                </Text>

                <Button
                    title={isSearching ? "Preparing Game..." : "Start Game"}
                    loading={isSearching}
                    onPress={handleStart}
                    className="w-full"
                />
                
                {/* Decorative bottom element */}
                <View className="mt-6 flex-row gap-2">
                    <View className="w-2 h-2 bg-royal-gold rounded-full" />
                    <View className="w-2 h-2 bg-royal-gold rounded-full" />
                    <View className="w-2 h-2 bg-royal-gold rounded-full" />
                </View>
            </View>
        </View>
    );
}
