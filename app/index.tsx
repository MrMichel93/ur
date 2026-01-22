import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Home() {
    const router = useRouter();

    return (
        <View className="flex-1 items-center justify-center bg-mesopotamia-night">
            {/* Decorative gradient overlay */}
            <View style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                opacity: 0.3,
                backgroundColor: 'transparent',
            }}>
                {/* Simple radial-like gradient effect with overlapping views */}
                <View style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    width: 400,
                    height: 400,
                    marginLeft: -200,
                    backgroundColor: '#1e40af',
                    borderRadius: 200,
                    opacity: 0.15,
                    transform: [{ scale: 1.5 }],
                }} />
            </View>

            <View className="p-8 items-center w-full max-w-md z-10">
                {/* Title section with ancient aesthetic */}
                <View className="items-center mb-12">
                    <Text className="text-5xl font-bold text-royal-gold mb-3 text-center tracking-wide" style={{ 
                        textShadowColor: 'rgba(245, 158, 11, 0.5)',
                        textShadowOffset: { width: 0, height: 4 },
                        textShadowRadius: 12,
                    }}>
                        ROYAL GAME
                    </Text>
                    <Text className="text-4xl font-bold text-royal-gold text-center tracking-wide" style={{
                        textShadowColor: 'rgba(245, 158, 11, 0.5)',
                        textShadowOffset: { width: 0, height: 4 },
                        textShadowRadius: 12,
                    }}>
                        OF UR
                    </Text>
                    <View className="h-1 w-32 bg-royal-gold mt-4 rounded-full" style={{
                        shadowColor: '#f59e0b',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 8,
                    }} />
                    <Text className="text-desert-sand text-center mt-4 text-base tracking-wider">
                        The Ancient Race of Kings
                    </Text>
                    <Text className="text-stone-400 text-center mt-2 text-sm">
                        4,500 Years of Strategy
                    </Text>
                </View>

                <View className="w-full gap-5">
                    <Button
                        title="Play vs Bot"
                        onPress={() => router.push('/(game)/lobby')}
                    />
                    <Button
                        title="Online Multiplayer"
                        variant="secondary"
                        disabled
                    />
                </View>
            </View>
        </View>
    );
}
