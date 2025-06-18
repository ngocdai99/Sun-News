import React from 'react';
import {View, Text} from 'react-native';
import {TitleText} from '~/components';

const ProfileScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <TitleText text="Profile Screen" />
    </View>
  );
};

export default ProfileScreen
