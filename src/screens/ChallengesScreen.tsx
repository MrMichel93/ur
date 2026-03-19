import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

import { ChallengeList } from '@/components/challenges/ChallengeList';
import { XPDisplay } from '@/components/challenges/XPDisplay';
import { Button } from '@/components/ui/Button';
import { boxShadow } from '@/constants/styleEffects';
import { urTheme, urTypography } from '@/constants/urTheme';
import { useAuth } from '@/src/auth/useAuth';
import { buildChallengeViewModels } from '@/src/challenges/challengeUi';
import { useChallenges } from '@/src/challenges/useChallenges';
import { useProgression } from '@/src/progression/useProgression';

export default function ChallengesScreen() {
  const { user } = useAuth();
  const {
    definitions,
    progress,
    errorMessage: challengeError,
    isLoading: isChallengeLoading,
    isRefreshing: isChallengeRefreshing,
    refresh: refreshChallenges,
  } = useChallenges();
  const {
    progression,
    errorMessage: progressionError,
    isLoading: isProgressionLoading,
    isRefreshing: isProgressionRefreshing,
    refresh: refreshProgression,
  } = useProgression();

  const challengeRows = buildChallengeViewModels(definitions, progress);

  const handleRefresh = async () => {
    await Promise.all([
      refreshChallenges(),
      refreshProgression({ silent: true }),
    ]);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Challenges' }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Challenges & XP</Text>
          <Text style={styles.subtitle}>
            Permanent objectives tracked by the Nakama backend for your authenticated account.
          </Text>
        </View>

        {!user ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Sign in required</Text>
            <Text style={styles.stateText}>Authenticate with Nakama to view your personal challenge archive and XP total.</Text>
          </View>
        ) : (
          <>
            <XPDisplay
              progression={progression}
              isLoading={isProgressionLoading}
              errorMessage={progressionError}
              style={styles.xpDisplay}
            />

            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleWrap}>
                  <Text style={styles.sectionTitle}>Challenge Archive</Text>
                  <Text style={styles.sectionSubtitle}>
                    {progress
                      ? `${progress.totalCompleted} of ${definitions.length} permanent challenges completed.`
                      : 'Loading your permanent challenge record.'}
                  </Text>
                </View>
                <Button title="Refresh" variant="outline" onPress={() => void handleRefresh()} />
              </View>

              {isChallengeRefreshing || isProgressionRefreshing ? (
                <Text style={styles.refreshText}>Refreshing your latest authenticated data…</Text>
              ) : null}
              {challengeError && challengeRows.length > 0 ? (
                <Text style={styles.refreshText}>Showing the most recently synced challenge archive.</Text>
              ) : null}

              {isChallengeLoading && challengeRows.length === 0 ? (
                <View style={styles.stateCardInline}>
                  <Text style={styles.stateTitle}>Opening the archive…</Text>
                  <Text style={styles.stateText}>Fetching definitions and your confirmed completion state from the backend.</Text>
                </View>
              ) : challengeError && challengeRows.length === 0 ? (
                <View style={styles.stateCardInline}>
                  <Text style={styles.stateTitle}>Challenge data unavailable</Text>
                  <Text style={styles.stateText}>{challengeError}</Text>
                </View>
              ) : (
                <ChallengeList challenges={challengeRows} />
              )}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: urTheme.colors.night,
  },
  content: {
    paddingTop: 120,
    paddingHorizontal: urTheme.spacing.md,
    paddingBottom: urTheme.spacing.xl,
    gap: urTheme.spacing.md,
  },
  hero: {
    gap: urTheme.spacing.xs,
  },
  title: {
    ...urTypography.title,
    color: '#F7E9D2',
    fontSize: 34,
    lineHeight: 42,
  },
  subtitle: {
    color: 'rgba(239, 224, 198, 0.84)',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 700,
  },
  xpDisplay: {
    maxWidth: 760,
  },
  sectionCard: {
    borderRadius: urTheme.radii.lg,
    backgroundColor: 'rgba(20, 16, 11, 0.76)',
    borderWidth: 1,
    borderColor: 'rgba(217, 164, 65, 0.36)',
    padding: urTheme.spacing.md,
    gap: urTheme.spacing.sm,
    ...boxShadow({
      color: '#000',
      opacity: 0.26,
      offset: { width: 0, height: 10 },
      blurRadius: 16,
      elevation: 8,
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: urTheme.spacing.sm,
  },
  sectionTitleWrap: {
    flex: 1,
    gap: 4,
  },
  sectionTitle: {
    ...urTypography.subtitle,
    color: '#F8ECD6',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: 'rgba(242, 230, 209, 0.74)',
    fontSize: 13,
    lineHeight: 19,
  },
  refreshText: {
    color: 'rgba(236, 223, 197, 0.62)',
    fontSize: 12,
    lineHeight: 17,
  },
  stateCard: {
    borderRadius: urTheme.radii.md,
    backgroundColor: 'rgba(20, 16, 11, 0.76)',
    borderWidth: 1,
    borderColor: 'rgba(217, 164, 65, 0.36)',
    padding: urTheme.spacing.lg,
    gap: urTheme.spacing.sm,
  },
  stateCardInline: {
    borderRadius: urTheme.radii.md,
    backgroundColor: 'rgba(9, 14, 20, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(240, 208, 152, 0.16)',
    padding: urTheme.spacing.md,
    gap: urTheme.spacing.xs,
  },
  stateTitle: {
    ...urTypography.subtitle,
    color: '#F8ECD6',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  stateText: {
    color: 'rgba(243, 230, 206, 0.78)',
    fontSize: 13,
    lineHeight: 19,
  },
});
