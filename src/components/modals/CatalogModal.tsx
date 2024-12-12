import {View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import {Place} from '@/types';
import CustomText from '../ui/Text';

import CloseIcon from '@/assets/icons/close.svg';
import Row from '../layout/Row';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  place: Place | null;
  onExploredLocation: (place: Place) => void;
}

export default function CataloModal({
  isOpen,
  onClose,
  place,
  onExploredLocation,
}: Props) {
  if (!place) return null;

  const handleExploredLocation = () => {
    onExploredLocation(place);
    onClose();
  };

  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        <Row style={{marginBottom: 10, justifyContent: 'space-between'}}>
          <CustomText fw="bold" fs={24}>
            {place.name}
          </CustomText>

          <CloseIcon width={20} height={20} onPress={onClose} />
        </Row>

        <View style={{marginTop: 16, marginBottom: 16, gap: 10}}>
          <CustomText fs={19} style={{textAlign: 'center'}}>
            {place.description}
          </CustomText>

          <CustomText fs={18} style={{textAlign: 'center'}}>
            <CustomText fs={18} fw="bold">
              Famous for:
            </CustomText>
            {place.famous_for}
          </CustomText>

          <CustomText fw="bold" fs={18}>
            Rating: {place.rating}
          </CustomText>
        </View>

        <Button
          title="Explored the location"
          onPress={handleExploredLocation}
        />
      </View>
    </CustomModal>
  );
}
