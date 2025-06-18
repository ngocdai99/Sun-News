import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-paper';
import {PermissionsAndroid} from 'react-native';
import {useEffect} from 'react';
import HomeScreen from '~/screens/bottom-navs/HomeScreen';
import ExploreScreen from '~/screens/bottom-navs/ExploreScreen';
import BookmarkScreen from '~/screens/bottom-navs/BookmarkScreen';
import {ScreenName} from '~/constants';
import ProfileScreen from '~/screens/bottom-navs/ProfileScreen';
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

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  useEffect(() => {
    requestLocationPermission().then();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 6,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === ScreenName.HomeScreen) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === ScreenName.ExploreScreen) {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === ScreenName.BookmarkScreen) {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === ScreenName.ProfileScreen) {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }

          // @ts-ignore
          return <Icon source={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4D90FE',
        tabBarInactiveTintColor: '#8e8e8e',
        tabBarLabelStyle: {fontSize: 12},
      })}>
      <Tab.Screen name={ScreenName.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={ScreenName.ExploreScreen} component={ExploreScreen} />
      <Tab.Screen name={ScreenName.BookmarkScreen} component={BookmarkScreen} />
      <Tab.Screen name={ScreenName.ProfileScreen} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
