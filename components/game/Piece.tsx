import { PlayerColor } from '@/logic/types';
import React from 'react';
import { Platform, View } from 'react-native';

interface PieceProps {
    color: PlayerColor;
    highlight?: boolean;
}

export const Piece: React.FC<PieceProps> = ({ color, highlight }) => {
    // Pearl (Light Player) vs Onyx (Dark Player)
    // Light = Pearl/White with radial gradient effect
    // Dark = Onyx/Black with deep grey bevel
    
    const isPearl = color === 'light';
    
    // Pearl: Cream/White tones
    const pearlBg = '#f5f5f4'; // Light grey/cream
    const pearlBorder = '#e7e5e4'; // Lighter border
    const pearlInner = '#ffffff'; // Pure white center
    
    // Onyx: Deep black/grey tones  
    const onyxBg = '#292524'; // Deep grey/black
    const onyxBorder = '#1c1917'; // Darker border
    const onyxInner = '#44403c'; // Mid grey center
    
    const bgColor = isPearl ? pearlBg : onyxBg;
    const borderColor = isPearl ? pearlBorder : onyxBorder;
    const innerColor = isPearl ? pearlInner : onyxInner;
    
    // Highlight with gold when selected
    const highlightColor = '#f59e0b';

    return (
        <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: bgColor,
            borderWidth: highlight ? 3 : 2,
            borderColor: highlight ? highlightColor : borderColor,
            alignItems: 'center',
            justifyContent: 'center',
            // iOS Shadow properties
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.5,
                    shadowRadius: 6,
                },
                android: {
                    elevation: 8,
                },
            }),
        }}>
            {/* Inner bevel/highlight - creates 3D checker look */}
            <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: innerColor,
                shadowColor: innerColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 3,
            }} />
            
            {/* Highlight glow when selected */}
            {highlight && (
                <View style={{
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    borderRadius: 22,
                    borderWidth: 2,
                    borderColor: highlightColor,
                    opacity: 0.4,
                }} />
            )}
        </View>
    );
};
