import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-paper';
import CustomHeader from '~/components/headers/CustomHeader';
import {colors, ScreenName} from '~/constants';
import usePermissionLocation from '~/hooks/usePermissionLocation';
import usePermissionNotification from '~/hooks/usePermissionNotification';
import BookmarkScreen from '~/screens/bottom-navs/BookmarkScreen';
import ExploreScreen from '~/screens/bottom-navs/ExploreScreen';
import HomeScreen from '~/screens/bottom-navs/HomeScreen';
import ProfileScreen from '~/screens/bottom-navs/ProfileScreen';

const options = {
  headerShown: true,
  header: () => <CustomHeader />,
};
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  usePermissionLocation();
  usePermissionNotification();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
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

          return <Icon source={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        tabBarLabelStyle: {fontSize: 12},
      })}>
      <Tab.Screen
        name={ScreenName.BookmarkScreen}
        component={BookmarkScreen}
        options={options}
      />
      <Tab.Screen
        name={ScreenName.HomeScreen}
        component={HomeScreen}
        options={options}
      />
      <Tab.Screen
        name={ScreenName.ExploreScreen}
        component={ExploreScreen}
        options={options}
      />

      <Tab.Screen
        name={ScreenName.ProfileScreen}
        component={ProfileScreen}
        options={options}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
