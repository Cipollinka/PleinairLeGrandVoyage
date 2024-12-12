import {ScrollView, View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import {Highlight, Trip} from '@/types';
import CustomText from '../ui/Text';

import CloseIcon from '@/assets/icons/close.svg';
import Row from '../layout/Row';
import Button from '../ui/Button';

import LocationIcon from '@/assets/icons/location.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onExploredLocation: (trip: Trip) => void;
  trip: Trip | null;
}

export default function TripDetailsModal({
  isOpen,
  onClose,
  trip,
  onExploredLocation,
}: Props) {
  if (!trip) return null;

  const isStringHighlights = typeof trip.highlights[0] === 'string';

  const handleExploredLocation = () => {
    onExploredLocation(trip);
    onClose();
  };

  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              padding: 16,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}>
            <Row style={{marginBottom: 10, justifyContent: 'space-between'}}>
              <CustomText fw="bold" fs={24}>
                {trip.name}
              </CustomText>

              <CloseIcon width={20} height={20} onPress={onClose} />
            </Row>

            <Row gap={5}>
              <LocationIcon width={20} height={20} />

              <CustomText fw="bold" fs={18}>
                {trip.location}
              </CustomText>
            </Row>

            <View style={{marginTop: 16, marginBottom: 16, gap: 10}}>
              <CustomText fs={18}>{trip.description}</CustomText>

              <View style={{gap: 10, marginTop: 20}}>
                <CustomText fs={20} fw="bold">
                  Highlights:
                </CustomText>

                {trip.highlights.map((item, index) => {
                  if (isStringHighlights) {
                    const str = item as string;
                    return (
                      <View key={str} style={{marginTop: 5}}>
                        <CustomText>{str}</CustomText>
                      </View>
                    );
                  }

                  const highlight = item as Highlight;
                  return (
                    <View key={highlight.name}>
                      <CustomText fw="bold" fs={20}>
                        {index + 1}. {highlight.name}
                      </CustomText>

                      {highlight.features.map((feature, fIndex) => (
                        <View
                          key={feature}
                          style={{marginBottom: 5, marginLeft: 10}}>
                          <CustomText key={feature} fs={18}>
                            {index + 1}.{fIndex + 1}. {feature}
                          </CustomText>
                        </View>
                      ))}

                      {highlight.activities &&
                        highlight?.activities?.length > 0 && (
                          <View style={{marginTop: 10, marginLeft: 10, gap: 5}}>
                            <CustomText fs={18} fw="bold">
                              Activities:
                            </CustomText>
                            {highlight?.activities.map(item => (
                              <View key={item}>
                                <CustomText>{item}</CustomText>
                              </View>
                            ))}
                          </View>
                        )}
                    </View>
                  );
                })}
              </View>
            </View>

            <Button
              title="Explored the location"
              onPress={handleExploredLocation}
            />
          </View>
        </View>
      </ScrollView>
    </CustomModal>
  );
}
