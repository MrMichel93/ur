import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { ProgressionProvider } from './ProgressionContext';
import { useProgression } from './useProgression';

const mockUseAuth = jest.fn();
const mockGetUserProgression = jest.fn();
const mockGetTransportMode = jest.fn();
const mockUseGameStore = jest.fn();

jest.mock('@/src/auth/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('@/services/progression', () => ({
  getUserProgression: (...args: unknown[]) => mockGetUserProgression(...args),
}));

jest.mock('@/config/nakama', () => ({
  getTransportMode: () => mockGetTransportMode(),
}));

jest.mock('@/store/useGameStore', () => ({
  useGameStore: (selector: (state: { lastProgressionAward: null }) => unknown) =>
    mockUseGameStore(selector),
}));

function ProgressionHarness() {
  const { status, errorMessage, unsupportedMessage, progression } = useProgression();

  return (
    <>
      <Text testID="status">{status}</Text>
      <Text testID="unsupported">{unsupportedMessage ?? ''}</Text>
      <Text testID="error">{errorMessage ?? ''}</Text>
      <Text testID="xp">{progression ? String(progression.totalXp) : ''}</Text>
    </>
  );
}

describe('ProgressionProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGameStore.mockImplementation((selector: (state: { lastProgressionAward: null }) => unknown) =>
      selector({ lastProgressionAward: null })
    );
    mockGetTransportMode.mockReturnValue('nakama');
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
    });
  });

  it('does not request progression for offline sessions', async () => {
    mockGetTransportMode.mockReturnValue('offline');
    mockUseAuth.mockReturnValue({
      user: {
        id: 'guest_local_123',
        username: 'Guest',
        email: null,
        avatarUrl: null,
        provider: 'guest',
        createdAt: '2026-03-19T10:00:00.000Z',
      },
      isLoading: false,
    });

    const view = render(
      <ProgressionProvider>
        <ProgressionHarness />
      </ProgressionProvider>
    );

    await waitFor(() => {
      expect(view.getByTestId('status').props.children).toBe('unsupported');
    });

    expect(view.getByTestId('unsupported').props.children).toContain('offline mode');
    expect(mockGetUserProgression).not.toHaveBeenCalled();
  });

  it('does not request progression for local guest sessions without a Nakama user id', async () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 'guest_local_123',
        username: 'Guest',
        email: null,
        avatarUrl: null,
        provider: 'guest',
        createdAt: '2026-03-19T10:00:00.000Z',
      },
      isLoading: false,
    });

    const view = render(
      <ProgressionProvider>
        <ProgressionHarness />
      </ProgressionProvider>
    );

    await waitFor(() => {
      expect(view.getByTestId('status').props.children).toBe('unsupported');
    });

    expect(view.getByTestId('unsupported').props.children).toContain('local guest session');
    expect(mockGetUserProgression).not.toHaveBeenCalled();
  });

  it('loads progression for server-backed accounts', async () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: 'google-1',
        username: 'Player',
        email: 'player@example.com',
        avatarUrl: null,
        provider: 'google',
        createdAt: '2026-03-19T10:00:00.000Z',
        nakamaUserId: 'nakama-user-1',
      },
      isLoading: false,
    });
    mockGetUserProgression.mockResolvedValue({
      totalXp: 100,
      currentRank: 'Servant of the Temple',
      currentRankThreshold: 100,
      nextRank: 'Apprentice Scribe',
      nextRankThreshold: 250,
      xpIntoCurrentRank: 0,
      xpNeededForNextRank: 150,
      progressPercent: 0,
    });

    const view = render(
      <ProgressionProvider>
        <ProgressionHarness />
      </ProgressionProvider>
    );

    await waitFor(() => {
      expect(view.getByTestId('status').props.children).toBe('ready');
    });

    expect(view.getByTestId('xp').props.children).toBe('100');
    expect(mockGetUserProgression).toHaveBeenCalledTimes(1);
  });
});
