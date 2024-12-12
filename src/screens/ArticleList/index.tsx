import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import Row from '@/components/layout/Row';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import CustomText from '@/components/ui/Text';
import Card from './Card';
import articles from '@/constants/articles.json';
import Title from '@/components/Title';

export default function ArticleList() {
  const nav = useNavigation<UseNavigationProp>();

  const handleCardPress = (id: number) => {
    nav.navigate(Screens.ARTICLE_DETAILS, {id});
  };

  return (
    <BackgroundWrapper>
      <Title text="Articles" onPress={() => nav.navigate(Screens.MAIN_MENU)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%', marginTop: 20, paddingBottom: 60}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            width: '100%',
          }}>
          {articles.map(item => (
            <Card
              key={item.id}
              onPress={() => handleCardPress(item.id)}
              article={item}
            />
          ))}
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}
