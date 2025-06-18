import {create} from 'zustand';
import {ToastType} from '~/types/Type';

export type MessageOption = {
  type?: ToastType;
  title: string;
  message: string;
  duration?: number;
};
type MessageStoreState = {
  type: ToastType;
  title: string;
  message: string;
  duration: number;
  showMessage: (option: MessageOption) => void;
  hideMessage: () => void;
};

const useMessageStore = create<MessageStoreState>(set => {
  return {
    type: 'info',
    title: '',
    message: '',
    duration: 3000,
    showMessage: (option: MessageOption) =>
      set({
        type: option.type,
        title: option.title,
        message: option.message,
        duration: option.duration,
      }),
    hideMessage: () =>
      set({
        type: 'info',
        title: '',
        message: '',
        duration: 3000,
      }),
  };
});

export default useMessageStore;
