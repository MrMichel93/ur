import { isRosette, isWarZone } from '@/logic/constants';
import { PlayerColor } from '@/logic/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Piece } from './Piece';
import { EyePatternSVG } from './EyePatternSVG';
import { TileBase } from '@/components/ui/TileBase';
import { RosetteInlay } from '@/components/ui/RosetteInlay';

interface TileProps {
    row: number;
    col: number;
    piece?: { id: string, color: PlayerColor }; // If occupied
    isValidTarget?: boolean; // If current roll allows moving here
    onPress?: () => void;
    lastMoveSource?: boolean; // Highlight previous position?
    lastMoveDest?: boolean;
}

export const Tile: React.FC<TileProps> = ({ row, col, piece, isValidTarget, onPress, lastMoveSource, lastMoveDest }) => {
    const rosette = isRosette(row, col);
    const war = isWarZone(row, col);

    return (
        <TileBase 
            style={{ 
                width: '100%', 
                height: '100%',
                margin: 4,
                // Apply valid target styling
                ...(isValidTarget && {
                    borderBottomColor: '#22c55e',
                    borderRightColor: '#22c55e',
                    borderBottomWidth: 4,
                    borderRightWidth: 4,
                }),
                // Last move highlight - subtle yellow tint overlay
                ...(lastMoveDest && {
                    backgroundColor: '#d4a574', // Slightly lighter oak with yellow tint
                }),
            }}
        >
            <TouchableOpacity
                onPress={onPress}
                disabled={!isValidTarget}
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Rosette Pattern - 8-pointed star using RosetteInlay */}
                {rosette && !piece && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <RosetteInlay size={48} />
                    </View>
                )}

                {/* Eye Pattern for war zone non-rosette tiles */}
                {war && !rosette && !piece && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <EyePatternSVG size={32} color="#fbbf24" />
                    </View>
                )}

                {/* Valid Move Indicator (Dot) */}
                {isValidTarget && !piece && (
                    <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#4ade80', opacity: 0.7 }} />
                )}

                {/* Piece */}
                {piece && (
                    <View style={{ opacity: isValidTarget ? 0.7 : 1 }}>
                        <Piece color={piece.color} />
                    </View>
                )}
            </TouchableOpacity>
        </TileBase>
    );
};
