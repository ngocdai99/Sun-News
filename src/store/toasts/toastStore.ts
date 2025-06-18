import {create} from 'zustand';
import {ToastType} from '~/types/Type';

export interface ToastOption {
  type?: ToastType;
  message: string;
  duration?: number;
}
export interface ToastStoreState {
  type: ToastType;
  message: string;
  duration?: number;
  showToast: (option: ToastOption) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStoreState>(set => {
  return {
    type: 'info',
    message: '',
    duration: 2000,
    showToast: (option: ToastOption) =>
      set({
        type: option.type ?? 'info',
        message: option.message,
        duration: option.duration ?? 2000,
      }),
    hideToast: () =>
      set({
        type: 'info',
        message: '',
        duration: 2000,
      }),
  };
});
