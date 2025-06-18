import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageBackground} from 'react-native';
import {LightStatusBar} from '~/components';
import {ScreenName} from '~/constants';
const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  React.useEffect(() => {
    const navigate = () => {
      navigation.navigate(ScreenName.LoginScreen);
    };
    const timeout = setTimeout(navigate, 3000);
    return () => clearTimeout(timeout);
  });
  return (
    <ImageBackground
      source={require('~/assets/images/splashscreen.png')}
      accessible
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LightStatusBar />
    </ImageBackground>
  );
};

export default SplashScreen;
