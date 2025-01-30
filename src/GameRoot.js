import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from '@/components/AppNavigator';
import BackgroundMusic from '@/components/BackgroundMusic';

export default function GameRoot() {
  return (
      <SafeAreaProvider>
          <BackgroundMusic />
          <AppNavigator />
      </SafeAreaProvider>
  );
}
