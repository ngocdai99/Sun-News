import React from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  StatusBar,
  Pressable,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';
import {colors, GLOBAL_KEYS} from '~/constants';
import {TitleText} from '../texts/TitleText';
import {widthScreen} from '~/utils/scale';
import {useNavigation, useRoute} from '@react-navigation/native';
import {LightStatusBar} from '../status-bars/LightStatusBar';

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightAction?: () => void;
  rightIcon?: string;
}
const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = 'Home',
  showBackButton = true,
  rightAction,
  rightIcon = 'arrow-right',
}) => {
  const navigation = useNavigation();

  const routeName = useRoute().name;

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <ImageBackground
      source={require('~/assets/images/header-background.png')}
      style={[
        styles.headerBackground,
        {
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      ]}>
      <LightStatusBar />
      {showBackButton && navigation.canGoBack() ? (
        <Pressable onPress={handleGoBack}>
          <Icon source="arrow-left" size={24} color={colors.white} />
        </Pressable>
      ) : (
        <View style={{width: 24, height: 24}} />
      )}

      <TitleText text={routeName} style={styles.title} />

      {rightAction && rightIcon ? (
        <Pressable onPress={rightAction}>
          <Icon source={rightIcon} size={24} color={colors.white} />
        </Pressable>
      ) : (
        <View style={{width: 24, height: 24}} />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    width: widthScreen,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },

  title: {
    flex: 1,
    color: colors.white,
    fontSize: GLOBAL_KEYS.TEXT_SIZE_HEADER,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default CustomHeader;
