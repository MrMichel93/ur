import { Platform } from 'react-native';

/**
 * Platform-specific serif font family for historical aesthetic
 * iOS: Georgia - classic serif font
 * Android: serif - system serif font
 */
export const SERIF_FONT = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});
