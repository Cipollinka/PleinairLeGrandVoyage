import React, {useEffect} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BottomNavigation from '@/components/BottomNavigation';
import {PlanningTripKeys, Trip} from '@/types';
import Button from '@/components/ui/Button';
import {ScrollView, View} from 'react-native';
import Title from '@/components/Title';
import Item from './Item';
import TripDetailsModal from '@/components/modals/TripDetails';
import {useUserStore} from '@/stores/userStore';

import pref from '@/constants/preferences.json';

const labels: Record<PlanningTripKeys, string> = {
  [PlanningTripKeys.HISTORY]: 'History and Architecture',
  [PlanningTripKeys.GASTRONOMIC]: 'Gastronomic Tours',
  [PlanningTripKeys.NATURAL]: 'Natural Landscapes',
  [PlanningTripKeys.CULTURE]: 'Culture',
  [PlanningTripKeys.RECREATION]: 'Active Recreation',
};

export default function PlanningTrip() {
  const [items, setItems] = React.useState<Trip[]>([]);
  const [currentKey, setCurrentKey] = React.useState<PlanningTripKeys | null>(
    null,
  );
  const isItems = items.length > 0;

  const [currentTrip, setCurrentTrip] = React.useState<Trip | null>(null);

  const planningTripExploredLocations = useUserStore(
    state => state.planningTripExploredLocations,
  );
  const addPlanningTripExploredLocation = useUserStore(
    state => state.addPlanningTripExploredLocation,
  );

  const handleTripPress = (trip: Trip) => {
    setCurrentTrip(trip);
  };

  const handleExploredLocation = (trip: Trip) => {
    addPlanningTripExploredLocation(trip.id);
  };

  useEffect(() => {
    if (!currentKey) {
      setItems([]);
    } else {
      // @ts-ignore
      setItems(pref?.[currentKey]);
    }
  }, [currentKey]);

  return (
    <BackgroundWrapper>
      {currentKey && (
        <Title text={labels[currentKey]} onPress={() => setCurrentKey(null)} />
      )}

      <TripDetailsModal
        isOpen={!!currentTrip}
        trip={currentTrip}
        onClose={() => setCurrentTrip(null)}
        onExploredLocation={handleExploredLocation}
      />

      <Container>
        {currentKey === null && (
          <View style={{marginTop: '20%'}}>
            <CustomText fw="bold" fs={26} style={{textAlign: 'center'}}>
              Choose one of the vacation options so that our app can generate
              the perfect itinerary for you:
            </CustomText>
          </View>
        )}

        {currentKey === null && (
          <View style={{padding: 16, width: '100%', gap: 10, marginTop: '10%'}}>
            <Button
              title="History and Architecture"
              isFullWidth
              fs={22}
              onPress={() => setCurrentKey(PlanningTripKeys.HISTORY)}
            />
            <Button
              title="Gastronomic Tours"
              fs={22}
              onPress={() => setCurrentKey(PlanningTripKeys.NATURAL)}
            />
            <Button
              title="Natural Landscapes"
              fs={22}
              onPress={() => setCurrentKey(PlanningTripKeys.NATURAL)}
            />
            <Button
              title="Culture"
              fs={22}
              onPress={() => setCurrentKey(PlanningTripKeys.CULTURE)}
            />
            <Button
              title="Active Recreation"
              fs={22}
              onPress={() => setCurrentKey(PlanningTripKeys.RECREATION)}
            />
          </View>
        )}

        {isItems && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            <View
              style={{
                padding: 16,
                width: '100%',
                gap: 10,
                paddingBottom: 30,
              }}>
              {items?.map(trip => {
                return (
                  <Item
                    key={trip.name}
                    trip={trip}
                    onPress={handleTripPress}
                    isExplored={planningTripExploredLocations.includes(trip.id)}
                  />
                );
              })}
            </View>
          </ScrollView>
        )}
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
