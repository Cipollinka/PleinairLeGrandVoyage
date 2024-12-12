import React from 'react';
import {SafeAreaView} from 'react-native';

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#f2f2f2', position: 'relative'}}>
      {children}
    </SafeAreaView>
  );
}
