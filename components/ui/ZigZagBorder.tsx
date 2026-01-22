import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

interface ZigZagBorderProps {
  width?: number;
  height?: number;
  triangleSize?: number;
  orientation?: 'horizontal' | 'vertical';
}

/**
 * ZigZagBorder
 * Creates a decorative border pattern with alternating red and cream triangles.
 * This represents the traditional inlay pattern seen in the Royal Game of Ur.
 * 
 * @param width - Total width of the border strip
 * @param height - Total height of the border strip
 * @param triangleSize - Size of each triangle unit
 * @param orientation - Direction of the border (horizontal or vertical)
 */
export const ZigZagBorder: React.FC<ZigZagBorderProps> = ({ 
  width = 300,
  height = 20,
  triangleSize = 20,
  orientation = 'horizontal',
}) => {
  // Colors from the design spec
  const redColor = '#c41e3a'; // Deep red
  const creamColor = '#f5e6d3'; // Cream/off-white
  
  // Calculate how many triangle pairs fit in the given dimension
  const triangleCount = orientation === 'horizontal' 
    ? Math.floor(width / triangleSize)
    : Math.floor(height / triangleSize);
  
  // Generate triangle pairs
  const triangles = [];
  
  for (let i = 0; i < triangleCount; i++) {
    const isRed = i % 2 === 0;
    const color = isRed ? redColor : creamColor;
    
    if (orientation === 'horizontal') {
      // Horizontal zigzag: triangles pointing up and down
      const x = i * triangleSize;
      
      // Upper triangle (pointing up)
      triangles.push(
        <Polygon
          key={`upper-${i}`}
          points={`${x},${height} ${x + triangleSize},${height} ${x + triangleSize / 2},0`}
          fill={color}
        />
      );
      
      // Lower triangle (pointing down) - alternate color
      const lowerColor = isRed ? creamColor : redColor;
      triangles.push(
        <Polygon
          key={`lower-${i}`}
          points={`${x},0 ${x + triangleSize},0 ${x + triangleSize / 2},${height}`}
          fill={lowerColor}
        />
      );
    } else {
      // Vertical zigzag: triangles pointing left and right
      const y = i * triangleSize;
      
      // Left triangle (pointing left)
      triangles.push(
        <Polygon
          key={`left-${i}`}
          points={`${width},${y} ${width},${y + triangleSize} 0,${y + triangleSize / 2}`}
          fill={color}
        />
      );
      
      // Right triangle (pointing right) - alternate color
      const rightColor = isRed ? creamColor : redColor;
      triangles.push(
        <Polygon
          key={`right-${i}`}
          points={`0,${y} 0,${y + triangleSize} ${width},${y + triangleSize / 2}`}
          fill={rightColor}
        />
      );
    }
  }
  
  return (
    <View>
      <Svg width={width} height={height}>
        {triangles}
      </Svg>
    </View>
  );
};
