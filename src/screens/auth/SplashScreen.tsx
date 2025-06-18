import React from 'react';
import {ImageBackground} from 'react-native';
import {LightStatusBar} from '~/components';
const SplashScreen: React.FC = () => {
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
