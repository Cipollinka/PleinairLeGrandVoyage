/* eslint-disable react-hooks/rules-of-hooks */
import {Dimensions, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BackButton from '@/components/BackButton';
import Row from '@/components/layout/Row';
import {CampingItems, DailyGame} from '@/types';
import GameItem from '@/screens/Game/GameItem';
import {useSharedValue} from 'react-native-reanimated';

import UmbrellaIcon from '@/assets/icons/umbrella-second.svg';
import BackpackIcon from '@/assets/icons/backpack.svg';

import Timer from './Timer';
import {useUserStore} from '@/stores/userStore';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProp} from '@/types/navigation';
import GameEndModal from '@/components/modals/GameEndModal';
import Button from '@/components/ui/Button';

import UmmbrellaIcon from '@/assets/icons/umbrella-second.svg';

import SkipIcon from '@/assets/icons/skip.svg';
import TipIcon from '@/assets/icons/tip.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import GameFailModal from '@/components/modals/GameFailModal';

import daily_game from '@/constants/daily_game.json';
import pack_backpack from '@/constants/pack_backpack.json';

const percentageRewards: Record<number, number> = {
  0: 0,
  50: 10,
  75: 50,
  100: 100,
};

const livesArr = [1, 2, 3];

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Game({route}: any) {
  const nav = useNavigation<UseNavigationProp>();
  const [collectedItems, setCollectedItems] = useState<CampingItems[]>([]);
  const [scenario, setScenario] = useState<DailyGame | null>(null);

  const [currentStep, setCurrentStep] = useState(0);

  const isDaily = route?.params?.isDaily;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  const [percentage, setPercentage] = useState<0 | 50 | 75 | 100>(0);
  const [lives, setLives] = useState(3);

  const currentDayGameIndex = useUserStore(state => state.currentDayGameIndex);
  const setCurrentDayGameIndex = useUserStore(
    state => state.setCurrentDayGameIndex,
  );

  const score = useUserStore(state => state.score);
  const addScore = useUserStore(state => state.addScore);
  const substractScore = useUserStore(state => state.substractScore);

  const targetXPosition = screenWidth / 2 - 120 / 2;
  const targetYPosition = screenHeight - 120;

  useEffect(() => {
    if (isDaily) {
      const scenario = daily_game[currentDayGameIndex % 7] as DailyGame;
      setScenario(scenario);
    } else {
      const scenario = pack_backpack[currentStep] as DailyGame;
      setScenario({...scenario, allItems: shuffleArray(scenario.allItems)});
    }
  }, [currentDayGameIndex, isDaily, currentStep]);

  useEffect(() => {
    if (!scenario) return;

    if (collectedItems.length === scenario.itemsToCollectCount) {
      calculateResults();
      return;
    }
  }, [collectedItems, scenario, isDaily]);

  useEffect(() => {
    if (lives === 0 && !isDaily) {
      setIsFailModalOpen(true);
    }
  }, [lives, isDaily]);

  const itemAnimations = Array.from({length: 20}, () => ({
    x: useSharedValue(0),
    y: useSharedValue(0),
    opacity: useSharedValue(1),
  }));

  const handleItemSelect = (item: CampingItems, index: number) => {
    if (!scenario) return;

    const animation = itemAnimations?.[index];

    if (animation) {
      animation.y.value = targetYPosition;

      if (index % 3 === 0) {
        animation.x.value = targetXPosition;
      } else if (index === 1 || index === 4) {
        animation.x.value = 0;
      } else if (index === 2 || index === 5 || index === 7) {
        animation.x.value = -targetXPosition;
      }
      animation.opacity.value = 0;
    }

    if (!scenario.perfectItems.includes(item)) {
      setLives(prev => prev - 1);
    }

    if (collectedItems.length === scenario.itemsToCollectCount) {
      calculateResults();
      return;
    }
    setCollectedItems(prev => [...prev, item]);
  };

  const calculateResults = () => {
    if (!scenario) return;

    const {perfectItems, goodItems, wrongItems, itemsToCollectCount} = scenario;

    // Count matches in each category
    const perfectMatches = collectedItems.filter(item =>
      perfectItems.includes(item),
    ).length;
    const goodMatches = collectedItems.filter(item =>
      goodItems.includes(item),
    ).length;
    const wrongMatches = collectedItems.filter(item =>
      wrongItems.includes(item),
    ).length;

    if (perfectMatches === perfectItems.length) {
      setPercentage(100);
    } else if (goodMatches >= itemsToCollectCount - 2 && wrongMatches === 0) {
      setPercentage(75);
    } else if (wrongMatches > 0 || perfectMatches < perfectItems.length) {
      setPercentage(50);
    } else {
      setPercentage(0);
    }

    setIsEndModalOpen(true);
  };

  const handleEndModalClose = () => {
    const reward = percentageRewards[percentage];
    addScore(reward);

    handleTryAgain();
    console.log('currentStep', currentStep);

    if (isDaily) {
      setCurrentDayGameIndex(currentDayGameIndex + 1);
      nav.goBack();
    } else {
      if (currentStep === pack_backpack.length - 1) {
        nav.goBack();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleTryAgain = (isTryAgain?: boolean) => {
    setIsEndModalOpen(false);
    setIsFailModalOpen(false);

    if (isTryAgain) {
      setLives(3);
      setCurrentStep(0);
    }

    setCollectedItems([]);
    setScenario(pack_backpack[0] as DailyGame);
    setPercentage(0);

    itemAnimations.forEach(item => {
      item.x.value = 0;
      item.y.value = 0;
      item.opacity.value = 1;
    });
  };

  const handleFailModalClose = () => {
    setIsFailModalOpen(false);
    handleTryAgain();
    nav.goBack();
  };

  const handleTip = () => {
    const wrongItems = scenario?.allItems.filter(
      item => !scenario.perfectItems.includes(item),
    );
    if (!wrongItems) return;

    setScenario(prev => ({
      ...prev,
      allItems: prev?.allItems.filter(item => item !== wrongItems[0]),
    }));
    substractScore(50);
  };
  const handleSkip = () => {
    substractScore(20);
    setCurrentStep(prev => prev + 1);
  };

  return (
    <BackgroundWrapper>
      <GameEndModal
        isVisible={isEndModalOpen}
        onClose={handleEndModalClose}
        percentage={percentage}
      />
      <GameFailModal
        isVisible={isFailModalOpen}
        onClose={handleFailModalClose}
        onTryAgain={() => handleTryAgain(true)}
      />

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
        <BackButton onPress={() => nav.goBack()} />
        <CustomText fw="bold" fs={20}>
          {isDaily && `Game ${currentDayGameIndex + 1}:`} Pack your items
        </CustomText>
      </Row>

      <Container>
        <View style={{marginBottom: 10}}>
          <CustomText fw="bold" fs={22} style={{textAlign: 'center'}}>
            Task: {scenario?.task}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 10,
          }}>
          <Row gap={5}>
            <CustomText fw="bold" fs={20}>
              {score}
            </CustomText>
            <UmbrellaIcon width={18} height={18} fill="#000" />
          </Row>

          {isDaily && (
            <Timer
              onTimeOut={() => console.log('Timeout 222')}
              trigger={currentDayGameIndex}
            />
          )}
          {!isDaily && (
            <Row gap={5}>
              {livesArr.map(item => (
                <HeartIcon
                  key={item}
                  width={24}
                  height={24}
                  fill={item <= lives ? 'red' : '#000'}
                />
              ))}
            </Row>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow: 1}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'center',
            }}>
            {scenario?.allItems.map((item, index) => (
              <GameItem
                key={item}
                onSelect={handleItemSelect}
                item={item}
                index={index}
                animation={itemAnimations[index]}
              />
            ))}
          </View>
        </ScrollView>

        <Row
          style={{
            width: '100%',
            justifyContent: isDaily ? 'center' : 'space-between',
            marginTop: '5%',
          }}>
          {!isDaily && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                icon={<SkipIcon width={20} height={20} />}
                title="Skip"
                disabled={
                  score < 20 || currentStep === pack_backpack.length - 1
                }
                onPress={handleSkip}
              />

              <Row gap={5} style={{marginTop: 10}}>
                <CustomText fw="bold" fs={18}>
                  20
                </CustomText>
                <UmmbrellaIcon width={20} height={20} />
              </Row>
            </View>
          )}

          <BackpackIcon width={150} height={150} fill="#000" />

          {!isDaily && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                icon={<TipIcon width={20} height={20} />}
                title="Tip"
                disabled={
                  score < 50 ||
                  scenario?.perfectItems?.length === scenario?.allItems?.length
                }
                onPress={handleTip}
              />

              <Row gap={5} style={{marginTop: 10}}>
                <CustomText fw="bold" fs={18}>
                  50
                </CustomText>
                <UmmbrellaIcon width={20} height={20} />
              </Row>
            </View>
          )}
        </Row>
      </Container>
    </BackgroundWrapper>
  );
}
