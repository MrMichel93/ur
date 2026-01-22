import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Polygon } from 'react-native-svg';

interface RosetteInlayProps {
  size?: number;
  variant?: 'red-blue-gold' | 'blue-red-gold';
}

/**
 * RosetteInlay
 * An SVG component representing the 8-pointed star rosette inlay.
 * This is a traditional decorative element seen on the Royal Game of Ur board.
 * Features concentric layers with Red, Blue, and Gold colors.
 * 
 * @param size - Diameter of the rosette
 * @param variant - Color scheme variant
 */
export const RosetteInlay: React.FC<RosetteInlayProps> = ({ 
  size = 40,
  variant = 'red-blue-gold',
}) => {
  const centerX = size / 2;
  const centerY = size / 2;
  
  // Color palette based on variant
  const colors = variant === 'red-blue-gold' 
    ? {
        outer: '#c41e3a',      // Deep red
        middle: '#1e3a8a',     // Royal blue
        inner: '#ffd700',      // Gold
        accent: '#f5e6d3',     // Cream
      }
    : {
        outer: '#1e3a8a',      // Royal blue
        middle: '#c41e3a',     // Deep red
        inner: '#ffd700',      // Gold
        accent: '#f5e6d3',     // Cream
      };
  
  // Generate 8-pointed star points
  const generateStarPoints = (radius: number, points: number = 8): string => {
    const angleStep = (Math.PI * 2) / points;
    const pointsArray: string[] = [];
    
    for (let i = 0; i < points; i++) {
      // Outer point
      const outerAngle = i * angleStep - Math.PI / 2;
      const outerX = centerX + radius * Math.cos(outerAngle);
      const outerY = centerY + radius * Math.sin(outerAngle);
      pointsArray.push(`${outerX},${outerY}`);
      
      // Inner point (between outer points)
      const innerAngle = (i + 0.5) * angleStep - Math.PI / 2;
      const innerRadius = radius * 0.5; // Inner points are halfway to center
      const innerX = centerX + innerRadius * Math.cos(innerAngle);
      const innerY = centerY + innerRadius * Math.sin(innerAngle);
      pointsArray.push(`${innerX},${innerY}`);
    }
    
    return pointsArray.join(' ');
  };
  
  const outerStarRadius = size * 0.45;
  const middleStarRadius = size * 0.30;
  const innerStarRadius = size * 0.15;
  
  return (
    <View>
      <Svg width={size} height={size}>
        {/* Outer 8-pointed star (Red or Blue) */}
        <Polygon
          points={generateStarPoints(outerStarRadius)}
          fill={colors.outer}
          stroke={colors.accent}
          strokeWidth="0.5"
        />
        
        {/* Middle 8-pointed star (Blue or Red) */}
        <Polygon
          points={generateStarPoints(middleStarRadius)}
          fill={colors.middle}
          stroke={colors.accent}
          strokeWidth="0.5"
        />
        
        {/* Inner circle (Gold) */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={innerStarRadius}
          fill={colors.inner}
          stroke={colors.accent}
          strokeWidth="0.5"
        />
        
        {/* Center dot (Accent) for detail */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={innerStarRadius * 0.3}
          fill={colors.accent}
        />
      </Svg>
    </View>
  );
};
