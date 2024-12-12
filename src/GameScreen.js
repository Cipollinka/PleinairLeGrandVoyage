import React from 'react';
import BackgroundMusic from '@/components/BackgroundMusic';
import AppNavigator from '@/components/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function GameScreen() {
  return (
    <SafeAreaProvider>
      <BackgroundMusic />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
