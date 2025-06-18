import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { colors, GLOBAL_KEYS } from '~/constants';

interface TitleTextProps {
  text?: string | number;
  color?: string;
  style?: TextStyle | TextStyle[];
}

export const TitleText: React.FC<TitleTextProps> = ({
  text = 'Title text',
  color = colors.black,
  style,
}) => {
  return (
    <View>
      <Text style={[styles.text, {color}, style]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: GLOBAL_KEYS.TEXT_SIZE_TITLE,
    fontWeight: '500',
  } ,
});
