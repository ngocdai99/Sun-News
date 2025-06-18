import { colors } from "~/constants";

type FCMMessage = {
    android: any,
    body: string,
    title: string
}

export type ToastType = 'info' | 'success' | 'danger' | 'warning' | 'offline';

export const toastColors: Record<ToastType, string> = {
  info: colors.info,
  success: colors.success,
  danger: colors.danger,
  warning: colors.warning,
  offline: colors.violet,
};