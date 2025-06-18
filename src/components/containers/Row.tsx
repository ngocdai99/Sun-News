import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {GLOBAL_KEYS} from '../../constants';

interface RowProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const Row: React.FC<RowProps> = ({children, style}) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
