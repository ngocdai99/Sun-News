import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {TitleText} from '~/components';
import {ReduxState, ReduxStoreDispatch} from '~/reduxSaga/reduxStore';

const BookmarkScreen: React.FC = () => {
  const dataTags = useSelector(
    (state: ReduxState) => state.exploreData.dataTags,
  );

  console.log('datatag', JSON.stringify(dataTags, null, 2));
  return (
    <View style={{flex: 1}}>
      <TitleText text="Bookmark Screen" />
    </View>
  );
};

export default BookmarkScreen;
