import React from 'react';
import Row from './layout/Row';
import BackButton from './BackButton';
import CustomText from './ui/Text';

interface Props {
  text: string;
  onPress?: () => void;
}

export default function Title({text, onPress}: Props) {
  return (
    <Row
      gap={10}
      style={{
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.1,
        shadowRadius: 9,
        backgroundColor: '#fff',
        width: '100%',
      }}>
      {onPress && <BackButton onPress={onPress} />}
      <CustomText fw="bold" fs={20}>
        {text}
      </CustomText>
    </Row>
  );
}
