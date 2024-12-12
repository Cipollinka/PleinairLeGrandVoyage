import React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';

const styleView = {
  flex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: '#000000',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
};

const styleText = {color: 'white', fontSize: 25, marginTop: 20};

export default function LoadingAppManager() {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styleView}>
      <Image
        style={{position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.7}}
        source={require('./assets/images/loader2.png')}
      />
      <ActivityIndicator color={'white'} />
      <Text style={styleText}>{'Loading'}{dots}</Text>
    </View>
  );
}