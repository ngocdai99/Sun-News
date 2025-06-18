import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '~/screens/bottom-navs/HomeScreen';
import LoginScreen from '~/screens/auth/LoginScreen';
import MessageHost from '~/components/toasts/MessageHost';
import ToastHost from '~/components/toasts/ToastHost';
import {ScreenName} from '~/constants';
import SplashScreen from '~/screens/auth/SplashScreen';
import SignUpScreen from '~/screens/auth/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreenName.SignUpScreen}
        screenOptions={{headerShown: true}}>
        <Stack.Screen name={ScreenName.SignUpScreen} component={SignUpScreen} />
        <Stack.Screen name={ScreenName.SplashScreen} component={SplashScreen} />
        <Stack.Screen name={ScreenName.LoginScreen} component={LoginScreen} />
        <Stack.Screen name={ScreenName.HomeScreen} component={HomeScreen} />
      </Stack.Navigator>
      <ToastHost />
      <MessageHost />
    </NavigationContainer>
  );
}
