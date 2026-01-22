import { PlayerColor } from '@/logic/types';
import React from 'react';
import { View } from 'react-native';

interface PieceProps {
    color: PlayerColor;
    highlight?: boolean;
}

export const Piece: React.FC<PieceProps> = ({ color, highlight }) => {
    // High contrast pieces on light tiles
    // Light player = Deep Blue (lapis lazuli)
    // Dark player = Deep Red (terracotta)
    const bgColor = color === 'light' ? '#1e40af' : '#991b1b'; // player-light : player-dark
    const borderColor = color === 'light' ? '#3b82f6' : '#dc2626'; // player-light-glow : player-dark-glow
    const innerBgColor = '#f59e0b'; // royal-gold for both

    return (
        <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: bgColor,
            borderWidth: highlight ? 4 : 2,
            borderColor: highlight ? '#fbbf24' : borderColor,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 8,
        }}>
            {/* Inner detail - gold dot */}
            <View style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: innerBgColor,
                shadowColor: innerBgColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            }} />
        </View>
    );
};
