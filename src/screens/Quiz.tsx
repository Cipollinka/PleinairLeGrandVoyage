import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Title from '@/components/Title';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProp} from '@/types/navigation';
import {Quiz} from '@/types';
import quiz from '@/constants/quiz.json';
import {useUserStore} from '@/stores/userStore';
import {StyleSheet, View} from 'react-native';
import Button from '@/components/ui/Button';
import UmmbrellaIcon from '@/assets/icons/umbrella-second.svg';

import SkipIcon from '@/assets/icons/skip.svg';
import TipIcon from '@/assets/icons/tip.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import Row from '@/components/layout/Row';
import QuizEndModal from '@/components/modals/QuizEndModal';
import QuizFailModal from '@/components/modals/QuizFailModal';

function shuffleArray(array: Quiz[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getButtonStyles = (isCorrect: boolean) => {
  if (isCorrect) {
    return styles.correctAnswerButton;
  } else {
    return styles.incorrectAnswerButton;
  }
};

const livesArr = [1, 2, 3];

export default function Quizz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [lives, setLives] = useState(3);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  const isLastQuestion = currentStep + 1 === quizzes?.length;

  const score = useUserStore(state => state.score);
  const addScore = useUserStore(state => state.addScore);
  const substractScore = useUserStore(state => state.substractScore);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setCurrentQuiz(quizzes[currentStep]);
  }, [currentStep, quizzes]);

  useEffect(() => {
    if (lives === 0) {
      setIsFailModalOpen(true);
    }
  }, [lives]);

  const init = () => {
    const shuffledQuizzes = shuffleArray(quiz);
    setQuizzes(shuffledQuizzes);
    setCurrentQuiz(shuffledQuizzes[0]);
  };

  const handleAnswer = async (isCorrect: boolean, index: number) => {
    setSelectedAnswer(index);
    await sleep(800);
    if (isCorrect) {
      addScore(20);
    } else {
      setLives(prev => (prev > 0 ? prev - 1 : 0));
    }
    setCurrentStep(prev => prev + 1);
    setSelectedAnswer(null);

    if (isLastQuestion && lives > 0) {
      setIsEndModalOpen(true);
      return;
    } else if (isLastQuestion && lives === 0) {
      setIsFailModalOpen(true);
    }
  };

  const handleSkip = () => {
    if (score < 20) {
      return;
    }
    setCurrentStep(prev => prev + 1);
    substractScore(20);
  };

  const handleTip = () => {
    if (score < 50) {
      return;
    }
    // @ts-ignore
    setCurrentQuiz(prev => ({
      ...prev,
      options: prev?.options?.filter(item => item.isCorrect),
    }));
    substractScore(50);
  };

  const handleTryAgain = () => {
    setCurrentStep(0);
    setLives(3);
    setIsEndModalOpen(false);
    setIsFailModalOpen(false);
    init();
  };

  const nav = useNavigation<UseNavigationProp>();
  return (
    <BackgroundWrapper>
      <Title text="Take a guess" onPress={() => nav.goBack()} />

      <QuizEndModal
        score={score}
        onClose={() => setIsEndModalOpen(false)}
        isVisible={isEndModalOpen}
      />

      <QuizFailModal
        isVisible={isFailModalOpen}
        onClose={() => {
          setIsEndModalOpen(false);
          nav.goBack();
        }}
        onTryAgain={handleTryAgain}
      />

      <Container>
        <Row
          style={{
            marginBottom: 10,
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Row
            gap={5}
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 10},
              shadowOpacity: 0.1,
              shadowRadius: 9,
            }}>
            <CustomText fw="bold" fs={20}>
              {score}
            </CustomText>
            <UmmbrellaIcon width={24} height={24} />
          </Row>

          <Row gap={5}>
            {livesArr.map(item => (
              <HeartIcon
                width={24}
                height={24}
                fill={item <= lives ? 'red' : '#000'}
              />
            ))}
          </Row>
        </Row>

        <View style={{alignItems: 'center', width: '100%', marginTop: '28%'}}>
          <View style={{marginTop: 20, alignItems: 'center', width: '100%'}}>
            <CustomText fw="bold" fs={22} style={{textAlign: 'center'}}>
              {currentQuiz?.question}
            </CustomText>
          </View>

          <View
            style={{
              gap: 15,
              marginTop: 50,
              width: '100%',
              alignItems: 'center',
            }}>
            {currentQuiz?.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const answerStyles = isSelected
                ? {...getButtonStyles(option.isCorrect)}
                : {};

              return (
                <Button
                  key={index}
                  isFullWidth
                  title={option.answer}
                  variant={index ? 'purple' : 'blue'}
                  fs={20}
                  onPress={() => handleAnswer(option.isCorrect, index)}
                  style={{...answerStyles}}
                />
              );
            })}
          </View>

          <Row
            style={{
              width: '100%',
              justifyContent: 'space-between',
              marginTop: '20%',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                icon={<SkipIcon width={20} height={20} />}
                title="Skip"
                disabled={score < 20}
                onPress={handleSkip}
              />

              <Row gap={5} style={{marginTop: 10}}>
                <CustomText fw="bold" fs={18}>
                  20
                </CustomText>
                <UmmbrellaIcon
                  width={20}
                  height={20}
                  fill="gold"
                  stroke={'gold'}
                />
              </Row>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                icon={<TipIcon width={20} height={20} />}
                title="Tip"
                disabled={score < 50}
                onPress={handleTip}
              />

              <Row gap={5} style={{marginTop: 10}}>
                <CustomText fw="bold" fs={18}>
                  50
                </CustomText>
                <UmmbrellaIcon width={20} height={20} />
              </Row>
            </View>
          </Row>
        </View>
      </Container>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  correctAnswerButton: {
    backgroundColor: 'rgba(130, 200, 130, 1)',
  },
  incorrectAnswerButton: {
    backgroundColor: 'rgba(255, 50, 50, 1)',
  },
});
