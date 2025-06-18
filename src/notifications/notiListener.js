import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { Alert } from 'react-native';

useEffect(() => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    // Hiển thị local notification
   Alert.alert(remoteMessage)
  });

  return unsubscribe;
}, []);
