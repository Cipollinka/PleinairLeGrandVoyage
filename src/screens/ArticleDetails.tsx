import {View, Text, Image, ScrollView, Share} from 'react-native';
import React, {useEffect, useState} from 'react';
import articles from '@/constants/articles.json';
import {Article} from '@/types';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProp} from '@/types/navigation';
import Button from '@/components/ui/Button';
import ShareIcon from '@/assets/icons/share.svg';

export default function ArticleDetails({route}: any) {
  const nav = useNavigation<UseNavigationProp>();
  const id = route.params.id;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const article = articles[id];
    if (!article) return;

    setArticle(article);
  }, [id]);

  const shareArticle = async () => {
    if (!article) return;

    try {
      const result = await Share.share({
        message: `Check out this article: ${article.title}\n\n${article.descriptionLong}\n\n${article?.image}`,
        url: article?.image, // Optional: Only if you want to share a specific URL
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Article shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  return (
    <BackgroundWrapper>
      <Container>
        <View style={{marginBottom: 10}}>
          <BackButton onPress={() => nav.goBack()} />
        </View>

        <ScrollView>
          <Image
            source={{uri: article?.image}}
            style={{width: '100%', height: 250, borderRadius: 24}}
          />

          <View style={{padding: 16, width: '100%', gap: 20}}>
            <CustomText fs={24} fw="bold">
              {article?.title}
            </CustomText>
            <CustomText fs={18} style={{textAlign: 'justify'}}>
              {article?.descriptionLong}
            </CustomText>
          </View>

          <View style={{flexDirection: 'row-reverse'}}>
            <Button
              icon={<ShareIcon width={20} height={20} />}
              onPress={shareArticle}
            />
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
