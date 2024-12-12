import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import CustomText from '@/components/ui/Text';
import {useUserStore} from '@/stores/userStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccErrorModal from '@/components/modals/AccError';
import Row from '@/components/layout/Row';
import GettingReady from '@/components/modals/GettingReady';

export default function CreateAccount() {
  const nav = useNavigation<UseNavigationProp>();

  const setIsGuest = useUserStore(state => state.setIsGuest);

  const [isRegister, setIsRegister] = useState(false);

  const username = useUserStore(state => state.username);
  const setUsername = useUserStore(state => state.setUsername);

  const password = useUserStore(state => state.password);
  const setPassword = useUserStore(state => state.setPassword);

  const userAccounts = useUserStore(state => state.userAccounts);
  const addUserAccount = useUserStore(state => state.addUserAccount);

  const [confirmPassword, setConfirmPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const data = await AsyncStorage.getItem('user');
    if (!data) {
      return;
    }

    const parsed = JSON.parse(data);
    console.log('parsed', parsed);

    const _password = parsed.state.password;
    const _username = parsed.state.username;
    const _isGuest = parsed.state.isGuest;

    if ((_username && _password) || _isGuest) {
      nav.navigate(Screens.MAIN_MENU);
    }
  };

  const handleContinue = () => {
    if (isRegister && (!username || !password)) {
      setIsError(true);
      setIsConfirmPasswordError(false);
      return;
    } else if (isRegister && password !== confirmPassword) {
      setIsConfirmPasswordError(true);
      setIsError(true);
      return;
    }

    setIsConfirmPasswordError(false);
    if (!username || !password) {
      setIsError(true);
      return;
    } else if (username && password && !isRegister) {
      const userAccount = userAccounts.find(item => item.username === username);
      if (!(userAccount && userAccount.password === password)) {
        setIsError(true);
        return;
      }
    }

    if (isRegister) {
      const lastId =
        userAccounts.length > 0
          ? userAccounts[userAccounts.length - 1].id + 1
          : 0;
      addUserAccount({id: lastId, username, password});
    }
    setIsSuccessModalOpen(true);
    // nav.navigate(Screens.MAIN_MENU);
  };

  const handleGuestContinue = () => {
    setIsGuest(true);
    setIsRegister(false);
    setConfirmPassword('');
    setUsername('');
    setPassword('');
    setIsSuccessModalOpen(true);
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <BackgroundWrapper>
      <AccErrorModal
        isOpen={isError}
        onClose={() => setIsError(false)}
        isConfirmPasswordError={isConfirmPasswordError}
      />
      <GettingReady
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsRegister(false);
          setConfirmPassword('');
          setIsSuccessModalOpen(false);
          nav.navigate(Screens.MAIN_MENU);
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <View style={{width: '100%', alignItems: 'center', marginTop: '5%'}}>
          <Image
            source={require('@/assets/images/loginbg.png')}
            style={styles.avatar}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}>
          <CustomText fw="bold" fs={24}>
            Welcome to Pleinair Voyage FR
          </CustomText>
          <CustomText fs={18}>
            Enter your username and password below
          </CustomText>
        </View>

        <View style={{gap: 10, marginTop: 20, width: '100%'}}>
          <View>
            <Label title="Username" />
            <Input
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View>
            <Label title="Password" />
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
            />
          </View>

          {isRegister && (
            <View>
              <Label title="Confirm Password" />
              <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter your password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
              />
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Row
              gap={10}
              mt={10}
              style={{justifyContent: 'center', width: '75%'}}>
              <Button
                title="Reset"
                onPress={handleReset}
                variant="purple"
                isFullWidth
                fs={22}
              />

              <Button
                title={isRegister ? 'Sign Up' : 'Log In'}
                onPress={handleContinue}
                variant="purple"
                isFullWidth
                fs={22}
              />
            </Row>
          </View>

          <Row style={{justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity onPress={() => handleGuestContinue()}>
              <CustomText fw="bold" fs={14}>
                Continue as guest
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsRegister(prev => !prev);
                setConfirmPassword('');
              }}>
              <CustomText fw="bold" fs={14}>
                {isRegister
                  ? 'Already have an account?'
                  : "Don't have an account?"}
              </CustomText>
            </TouchableOpacity>
          </Row>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
  placeholderAvatar: {
    width: 150,
    height: 150,
    borderRadius: 9999,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#000',
  },
});
