import { ToastAndroid } from 'react-native';
import useMessageStore, { MessageOption } from '~/store/toasts/messageStore';
import { ToastOption, useToastStore } from '~/store/toasts/toastStore';

export const Toaster = {
  android: {
    show: (message: string) => ToastAndroid.show(message, ToastAndroid.SHORT),
  },
  toast: {
    show: (option: ToastOption) => useToastStore.getState().showToast(option),
  },
  message: {
    show: (option: MessageOption) => useMessageStore.getState().showMessage(option),
  }
};

