import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { boxShadow } from '@/constants/styleEffects';
import { urTheme, urTypography } from '@/constants/urTheme';
import type { ProgressionSnapshot } from '@/shared/progression';
import { formatProgressionXp, getProgressionDisplayTitle } from '@/src/progression/progressionDisplay';

interface XPDisplayProps {
  progression: ProgressionSnapshot | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const XPDisplay: React.FC<XPDisplayProps> = ({
  progression,
  isLoading = false,
  errorMessage = null,
  compact = false,
  style,
}) => {
  const rankTitle = getProgressionDisplayTitle(progression?.currentRank) ?? progression?.currentRank ?? 'No title yet';

  return (
    <View style={[styles.card, compact && styles.cardCompact, style]}>
      <View style={styles.row}>
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>XP</Text>
        </View>
        <Text style={styles.title}>Royal Record</Text>
      </View>

      {progression ? (
        <>
          <Text style={[styles.totalXp, compact && styles.totalXpCompact]}>{formatProgressionXp(progression.totalXp)} XP</Text>
          <Text style={styles.subtitle}>{rankTitle}</Text>
          <Text style={styles.metaText}>
            {progression.nextRank
              ? `${formatProgressionXp(progression.xpNeededForNextRank)} XP until ${getProgressionDisplayTitle(progression.nextRank) ?? progression.nextRank}`
              : 'Maximum title reached in the current progression ladder.'}
          </Text>
        </>
      ) : isLoading ? (
        <>
          <Text style={[styles.totalXp, compact && styles.totalXpCompact]}>Loading…</Text>
          <Text style={styles.metaText}>Fetching your current XP from Nakama.</Text>
        </>
      ) : errorMessage ? (
        <>
          <Text style={[styles.totalXp, compact && styles.totalXpCompact]}>XP unavailable</Text>
          <Text style={styles.metaText}>{errorMessage}</Text>
        </>
      ) : (
        <>
          <Text style={[styles.totalXp, compact && styles.totalXpCompact]}>No XP yet</Text>
          <Text style={styles.metaText}>Your confirmed XP total will appear here after the server loads it.</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: urTheme.radii.md,
    padding: urTheme.spacing.md,
    backgroundColor: 'rgba(8, 16, 28, 0.56)',
    borderWidth: 1,
    borderColor: 'rgba(167, 207, 255, 0.28)',
    gap: urTheme.spacing.xs,
    ...boxShadow({
      color: '#000',
      opacity: 0.18,
      offset: { width: 0, height: 8 },
      blurRadius: 14,
      elevation: 6,
    }),
  },
  cardCompact: {
    paddingVertical: urTheme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: urTheme.spacing.sm,
  },
  badge: {
    borderRadius: urTheme.radii.pill,
    paddingHorizontal: urTheme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: 'rgba(57, 110, 183, 0.28)',
    borderWidth: 1,
    borderColor: 'rgba(167, 207, 255, 0.3)',
  },
  badgeLabel: {
    ...urTypography.label,
    color: '#D7EBFF',
    fontSize: 10,
  },
  title: {
    ...urTypography.label,
    color: 'rgba(232, 210, 176, 0.74)',
    fontSize: 10,
  },
  totalXp: {
    ...urTypography.title,
    color: '#F7E9D2',
    fontSize: 28,
    lineHeight: 34,
  },
  totalXpCompact: {
    fontSize: 24,
    lineHeight: 30,
  },
  subtitle: {
    ...urTypography.subtitle,
    color: '#A8D2FF',
    fontSize: 16,
    lineHeight: 22,
  },
  metaText: {
    color: 'rgba(235, 224, 206, 0.76)',
    fontSize: 13,
    lineHeight: 18,
  },
});
