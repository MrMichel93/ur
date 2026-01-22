import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { WoodTextureView } from '@/components/ui/WoodTextureView';
import { TileBase } from '@/components/ui/TileBase';
import { ZigZagBorder } from '@/components/ui/ZigZagBorder';
import { RosetteInlay } from '@/components/ui/RosetteInlay';

/**
 * Demo screen to showcase the visual primitive components
 * This allows verification of the Carved Wood aesthetic before integration
 */
export default function ComponentDemoScreen() {
  return (
    <WoodTextureView className="flex-1">
      <ScrollView className="flex-1 p-8">
        <Text className="text-2xl font-bold text-white mb-6 text-center">
          Visual Primitives Demo
        </Text>
        
        {/* TileBase Demo */}
        <View className="mb-8">
          <Text className="text-lg text-white mb-3">TileBase Components:</Text>
          <View className="flex-row flex-wrap gap-4 justify-center">
            <TileBase size={60} />
            <TileBase size={70} />
            <TileBase size={80} />
          </View>
        </View>
        
        {/* TileBase with RosetteInlay Demo */}
        <View className="mb-8">
          <Text className="text-lg text-white mb-3">Tiles with Rosette Inlays:</Text>
          <View className="flex-row flex-wrap gap-4 justify-center">
            <TileBase size={70}>
              <RosetteInlay size={35} variant="red-blue-gold" />
            </TileBase>
            <TileBase size={70}>
              <RosetteInlay size={35} variant="blue-red-gold" />
            </TileBase>
          </View>
        </View>
        
        {/* RosetteInlay Demo */}
        <View className="mb-8">
          <Text className="text-lg text-white mb-3">Rosette Inlays:</Text>
          <View className="flex-row flex-wrap gap-6 justify-center items-center">
            <RosetteInlay size={50} variant="red-blue-gold" />
            <RosetteInlay size={60} variant="blue-red-gold" />
            <RosetteInlay size={70} variant="red-blue-gold" />
          </View>
        </View>
        
        {/* ZigZagBorder Demo - Horizontal */}
        <View className="mb-8">
          <Text className="text-lg text-white mb-3">Horizontal Zig-Zag Border:</Text>
          <View className="items-center">
            <ZigZagBorder width={300} height={20} triangleSize={20} orientation="horizontal" />
          </View>
        </View>
        
        {/* ZigZagBorder Demo - Vertical */}
        <View className="mb-8">
          <Text className="text-lg text-white mb-3">Vertical Zig-Zag Border:</Text>
          <View className="items-center">
            <ZigZagBorder width={20} height={200} triangleSize={20} orientation="vertical" />
          </View>
        </View>
        
        {/* Combined Demo - Board Preview */}
        <View className="mb-8">
          <Text className="text-lg text-white mb-3">Board Preview:</Text>
          <View className="items-center p-4">
            <View className="bg-[#b8906a] p-4 rounded-lg">
              {/* Top border */}
              <ZigZagBorder width={280} height={15} triangleSize={15} orientation="horizontal" />
              
              {/* Grid of tiles */}
              <View className="my-2">
                <View className="flex-row gap-2 mb-2">
                  <TileBase size={60} />
                  <TileBase size={60}>
                    <RosetteInlay size={30} />
                  </TileBase>
                  <TileBase size={60} />
                </View>
                <View className="flex-row gap-2">
                  <TileBase size={60} />
                  <TileBase size={60} />
                  <TileBase size={60}>
                    <RosetteInlay size={30} variant="blue-red-gold" />
                  </TileBase>
                </View>
              </View>
              
              {/* Bottom border */}
              <ZigZagBorder width={280} height={15} triangleSize={15} orientation="horizontal" />
            </View>
          </View>
        </View>
        
        <View className="h-20" />
      </ScrollView>
    </WoodTextureView>
  );
}
