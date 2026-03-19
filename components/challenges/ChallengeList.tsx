import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { urTheme, urTypography } from '@/constants/urTheme';
import type { ChallengeViewModel } from '@/src/challenges/challengeUi';
import { ChallengeCard } from './ChallengeCard';

interface ChallengeListProps {
  challenges: ChallengeViewModel[];
  emptyTitle?: string;
  emptyMessage?: string;
  highlightedChallengeIds?: string[];
}

export const ChallengeList: React.FC<ChallengeListProps> = ({
  challenges,
  emptyTitle = 'No challenges available',
  emptyMessage = 'Challenge definitions will appear here once the server archive is available.',
  highlightedChallengeIds = [],
}) => {
  if (challenges.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{emptyTitle}</Text>
        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          highlight={highlightedChallengeIds.includes(challenge.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: urTheme.spacing.sm,
  },
  emptyState: {
    borderRadius: urTheme.radii.md,
    padding: urTheme.spacing.lg,
    backgroundColor: 'rgba(10, 15, 20, 0.46)',
    borderWidth: 1,
    borderColor: 'rgba(255, 225, 178, 0.18)',
    gap: 8,
  },
  emptyTitle: {
    ...urTypography.subtitle,
    color: '#F8ECD6',
    fontSize: 17,
    lineHeight: 22,
  },
  emptyMessage: {
    color: 'rgba(242, 230, 209, 0.76)',
    fontSize: 13,
    lineHeight: 19,
  },
});
