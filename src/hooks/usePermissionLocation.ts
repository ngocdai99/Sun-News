import {PermissionsAndroid} from 'react-native';
import {useEffect} from 'react';

const locationPermissionRationale = {
  title: 'Cần quyền truy cập vị trí',
  message: 'Ứng dụng cần truy cập vị trí của bạn để hoạt động chính xác.',
  buttonPositive: 'OK',
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      locationPermissionRationale,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Bạn đã cấp quyền truy cập vị trí');
    } else {
      console.log('Quyền truy cập vị trí bị từ chối');
    }
  } catch (error) {
    console.error('Lỗi khi yêu cầu quyền truy cập vị trí:', error);
  }
};

const usePermissionLocation = () => {
  useEffect(() => {
    requestLocationPermission().then();
  }, []);
};

export default usePermissionLocation
