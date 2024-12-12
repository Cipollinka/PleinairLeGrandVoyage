import {Image, View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';
import Row from '../layout/Row';

interface Props {
  onClose: () => void;
  isVisible: boolean;
  onTryAgain: () => void;
}

export default function GameFailModal({onClose, isVisible, onTryAgain}: Props) {
  return (
    <CustomModal isVisible={isVisible} onClose={onClose}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#fff',
          width: '100%',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginHorizontal: 'auto',
          }}>
          <Image
            source={require('@/assets/images/fail.jpeg')}
            style={{width: 200, height: 200, borderRadius: 24}}
          />
        </View>

        <View style={{gap: 10, marginTop: 20}}>
          <CustomText fs={20} style={{textAlign: 'center'}}>
            Oh no! You've run out of lives.
          </CustomText>

          <CustomText fs={18} style={{textAlign: 'center', marginTop: 10}}>
            It looks like this quiz got the best of you, but don’t give up! You
            can restart and try again to improve your score.
          </CustomText>
        </View>

        <Row
          gap={10}
          style={{
            marginTop: 20,
            justifyContent: 'center',
            width: '70%',
            marginHorizontal: 'auto',
          }}>
          <Button title="Close" isFullWidth onPress={onClose} />
          <Button title="Try again" isFullWidth onPress={onTryAgain} />
        </Row>
      </View>
    </CustomModal>
  );
}
