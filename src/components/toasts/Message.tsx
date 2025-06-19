import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {colors, GLOBAL_KEYS} from '~/constants';
import {widthScreen} from '~/utils/scale';
import {NormalText} from '../texts/NormalText';
import {TitleText} from '../texts/TitleText';
import {ToastType, toastColors} from '~/types/Type';
import { Row } from '../containers/Row';
import { Column } from '../containers/Column';

type MessageProps = {
  type: ToastType;
  title: string;
  message: string;
  duration: number
  onClose?: () => void;
};
const Message: React.FC<MessageProps> = ({
  type = 'success',
  title,
  message,
  duration = 3000,
  onClose,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 10,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),

        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onClose?.();
      });
    }, duration);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Animated.View
      style={[styles.container, {opacity, transform: [{translateY}]}]}>
      <View style={[styles.type, {backgroundColor: toastColors[type]}]} />
      <Column style={styles.content}>
        <TitleText text={title} style={{fontWeight: 'bold', fontSize: GLOBAL_KEYS.TEXT_SIZE_DEFAULT}} />
        <NormalText text={message} style={{color: colors.gray700}}/>
      </Column>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    width: widthScreen * 0.9,
    flexDirection: 'row',
    gap: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',

    // shadow iOS
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2},

    // shadow Android
    elevation: 2,
  },
  content: {
    paddingVertical: 12,
    flexDirection: 'column',
    paddingHorizontal: 12,
    gap: 0
  },
  type: {
    backgroundColor: colors.success,
    width: 5,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default Message;
