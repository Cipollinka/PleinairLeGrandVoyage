import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Trip} from '@/types';
import CustomText from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import UmbrellaIcon from '@/assets/icons/umbrella.svg';

interface Props {
  trip: Trip;
  onPress: (trip: Trip) => void;
  isExplored: boolean;
}

export default function Item({trip, onPress, isExplored}: Props) {
  return (
    <View style={styles.card}>
      {isExplored && (
        <View style={{position: 'absolute', top: 10, left: 10, zIndex: 20}}>
          <UmbrellaIcon width={25} height={25} fill="gold" stroke={'gold'} />
        </View>
      )}

      <Image
        source={{uri: trip.image}}
        style={{width: '100%', height: 150, borderRadius: 24}}
      />

      <View style={{padding: 16}}>
        <CustomText fw="bold" fs={20}>
          {trip.name}
        </CustomText>

        <CustomText fs={17} style={{marginTop: 10}}>
          {trip.description}
        </CustomText>
      </View>

      <View style={{position: 'absolute', bottom: -16, right: 16}}>
        <Button title="Explore" onPress={() => onPress(trip)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 10,

    backgroundColor: '#fff',
    paddingBottom: 30,
    borderRadius: 24,
    marginBottom: 16,
  },
});
