import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { boxShadow } from '@/constants/styleEffects';
import { urTheme, urTypography } from '@/constants/urTheme';
import type { ChallengeViewModel } from '@/src/challenges/challengeUi';

interface ChallengeCardProps {
  challenge: ChallengeViewModel;
  highlight?: boolean;
}

const STATUS_LABELS: Record<ChallengeViewModel['status'], string> = {
  locked: 'Locked',
  available: 'Available',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, highlight = false }) => {
  const isCompleted = challenge.status === 'completed';

  return (
    <View
      style={[
        styles.card,
        isCompleted && styles.cardCompleted,
        highlight && styles.cardHighlight,
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>{challenge.name}</Text>
          <Text style={styles.description}>{challenge.description}</Text>
        </View>

        <View style={[styles.statusBadge, isCompleted && styles.statusBadgeCompleted]}>
          <Text style={styles.statusLabel}>{STATUS_LABELS[challenge.status]}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.rewardText}>+{challenge.rewardXp} XP</Text>
        <Text style={styles.metaText}>
          {challenge.progressLabel ?? (challenge.completed ? 'Completed' : 'Awaiting completion')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: urTheme.radii.md,
    padding: urTheme.spacing.md,
    backgroundColor: 'rgba(9, 14, 20, 0.52)',
    borderWidth: 1,
    borderColor: 'rgba(225, 190, 123, 0.2)',
    gap: urTheme.spacing.sm,
    ...boxShadow({
      color: '#000',
      opacity: 0.15,
      offset: { width: 0, height: 6 },
      blurRadius: 12,
      elevation: 4,
    }),
  },
  cardCompleted: {
    backgroundColor: 'rgba(32, 51, 28, 0.62)',
    borderColor: 'rgba(159, 214, 119, 0.34)',
  },
  cardHighlight: {
    borderColor: 'rgba(255, 219, 140, 0.78)',
    backgroundColor: 'rgba(83, 57, 19, 0.72)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: urTheme.spacing.sm,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  title: {
    ...urTypography.subtitle,
    color: '#F8ECD6',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
  },
  description: {
    color: 'rgba(242, 230, 209, 0.78)',
    fontSize: 13,
    lineHeight: 19,
  },
  statusBadge: {
    borderRadius: urTheme.radii.pill,
    paddingHorizontal: urTheme.spacing.sm,
    paddingVertical: 5,
    backgroundColor: 'rgba(47, 73, 108, 0.42)',
    borderWidth: 1,
    borderColor: 'rgba(155, 195, 255, 0.28)',
  },
  statusBadgeCompleted: {
    backgroundColor: 'rgba(78, 120, 46, 0.46)',
    borderColor: 'rgba(182, 224, 144, 0.34)',
  },
  statusLabel: {
    ...urTypography.label,
    color: '#E9F6FF',
    fontSize: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: urTheme.spacing.sm,
  },
  rewardText: {
    ...urTypography.label,
    color: urTheme.colors.goldBright,
    fontSize: 12,
  },
  metaText: {
    color: 'rgba(236, 223, 197, 0.66)',
    fontSize: 12,
    lineHeight: 16,
    flexShrink: 1,
    textAlign: 'right',
  },
});
