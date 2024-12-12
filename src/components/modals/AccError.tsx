import {View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isConfirmPasswordError?: boolean;
}

export default function AccErrorModal({
  isOpen,
  onClose,
  isConfirmPasswordError,
}: Props) {
  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <View
        style={{
          // height: 200,
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        <View style={{marginBottom: 10}}>
          <CustomText fw="bold" fs={22}>
            Warning!
          </CustomText>
        </View>
        <View style={{marginBottom: 10}}>
          <CustomText>
            {isConfirmPasswordError &&
              'Your passwords do not match, please review it and try again'}
            {!isConfirmPasswordError &&
              'Incorrect username or password. Please try again.'}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <Button
            title="Close"
            variant="orange"
            onPress={onClose}
            isFullWidth
          />
        </View>
      </View>
    </CustomModal>
  );
}
