import React from 'react';
import {View, Text} from 'react-native';
import {TitleText} from '~/components';

const BookmarkScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <TitleText text="Bookmark Screen" />
    </View>
  );
};

export default BookmarkScreen;
