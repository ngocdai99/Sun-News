import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {colors} from '~/constants';
import {widthScreen} from '~/utils/scale';
import {NormalText} from '../texts/NormalText';
import {TitleText} from '../texts/TitleText';
import {ToastType, toastColors} from '~/types/Type';
import { Row } from '../containers/Row';

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
      <Row>
        <TitleText text={title} style={{fontWeight: '700', fontSize: 14}} />
        <NormalText text={message} />
      </Row>
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
    borderRadius: 10,
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
    paddingVertical: 5,
    flexDirection: 'column',
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
