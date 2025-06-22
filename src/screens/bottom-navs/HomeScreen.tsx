import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Platform,
  FlatList,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {heightScreen, initTop, widthScreen} from '../../utils/scale.ts';
import {Toaster} from '~/utils/toaster.ts';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState, ReduxStoreDispatch} from '~/reduxSaga/reduxStore.ts';

import {colors} from '~/constants/color.ts';
import {StatusBar} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import CarouselCustom from '~/components/carousel/CarouselCustom.tsx';
import {baseURL} from '~/services/api.ts';
import {loadHomeData} from '~/reduxSaga/home/homeSlice.ts';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<ReduxStoreDispatch>();
  const loadingPosts = useSelector(
    (state: ReduxState) => state.homeData.loadingPosts,
  );
  const dataPosts = useSelector(
    (state: ReduxState) => state.homeData.dataPosts,
  );

  const error = useSelector((state: ReduxState) => state.homeData.error);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadHomeData());
    }, [dispatch]),
  );

  const newPost = Array.isArray(dataPosts)
    ? dataPosts.filter((post: any) => post.type === 'free').slice(0, 5)
    : [];

  const newPremium = Array.isArray(dataPosts)
    ? dataPosts.filter((post: any) => post.type === 'paid').slice(0, 5)
    : [];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => {}}>
        <Image
          source={{
            uri: `${baseURL}/storage/${item.image}`,
          }}
          style={[styles.newImage, styles.imageStyle]}
        />
        <View style={styles.newsInfo}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.new_dot}>•</Text>
            <Text style={styles.new_category}>Media News</Text>
          </View>
          <Text style={styles.newTitle} numberOfLines={3} ellipsizeMode="tail">
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* <Text style={styles.newMeta}>{item.category}</Text> */}
            <Text style={styles.newMeta}>● {item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loadingPosts) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      {Array.isArray(dataPosts) && <CarouselCustom posts={dataPosts} />}

      <View style={styles.footer}>
        <Text style={styles.sectionTitle}>All Today's News</Text>
        <FlatList
          data={Array.isArray(newPost) ? newPost : []}
          keyExtractor={item => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No articles available.</Text>
            </View>
          )}
        />
        <Text style={styles.sectionTitle}>Premium News</Text>
        <FlatList
          data={Array.isArray(newPremium) ? newPremium : []}
          keyExtractor={item => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                You need to buy a package to see this news.
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: heightScreen,
    backgroundColor: '#fafafa',
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  flatList: {
    paddingVertical: 16,
  },

  carousel: {
    width: widthScreen * 0.95,
    height: heightScreen * 0.5,
    marginLeft: widthScreen * 0.02,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.3,
    borderRadius: 10,
  },
  carouselItem: {
    width: '100%',
    borderRadius: 10,
  },
  imageStyle: {
    borderRadius: 10,
    backgroundColor: colors.gray200,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 50,
  },
  newImage: {
    width: '60%',
    height: 150,
    justifyContent: 'flex-end',
  },
  newsInfo: {
    backgroundColor: '#fff',
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  newCategory: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  dot: {
    color: colors.green700,
    fontSize: 18,
  },
  newTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: widthScreen * 0.3,
  },
  newMeta: {
    fontSize: 12,
    color: '#D3D3D3',
  },
  new_dot: {
    width: 10,
    height: 10,
    backgroundColor: colors.green700,
    borderRadius: 5,
    marginRight: 8,
  },
  new_category: {
    fontSize: 14,
    width: 40,
    fontWeight: 'bold',
    color: '#BABABA',
  },
  card: {
    borderRadius: 10,
    flexDirection: 'row',
    maxWidth: widthScreen / 1.4,
    marginRight: 20,
    paddingVertical: 16,
    paddingRight: 20,
  },
  new_metadataText: {
    color: '#BABABA',
    fontSize: 12,
    marginHorizontal: 5,
  },
  footer: {
    flex: 3,
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
  header: {
    flex: 1,
  },
});

export default HomeScreen;
