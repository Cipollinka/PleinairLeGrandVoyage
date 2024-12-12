import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp} from 'react-native';

const fontWeights = {
  regular: 'Raleway-Regular',
  bold: 'Raleway-Bold',
  semibold: 'Raleway-SemiBold',
};

const CustomText = ({
  style,
  fw = 'regular',
  fs = 16,
  ...props
}: {
  style?: StyleProp<TextStyle>;
  fw?: 'regular' | 'bold' | 'semibold';
  fs?: number;
  children: React.ReactNode;
}) => {
  return (
    <Text
      style={[
        styles.text,
        style,
        {fontFamily: fontWeights[fw], fontSize: fs || 16},
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});

export default CustomText;
