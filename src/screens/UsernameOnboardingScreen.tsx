import { Button } from '@/components/ui/Button';
import { boxShadow } from '@/constants/styleEffects';
import { urTheme, urTextures, urTypography } from '@/constants/urTheme';
import { validateUsername } from '@/shared/usernameOnboarding';
import { useAuth } from '@/src/auth/useAuth';
import { useOnboardingStatus } from '@/src/onboarding/useOnboardingStatus';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Unable to save your username right now.';

export default function UsernameOnboardingScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { status, isLoading, errorMessage, requiresOnboarding, refresh, claimUsername } = useOnboardingStatus();
  const [username, setUsername] = React.useState('');
  const [hasEdited, setHasEdited] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!requiresOnboarding && user) {
      router.replace('/');
    }
  }, [requiresOnboarding, router, user]);

  React.useEffect(() => {
    if (hasEdited || !status?.suggestedUsername) {
      return;
    }

    setUsername(status.suggestedUsername);
  }, [hasEdited, status?.suggestedUsername]);

  const validation = validateUsername(username);
  const hasInput = username.trim().length > 0;
  const canSubmit = hasInput && validation.isValid && !isSubmitting && !isLoading;
  const inlineValidationMessage = hasInput && !validation.isValid ? validation.errorMessage : null;

  const handleSubmit = async () => {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const result = await claimUsername(username);

      if (!result.success) {
        setSubmitError(result.errorMessage);
        return;
      }

      router.replace('/');
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Image source={urTextures.woodDark} resizeMode="repeat" style={styles.texture} />
      <View style={styles.topGlow} />
      <View style={styles.bottomShade} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Image source={urTextures.goldInlay} resizeMode="repeat" style={styles.cardTexture} />
          <View style={styles.cardBorder} />

          <Text style={styles.eyebrow}>Public Profile</Text>
          <Text style={styles.title}>Choose your username</Text>
          <Text style={styles.subtitle}>
            This is the name other players will see on leaderboards, tournaments, and friend lists.
          </Text>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={username}
              onChangeText={(value) => {
                setHasEdited(true);
                setUsername(value);
                setSubmitError(null);
              }}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              maxLength={16}
              placeholder={status?.suggestedUsername ?? 'Choose a username'}
              placeholderTextColor="rgba(239, 224, 198, 0.42)"
              style={[
                styles.input,
                (inlineValidationMessage || submitError) && styles.inputError,
              ]}
              accessibilityLabel="Username"
              returnKeyType="done"
              onSubmitEditing={() => {
                if (canSubmit) {
                  void handleSubmit();
                }
              }}
            />
            <Text style={styles.helperText}>
              3-16 characters. Letters, numbers, and underscores only.
            </Text>
            {isLoading ? <Text style={styles.metaText}>Fetching your suggested username...</Text> : null}
            {inlineValidationMessage ? <Text style={styles.errorText}>{inlineValidationMessage}</Text> : null}
            {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}
            {errorMessage && !submitError ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>

          <View style={styles.buttonStack}>
            <Button
              title={isSubmitting ? 'Saving...' : 'Continue'}
              loading={isSubmitting}
              disabled={!canSubmit}
              onPress={() => void handleSubmit()}
            />
            <Button
              title="Refresh suggestion"
              variant="outline"
              disabled={isLoading || isSubmitting}
              onPress={() => void refresh()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: urTheme.colors.night,
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: urTheme.spacing.lg,
    paddingVertical: urTheme.spacing.xl,
  },
  texture: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.32,
  },
  topGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '34%',
    backgroundColor: 'rgba(180, 120, 30, 0.12)',
  },
  bottomShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '42%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  card: {
    width: '100%',
    maxWidth: 460,
    borderRadius: urTheme.radii.lg,
    borderWidth: 1.4,
    borderColor: 'rgba(217, 164, 65, 0.72)',
    padding: urTheme.spacing.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(13, 15, 18, 0.7)',
    ...boxShadow({
      color: '#000',
      opacity: 0.28,
      offset: { width: 0, height: 12 },
      blurRadius: 16,
      elevation: 10,
    }),
  },
  cardTexture: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.16,
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    margin: urTheme.spacing.xs,
    borderRadius: urTheme.radii.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 231, 192, 0.24)',
  },
  eyebrow: {
    ...urTypography.label,
    fontSize: 11,
    color: urTheme.colors.parchment,
    marginBottom: urTheme.spacing.xs,
    textAlign: 'center',
  },
  title: {
    ...urTypography.title,
    color: urTheme.colors.ivory,
    textAlign: 'center',
    fontSize: 34,
    lineHeight: 40,
  },
  subtitle: {
    color: 'rgba(239, 224, 198, 0.82)',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: urTheme.spacing.sm,
    marginBottom: urTheme.spacing.lg,
  },
  inputSection: {
    gap: urTheme.spacing.xs,
    marginBottom: urTheme.spacing.lg,
  },
  label: {
    ...urTypography.label,
    color: urTheme.colors.parchment,
    fontSize: 12,
  },
  input: {
    borderRadius: urTheme.radii.md,
    borderWidth: 1,
    borderColor: 'rgba(217, 164, 65, 0.42)',
    backgroundColor: 'rgba(8, 11, 15, 0.76)',
    color: urTheme.colors.ivory,
    paddingHorizontal: urTheme.spacing.md,
    paddingVertical: urTheme.spacing.sm + 2,
    fontSize: 18,
    lineHeight: 24,
  },
  inputError: {
    borderColor: '#F6AAA2',
  },
  helperText: {
    color: 'rgba(239, 224, 198, 0.66)',
    lineHeight: 20,
  },
  metaText: {
    color: 'rgba(239, 224, 198, 0.66)',
    fontSize: 12,
    lineHeight: 18,
  },
  errorText: {
    color: '#F6AAA2',
    lineHeight: 20,
  },
  buttonStack: {
    gap: urTheme.spacing.sm,
  },
});
