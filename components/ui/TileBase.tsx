import React from 'react';
import { View, ViewProps } from 'react-native';

interface TileBaseProps extends ViewProps {
  children?: React.ReactNode;
  size?: number;
  className?: string;
}

/**
 * TileBase
 * A component representing a single wooden tile with:
 * - Warm wood background color
 * - Inner shadow/highlight border to create a beveled/carved appearance
 * - 3D depth effect using layered shadows
 */
export const TileBase: React.FC<TileBaseProps> = ({ 
  children, 
  size = 60,
  className = '',
  style,
  ...props 
}) => {
  return (
    <View
      className={`relative ${className}`}
      style={[
        {
          width: size,
          height: size,
          backgroundColor: '#b8906a', // Warm wood color (medium oak)
          borderRadius: 4,
          // iOS shadow for depth
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          // Android elevation
          elevation: 5,
        },
        style,
      ]}
      {...props}
    >
      {/* Top-left inner shadow (darker) */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderTopColor: 'rgba(0, 0, 0, 0.2)',
          borderLeftColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 4,
        }}
      />
      
      {/* Bottom-right highlight (lighter) */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderBottomWidth: 2,
          borderRightWidth: 2,
          borderBottomColor: 'rgba(255, 255, 255, 0.3)',
          borderRightColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 4,
        }}
      />
      
      {/* Content layer */}
      <View 
        style={{ 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
};
