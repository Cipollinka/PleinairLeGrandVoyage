import {Image, ScrollView, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import BottomNavigation from '@/components/BottomNavigation';
import places from '@/constants/places.json';
import Item from './Item';
import {Place} from '@/types';
import CataloModal from '@/components/modals/CatalogModal';
import {useUserStore} from '@/stores/userStore';

export default function Catalog() {
  const scrollViewRef = useRef<ScrollView>(null);

  const [currentOpenedPlace, setCurrentOpenedPlace] = useState<Place | null>(
    null,
  );

  const catalogExploredLocations = useUserStore(
    state => state.catalogExploredLocations,
  );
  const addCatalogExploredLocation = useUserStore(
    state => state.addCatalogExploredLocation,
  );

  useEffect(() => {
    // Set default scroll position to 100 pixels from the left
    scrollViewRef.current?.scrollTo({x: 300, animated: false});
  }, []);

  const handlePlacePress = (place: Place) => {
    console.log();
    setCurrentOpenedPlace(place);
  };

  const handleExploredLocation = (place: Place) => {
    addCatalogExploredLocation(place.id);
  };

  return (
    <BackgroundWrapper>
      <View style={{backgroundColor: '#111'}}>
        <CataloModal
          isOpen={!!currentOpenedPlace}
          place={currentOpenedPlace}
          onClose={() => setCurrentOpenedPlace(null)}
          onExploredLocation={handleExploredLocation}
        />
        <ScrollView
          horizontal
          style={{position: 'relative'}}
          ref={scrollViewRef}>
          <Image
            source={require('@/assets/images/france.jpeg')}
            style={[{resizeMode: 'cover'}]}
            resizeMode="contain"
          />

          {places.map(item => (
            <Item
              key={item.id}
              place={item}
              onPress={handlePlacePress}
              isExplored={catalogExploredLocations.includes(item.id)}
            />
          ))}
        </ScrollView>
      </View>
      <BottomNavigation />
    </BackgroundWrapper>
  );
}
