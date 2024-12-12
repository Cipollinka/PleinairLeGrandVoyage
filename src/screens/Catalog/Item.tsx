import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Place} from '@/types';
import UmbrellaIcon from '@/assets/icons/umbrella.svg';

interface Props {
  place: Place;
  onPress: (place: Place) => void;
  isExplored: boolean;
}

export default function Item({place, onPress, isExplored}: Props) {
  return (
    <View
      // @ts-ignore
      style={{
        position: 'absolute',
        ...place.position,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#fff',
      }}>
      <TouchableOpacity
        onPress={() => onPress(place)}
        style={{position: 'relative'}}>
        {isExplored && (
          <View style={{position: 'absolute', top: 0, left: 0, zIndex: 20}}>
            <UmbrellaIcon width={20} height={20} fill="gold" stroke={'gold'} />
          </View>
        )}
        <Image source={{uri: place.image}} style={{width: 120, height: 80}} />
      </TouchableOpacity>
    </View>
  );
}
