import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import HomeScreen from '~/screens/bottom-navs/HomeScreen';
import LoginScreen from '~/screens/auth/LoginScreen';
import MessageHost from '~/components/toasts/MessageHost';
import ToastHost from '~/components/toasts/ToastHost';
import {ScreenName} from '~/constants';
import SplashScreen from '~/screens/auth/SplashScreen';
import SignUpScreen from '~/screens/auth/SignUpScreen';
import {PaperProvider} from 'react-native-paper';
import CustomHeader from '~/components/headers/CustomHeader';
import BottomTab from '~/navigation/BottomTab';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider as ReduxProvider} from 'react-redux';
import { reduxStore } from '~/reduxSaga/reduxStore';


const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const options = {
  headerShown: true,
  header: () => <CustomHeader />,
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <ReduxProvider store={reduxStore}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={ScreenName.BottomTab}
              screenOptions={{headerShown: true}}>
              <Stack.Screen
                name={ScreenName.SignUpScreen}
                component={SignUpScreen}
                options={options}
              />
              <Stack.Screen
                name={ScreenName.SplashScreen}
                component={SplashScreen}
                options={options}
              />
              <Stack.Screen
                name={ScreenName.LoginScreen}
                component={LoginScreen}
                options={options}
              />
              <Stack.Screen
                name={ScreenName.BottomTab}
                component={BottomTab}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
            <ToastHost />
            <MessageHost />
          </NavigationContainer>
        </ReduxProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
