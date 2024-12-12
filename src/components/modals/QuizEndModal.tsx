import {Image, View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';
import UmmbrellaIcon from '@/assets/icons/umbrella-second.svg';

interface Props {
  score: number;
  onClose: () => void;
  isVisible: boolean;
}

export default function QuizEndModal({score, onClose, isVisible}: Props) {
  return (
    <CustomModal isVisible={isVisible} onClose={onClose}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#fff',
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
            source={require('@/assets/images/congrats.jpeg')}
            style={{width: 200, height: 200, borderRadius: 24}}
          />
        </View>

        <View style={{gap: 10, marginTop: 20, marginBottom: 20}}>
          <CustomText fs={20} style={{textAlign: 'center'}}>
            Congratulations on your result of{' '}
            <CustomText fs={20} fw="bold">
              {' '}
              {score}
            </CustomText>{' '}
            <UmmbrellaIcon width={20} height={20} />
          </CustomText>

          <CustomText fs={18} style={{textAlign: 'center'}}>
            You have successfully passed the quiz
          </CustomText>
        </View>

        <Button title="Take" onPress={onClose} />
      </View>
    </CustomModal>
  );
}
