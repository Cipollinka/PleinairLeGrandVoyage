import React from 'react';

import BackIcon from '@/assets/icons/back.svg';
import Button from './ui/Button';

export default function BackButton({onPress}: {onPress: () => void}) {
  return (
    <Button
      icon={<BackIcon width={14} height={14} fill={'#000'} />}
      onPress={onPress}
      variant="orange"
    />
  );
}
