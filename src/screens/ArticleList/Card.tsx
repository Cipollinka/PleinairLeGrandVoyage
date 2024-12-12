import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Article} from '@/types';
import CustomText from '@/components/ui/Text';
import Button from '@/components/ui/Button';

interface Props {
  article: Article;
  onPress: (id: number) => void;
}

export default function Card({article, onPress}: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{uri: article.image}}
        style={{width: '100%', height: 150, borderRadius: 24}}
      />

      <View style={{padding: 16}}>
        <CustomText fw="bold" fs={20}>
          {article.title}
        </CustomText>

        <CustomText fs={17} style={{marginTop: 10}}>
          {article.descriptionShort}
        </CustomText>
      </View>

      <View style={{position: 'absolute', bottom: -16, right: 16}}>
        <Button title="Read more" onPress={() => onPress(article.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    position: 'relative',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 10,

    backgroundColor: '#fff',
    paddingBottom: 30,
    borderRadius: 24,
    marginBottom: 16,
  },
});
