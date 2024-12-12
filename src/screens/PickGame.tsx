import {View, Image} from 'react-native';
import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import BottomNavigation from '@/components/BottomNavigation';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';

export default function PickGame() {
  const nav = useNavigation<UseNavigationProp>();
  return (
    <BackgroundWrapper>
      <Container>
        <View style={{padding: 16, width: '100%'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '30%',
              width: '100%',
            }}>
            <CustomText fw="bold" fs={30} style={{textAlign: 'center'}}>
              Choose your adventure
            </CustomText>
          </View>

          <Image
            source={{
              uri: 'https://assets.api.uizard.io/api/cdn/stream/b18bc31b-1352-45b3-9d5f-33efc3090a1e.png',
            }}
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: 24,
              marginTop: 26,
            }}
          />

          <View
            style={{
              gap: 16,
              marginTop: 24,
              justifyContent: 'center',
              width: '100%',
            }}>
            <Button
              title="Pack your backpack"
              fs={22}
              isFullWidth
              onPress={() => nav.navigate(Screens.GAME, {isDaily: false})}
            />
            <Button
              title="True / False"
              fs={22}
              onPress={() => nav.navigate(Screens.QUIZ)}
              isFullWidth
            />
          </View>
        </View>
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
