import {Image, View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GettingReady({isOpen, onClose}: Props) {
  return (
    <CustomModal isVisible={isOpen} onClose={onClose}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#fff',
          width: '100%',
        }}>
        <Image
          source={require('@/assets/images/gettingReady.png')}
          style={{width: '100%', height: 200, borderRadius: 24}}
        />

        <View style={{marginBottom: 10, marginTop: 20}}>
          <CustomText fw="bold" fs={22} style={{textAlign: 'center'}}>
            Getting ready for adventures in France?
          </CustomText>
        </View>

        <View style={{marginBottom: 10}}>
          <CustomText style={{textAlign: 'center'}}>
            Pleinair Voyage FR will help you explore the best places, plan your
            route, and save your memories!
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
            title="Start"
            variant="orange"
            onPress={onClose}
            isFullWidth
          />
        </View>
      </View>
    </CustomModal>
  );
}
