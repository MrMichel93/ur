import {
  normalizeUsernameInput,
  sanitizeUsernameSuggestionBase,
  validateUsername,
} from './usernameOnboarding';

describe('username onboarding helpers', () => {
  it('trims and canonicalizes username input', () => {
    expect(normalizeUsernameInput('  Player_One  ')).toEqual({
      input: '  Player_One  ',
      trimmed: 'Player_One',
      display: 'Player_One',
      canonical: 'player_one',
    });
  });

  it('accepts valid usernames', () => {
    const result = validateUsername('Royal_123');

    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBeNull();
    expect(result.canonical).toBe('royal_123');
  });

  it('rejects invalid username characters', () => {
    const result = validateUsername('Royal Game');

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Username can only contain letters, numbers, and underscores.');
  });

  it('sanitizes suggestion bases into allowed characters', () => {
    expect(sanitizeUsernameSuggestionBase(' Michel the Great! ')).toBe('Michel_the_Great');
    expect(sanitizeUsernameSuggestionBase('___')).toBe('');
  });
});
