import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Screens} from '@/types/navigation';

import HomeIcon from '../assets/icons/home.svg';
import BackpackIcon from '../assets/icons/backpack-icon.svg';
import DairyIcon from '../assets/icons/dairy.svg';
import MapIcon from '../assets/icons/map.svg';
import CatalogIcon from '../assets/icons/catalog.svg';

const options = [
  {
    route: Screens.MAIN_MENU,
    icon: HomeIcon,
  },
  {
    route: Screens.CATALOG,
    icon: MapIcon,
  },
  {
    route: Screens.PLANNING_TRIP,
    icon: CatalogIcon,
  },
  {
    route: Screens.DAIRY,
    icon: DairyIcon,
  },
  {
    route: Screens.PICK_GAME,
    icon: BackpackIcon,
  },
];

const BottomNavigation = () => {
  const nav = useNavigation<any>();
  const route = useRoute();

  const handleOptionPress = (option: (typeof options)[number]) => {
    nav.navigate(option.route);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {options.map((option, index) => {
          const Icon = option.icon;
          const isSelected = route.name === option.route;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}>
              <View>
                <Icon
                  // @ts-ignore
                  style={isSelected ? styles.selectedRoute : styles.route}
                  fill={
                    isSelected ? styles.selectedRoute.color : styles.route.color
                  }
                  height={40}
                  width={40}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#3b4cca',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: -16,
    marginBottom: -16,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 9,
  },
  container: {
    marginVertical: 'auto',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: '#6a0dad',
    paddingBottom: 25,
  },
  selectedRoute: {
    color: '#ff784b',
  },
  route: {
    color: '#fff',
  },
});

export default BottomNavigation;
