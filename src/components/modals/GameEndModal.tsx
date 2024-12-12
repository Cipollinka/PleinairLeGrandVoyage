import {Image, View} from 'react-native';
import React from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Button from '../ui/Button';
import UmmbrellaIcon from '@/assets/icons/umbrella-second.svg';

interface Props {
  percentage: 100 | 75 | 50 | 0;
  onClose: () => void;
  isVisible: boolean;
}

const percentageLabels: Record<number, string> = {
  0: "It looks like you've missed a few important things. For example, when cycling, a helmet is essential for your safety.",
  50: 'Your selection contains several important errors. For example, when hiking in rainy weather, you should take a waterproof tent and a raincoat with you. The weather can change dramatically, and this will protect you from unforeseen situations.',
  75: 'You made a good choice, but there are a few things you should pay more attention to. For example, in the mountains, you should always take a map with you, even if you know the route well. Or make sure your first aid kit has everything you need.',
  100: 'Great work! You have chosen all the necessary things for this situation. Continue in the same spirit and further improve your knowledge about active recreation.',
};

const percentageRewards: Record<number, number> = {
  0: 0,
  50: 10,
  75: 50,
  100: 100,
};

export default function GameEndModal({percentage, onClose, isVisible}: Props) {
  const label = percentageLabels[percentage];

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
            {label}
          </CustomText>

          <CustomText fs={30} fw="bold" style={{textAlign: 'center'}}>
            {percentageRewards[percentage]}{' '}
            <UmmbrellaIcon width={25} height={25} />
          </CustomText>
        </View>

        <Button title="Take" fs={20} onPress={onClose} />
      </View>
    </CustomModal>
  );
}
