import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {colors, GLOBAL_KEYS} from '~/constants';

interface NormalTextProps {
  text?: string;
  style?: TextStyle | TextStyle[];
}

export const NormalText: React.FC<NormalTextProps> = ({
  text = 'Normal text',
  style,
}) => {
  return (
    <View>
      <Text style={[styles.text, ...(Array.isArray(style) ? style : [style])]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: GLOBAL_KEYS.TEXT_SIZE_DEFAULT,
    color: colors.black,
    lineHeight: 20,
  },
});
