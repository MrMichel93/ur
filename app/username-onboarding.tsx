import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { urTheme, urTypography } from '@/constants/urTheme';
import UsernameOnboardingScreen from '@/src/screens/UsernameOnboardingScreen';
import { useAuth } from '@/src/auth/useAuth';

export default function UsernameOnboardingRoute() {
  const { user, isLoading, isUsernameOnboardingLoading, isUsernameOnboardingRequired } = useAuth();
  const isCheckingGoogleOnboarding = user?.provider === 'google' && isUsernameOnboardingLoading;

  if (isLoading || isCheckingGoogleOnboarding) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator color={urTheme.colors.parchment} size="large" />
        <Text style={styles.message}>Preparing your public profile...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  if (!isUsernameOnboardingRequired) {
    return <Redirect href="/" />;
  }

  return <UsernameOnboardingScreen />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: urTheme.spacing.sm,
    backgroundColor: urTheme.colors.night,
    paddingHorizontal: urTheme.spacing.lg,
  },
  message: {
    ...urTypography.label,
    color: urTheme.colors.parchment,
    textAlign: 'center',
  },
});
