import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { boxShadow } from '@/constants/styleEffects';
import { urTheme, urTypography } from '@/constants/urTheme';
import type { MatchChallengeRewardSummary } from '@/src/challenges/challengeUi';
import { ChallengeCard } from './ChallengeCard';

interface MatchChallengeRewardsPanelProps {
  summary: MatchChallengeRewardSummary | null;
  loading?: boolean;
  errorMessage?: string | null;
}

export const MatchChallengeRewardsPanel: React.FC<MatchChallengeRewardsPanelProps> = ({
  summary,
  loading = false,
  errorMessage = null,
}) => {
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!summary || summary.newlyCompletedChallenges.length === 0) {
      pulseValue.setValue(1);
      return;
    }

    const animation = Animated.sequence([
      Animated.timing(pulseValue, {
        toValue: 1.03,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(pulseValue, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
      pulseValue.setValue(1);
    };
  }, [pulseValue, summary]);

  return (
    <View style={styles.panel}>
      <Text style={styles.eyebrow}>Challenge Rewards</Text>

      {loading ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>Confirming match rewards…</Text>
          <Text style={styles.stateText}>Waiting for the archive to return your updated challenge record.</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>Challenge rewards unavailable</Text>
          <Text style={styles.stateText}>{errorMessage}</Text>
        </View>
      ) : summary && summary.newlyCompletedChallenges.length > 0 ? (
        <Animated.View style={{ gap: urTheme.spacing.sm, transform: [{ scale: pulseValue }] }}>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeLabel}>+{summary.xpAwardedTotal} XP from challenges</Text>
          </View>
          {summary.newlyCompletedChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.challengeId}
              highlight
              challenge={{
                id: challenge.challengeId,
                name: challenge.name,
                description: challenge.description,
                rewardXp: challenge.rewardXp,
                status: 'completed',
                completed: true,
                completedAt: challenge.completedAt,
                completedMatchId: null,
                progressLabel: 'Just completed',
              }}
            />
          ))}
        </Animated.View>
      ) : (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>No new challenge rewards</Text>
          <Text style={styles.stateText}>This match did not unlock any new permanent challenge completions.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: '100%',
    borderRadius: urTheme.radii.md,
    padding: urTheme.spacing.md,
    backgroundColor: 'rgba(10, 15, 20, 0.42)',
    borderWidth: 1,
    borderColor: 'rgba(240, 208, 152, 0.22)',
    gap: urTheme.spacing.sm,
    ...boxShadow({
      color: '#000',
      opacity: 0.16,
      offset: { width: 0, height: 8 },
      blurRadius: 14,
      elevation: 5,
    }),
  },
  eyebrow: {
    ...urTypography.label,
    color: 'rgba(240, 224, 196, 0.68)',
    fontSize: 10,
  },
  totalBadge: {
    alignSelf: 'flex-start',
    borderRadius: urTheme.radii.pill,
    paddingHorizontal: urTheme.spacing.md,
    paddingVertical: urTheme.spacing.xs,
    backgroundColor: 'rgba(104, 74, 20, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 223, 154, 0.48)',
  },
  totalBadgeLabel: {
    ...urTypography.label,
    color: '#FFE6B8',
    fontSize: 11,
  },
  stateBlock: {
    gap: 6,
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
