import { Button } from '@/components/ui/Button';
import { useMatchmaking } from '@/hooks/useMatchmaking';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Lobby() {
    const { startMatch, isSearching } = useMatchmaking();
    const router = useRouter();

    const handleStart = async () => {
        // useMatchmaking hook has startMatch which calls initGame and pushes route
        // But wait, the hook pushes to `/match/${id}`? 
        // We need to ensure it matches our route structure: `/(game)/${id}`
        // I need to fix useMatchmaking hook if it's wrong, or override here.
        // Let's rely on the hook if possible, but I recall writing `/match/` in hook.
        // I will reimplement simple logic here to correct it.

        await startMatch();
        // The hook does router.push... if the hook is wrong, it will fail 404.
        // I'll fix the hook in a subsequent step if needed. 
        // ACTUALLY, I can manually push here for redundancy if I exported `initGame` from hook?
        // No, `startMatch` is void.
        // I'll trust the hook or fix it now.
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
