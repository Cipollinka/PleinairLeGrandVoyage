import {View} from 'react-native';
import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Title from '@/components/Title';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import Slider from '@react-native-community/slider';
import Row from '@/components/layout/Row';
import Button from '@/components/ui/Button';

import MusicIcon from '@/assets/icons/music.svg';
import VibrationIcon from '@/assets/icons/vibration.svg';
import {useUserStore} from '@/stores/userStore';
import {useSettingsStore} from '@/stores/settingsStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const nav = useNavigation<UseNavigationProp>();

  const setUsername = useUserStore(state => state.setUsername);
  const setPassword = useUserStore(state => state.setPassword);
  const setIsGuest = useUserStore(state => state.setIsGuest);

  const clearUserStore = useUserStore(state => state.clear);
  const resetUserStore = useUserStore(state => state.reset);
  const clearSettingsStore = useSettingsStore(state => state.clear);
  const musicVolume = useSettingsStore(state => state.musicVolume);
  const setMusicVolume = useSettingsStore(state => state.setMusicVolume);

  const vibrationForce = useSettingsStore(state => state.vibrationForce);
  const setVibrationForce = useSettingsStore(state => state.setVibrationForce);

  const handleReset = () => {
    resetUserStore();

    nav.navigate(Screens.MAIN_MENU);
  };

  const handleDeleteAccount = () => {
    clearUserStore();
    clearSettingsStore();

    AsyncStorage.clear();

    nav.navigate(Screens.CREATE_ACCOUNT);
  };

  const handleLogOut = () => {
    setUsername('');
    setPassword('');
    setIsGuest(false);

    nav.navigate(Screens.CREATE_ACCOUNT);
  };

  return (
    <BackgroundWrapper>
      <Title text="Settings" onPress={() => nav.goBack()} />

      <Container>
        <View style={{width: '100%', marginTop: '20%'}}>
          <Row gap={10}>
            <MusicIcon width={40} height={40} stroke="#000" fill="#fff" />

            <View style={{gap: 6, width: '100%'}}>
              <CustomText fw="bold" fs={20}>
                Background Music
              </CustomText>
              <Slider
                style={{width: '86%'}}
                minimumValue={0}
                maximumValue={1}
                value={musicVolume}
                onValueChange={setMusicVolume}
              />
            </View>
          </Row>
        </View>

        <View style={{marginTop: 40, width: '100%'}}>
          <Row gap={10}>
            <VibrationIcon
              width={40}
              height={40}
              stroke="#7f8c8d"
              fill="#fff"
            />
            <View style={{gap: 6, width: '86%'}}>
              <CustomText fw="bold" fs={20}>
                Vibration
              </CustomText>
              <Slider
                minimumValue={0}
                maximumValue={1}
                value={vibrationForce}
                onValueChange={setVibrationForce}
              />
            </View>
          </Row>
        </View>

        <View style={{marginTop: 40, width: '100%', gap: 10}}>
          <Button
            fs={20}
            title="Delete Account"
            onPress={handleDeleteAccount}
            isFullWidth
          />

          <Button
            fs={20}
            title="Reset Progress"
            onPress={handleReset}
            isFullWidth
            variant="blue"
          />

          <Button
            fs={20}
            title="Log Out"
            onPress={handleLogOut}
            isFullWidth
            variant="purple"
          />
        </View>
      </Container>
    </BackgroundWrapper>
  );
}
