import { useFonts, Cinzel_400Regular, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';

// Load NativeWind (required for web sometimes if not configured in babel)
import "../global.css";

// Prevent auto-hiding of splash screen
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: '#0a0e1a' }}>
      <Stack screenOptions={{
        headerStyle: { backgroundColor: '#0a0e1a' },
        headerTintColor: '#e8d5b7',
        headerTitleStyle: { 
          fontWeight: 'bold',
          fontFamily: 'Cinzel_700Bold',
        },
        contentStyle: { backgroundColor: '#0a0e1a' }
      }}>
        <Stack.Screen name="index" options={{ title: 'Royal Game of Ur', headerShown: false }} />
        <Stack.Screen name="(game)/lobby" options={{ title: 'Cosmic Lobby' }} />
        <Stack.Screen name="match/[id]" options={{ title: 'Celestial Battle', headerBackTitle: 'Return' }} />
      </Stack>
    </View>
  );
}
