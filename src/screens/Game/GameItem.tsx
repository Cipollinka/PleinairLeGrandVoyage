import {TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {CampingItems, ITEMS_IMAGES} from '@/types';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  item: CampingItems;
  onSelect: (item: CampingItems, index: number) => void;
  index: number;
  animation?: {
    x: SharedValue<number>;
    y: SharedValue<number>;
    opacity: SharedValue<number>;
  };
}

export default function GameItem({item, onSelect, index, animation}: Props) {
  const animatedStyle = useAnimatedStyle(() =>
    animation
      ? {
          transform: [
            {translateX: withTiming(animation.x.value, {duration: 500})},
            {translateY: withTiming(animation.y.value, {duration: 500})},
          ],
          opacity: withTiming(animation.opacity.value, {duration: 500}),
        }
      : {},
  );

  return (
    <TouchableOpacity key={item} onPress={() => onSelect(item, index)}>
      <Animated.View style={[animatedStyle]}>
        <Image
          // @ts-ignore
          source={ITEMS_IMAGES[CampingItems[item]]}
          width={120}
          height={120}
          style={{width: 120, height: 120, objectFit: 'contain'}}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
