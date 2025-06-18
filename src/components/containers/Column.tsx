import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {GLOBAL_KEYS} from '../../constants';

interface ColumnProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const Column: React.FC<ColumnProps> = ({children, style}) => {
  return <View style={[styles.column, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    gap: 5
  },
});
