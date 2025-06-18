import React from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  StatusBar,
  Pressable,
} from 'react-native';
import {Icon} from 'react-native-paper';
import {colors, GLOBAL_KEYS} from '~/constants';
import {TitleText} from '../texts/TitleText';
import {widthScreen} from '~/utils/scale';
import {useNavigation, useRoute} from '@react-navigation/native';

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
      {showBackButton && navigation.canGoBack() && (
        <Pressable onPress={() => {}}>
          <Icon source="arrow-left" size={24} color={colors.white} />
        </Pressable>
      )}

      <TitleText text={routeName} style={styles.title} />

      <Pressable onPress={rightAction}>
        <Icon source={rightIcon} size={24} color={colors.white} />
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    width: widthScreen,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
