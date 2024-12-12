import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomModal from '../ui/Modal';
import CustomText from '../ui/Text';
import Row from '../layout/Row';

import CloseIcon from '@/assets/icons/close.svg';
import StarIcon from '@/assets/icons/star.svg';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const stars = [0, 1, 2, 3, 4];

export default function RateApp({isVisible, onClose}: Props) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (isVisible) {
      setCurrentIndex(-1);
    }
  }, [isVisible]);

  return (
    <CustomModal isVisible={isVisible} onClose={onClose}>
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        <Row style={{marginBottom: 10, justifyContent: 'space-between'}}>
          <CustomText fw="bold" fs={24}>
            Rate the app
          </CustomText>

          <CloseIcon width={20} height={20} onPress={onClose} />
        </Row>

        <View style={{marginTop: 16}}>
          <CustomText fw="bold" fs={18} style={{textAlign: 'center'}}>
            Your satisfaction is our priority! We strive to create the best
            experience for you. Share your impressions and rate our application.
          </CustomText>
        </View>

        <Row gap={8} mt={24} style={{justifyContent: 'center'}}>
          {stars.map(item => (
            <TouchableOpacity key={item} onPress={() => setCurrentIndex(item)}>
              <StarIcon
                width={40}
                height={47}
                fill={item <= currentIndex ? '#FFD700' : '#ccc'}
              />
            </TouchableOpacity>
          ))}
        </Row>

        {currentIndex !== -1 && (
          <View style={{alignItems: 'center', marginTop: 10}}>
            <CustomText fs={18}>Thank you for your feedback!</CustomText>
          </View>
        )}
      </View>
    </CustomModal>
  );
}
