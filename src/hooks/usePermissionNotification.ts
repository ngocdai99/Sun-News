import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {Platform} from 'react-native';

const notificationPermissionRationale = {
  title: 'Cần quyền gửi thông báo',
  message: 'Ứng dụng cần cấp quyền thông báo để làm gì đó',
  buttonPositive: 'OK',
};

const requestPermissionNotification = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      notificationPermissionRationale,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Bạn đã cấp quyền gửi thông báo');
    } else {
      console.log('Quyền gửi thông báo bị từ chối');
    }
  } catch (error) {
    console.error('Lỗi khi yêu cầu quyền gửi thông báo:', error);
  }
};
const usePermissionNotification = () => {
  useEffect(() => {
    requestPermissionNotification();
  }, []);
};

export default usePermissionNotification;
