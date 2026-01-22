import React from 'react';
import { View, ViewProps } from 'react-native';
import Svg, { Line } from 'react-native-svg';

interface WoodTextureViewProps extends ViewProps {
  children?: React.ReactNode;
}

/**
 * WoodTextureView
 * A container that applies a dark vertical plank background texture.
 * Simulates a dark blue-grey stained wood with vertical grain lines.
 * Color: #1e293b (dark blue-grey)
 */
export const WoodTextureView: React.FC<WoodTextureViewProps> = ({ 
  children, 
  className = '',
  style,
  ...props 
}) => {
  return (
    <View 
      className={`bg-[#1e293b] ${className}`}
      style={style}
      {...props}
    >
      {/* Vertical grain texture overlay using SVG */}
      <Svg 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          opacity: 0.3 
        }}
        width="100%" 
        height="100%"
      >
        {/* Create vertical grain lines at regular intervals */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Line
            key={`grain-${i}`}
            x1={`${i * 5}%`}
            y1="0%"
            x2={`${i * 5}%`}
            y2="100%"
            stroke="#000000"
            strokeWidth="1"
            opacity="0.4"
          />
        ))}
      </Svg>
      
      {/* Content layer */}
      <View style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </View>
    </View>
  );
};
