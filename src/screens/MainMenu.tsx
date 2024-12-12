import {View, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {useUserStore} from '@/stores/userStore';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import RateApp from '@/components/modals/RateApp';
import UmbrellaIcon from '@/assets/icons/umbrella-second.svg';
import Row from '@/components/layout/Row';
import BottomNavigation from '@/components/BottomNavigation';

export default function MainMenu() {
  const nav = useNavigation<UseNavigationProp>();

  const isGuest = useUserStore(state => state.isGuest);
  const username = useUserStore(state => state.username);
  const [isRateAppModalOpen, setIsRateAppModalOpen] = useState(false);
  const score = useUserStore(state => state.score);

  return (
    <BackgroundWrapper>
      <Image
        source={require('@/assets/images/mainBg.png')}
        style={StyleSheet.absoluteFill}
      />

      <RateApp
        isVisible={isRateAppModalOpen}
        onClose={() => setIsRateAppModalOpen(false)}
      />

      <Container>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 10,
            width: '100%',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 0.1,
            shadowRadius: 9,
          }}>
          <CustomText fw="bold" fs={24}>
            Bonjour, {isGuest ? 'Guest' : username}!
          </CustomText>

          <Row gap={2}>
            <UmbrellaIcon width={20} height={20} fill={'#000'} />

            <Row gap={10}>
              <CustomText fw="bold" fs={22}>
                {score}
              </CustomText>

              <CustomText fw="bold" fs={18}>
                Umbrellas
              </CustomText>
            </Row>
          </Row>
        </View>

        <View style={{width: '100%', gap: 16, marginTop: '45%'}}>
          <Button
            title="Articles"
            fs={24}
            style={{paddingVertical: 20}}
            onPress={() => nav.navigate(Screens.ARTICLE)}
          />
          <Button
            fs={24}
            title="Rate the app"
            style={{paddingVertical: 20}}
            onPress={() => setIsRateAppModalOpen(true)}
            variant="purple"
          />
          <Button
            fs={24}
            title="Daily tasks"
            style={{paddingVertical: 20}}
            onPress={() => nav.navigate(Screens.GAME, {isDaily: true})}
            variant="blue"
          />
          <Button
            fs={24}
            title="Settings"
            style={{paddingVertical: 20}}
            onPress={() => nav.navigate(Screens.SETTINGS)}
          />
        </View>
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
