import React from 'react';
import {StyleSheet, View} from 'react-native';
import Toast from './Toast';
import {ToastStoreState, useToastStore} from '~/store/toasts/toastStore';

const ToastHost: React.FC = ({}) => {
  const message = useToastStore((state: ToastStoreState) => state.message);
  const type = useToastStore((state: ToastStoreState) => state.type);
  const duration = useToastStore((state: ToastStoreState) => state.duration);
  const hideToast = useToastStore((state: ToastStoreState) => state.hideToast);

  if (!message) return null;
  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Toast
        type={type}
        message={message}
        duration={duration}
        onClose={hideToast}
      />
    </View>
  );
};

export default ToastHost;
