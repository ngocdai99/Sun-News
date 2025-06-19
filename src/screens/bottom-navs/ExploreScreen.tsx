import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Pressable, StyleSheet} from 'react-native';
import {TitleText} from '~/components';
import newsService from '~/services/newService';
import {ReduxState, reduxStore, ReduxStoreDispatch} from '~/redux/reduxStore';
import {useDispatch, useSelector} from 'react-redux';
import {getCategories, getTags} from '~/redux/reducer/dataReducer/fetchData';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '~/constants';

const ExploreScreen: React.FC = () => {
  const dispatch = useDispatch<ReduxStoreDispatch>();
  const dataCategories = useSelector(
    (state: ReduxState) => state.data.dataCategories,
  );
  const loadingCategories = useSelector(
    (state: ReduxState) => state.data.loadingCategories,
  );

  const loadingTags = useSelector(
    (state: ReduxState) => state.data.loadingTags,
  );
  const dataTags = useSelector((state: ReduxState) => state.data.dataTags);

  const error = useSelector((state: ReduxState) => state.data.error);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getCategories());
  }, []);

  console.log('dataTags', JSON.stringify(dataTags, null, 3));

  if (loadingCategories && loadingTags) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataTags || []}
        keyExtractor={(item: any) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContainer}
        renderItem={({item}) => (
          <Pressable style={styles.tag} onPress={() => {}}>
            <Text style={styles.tagText}>{item?.name}</Text>
          </Pressable>
        )}
      />

      <FlatList
        data={dataCategories || []}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={({item, index}) => {
          const rowIndex = Math.floor(index / 2);
          const isEvenRow = rowIndex % 2 === 0;
          const isEvenColumn = index % 2 === 0;

          const backgroundColor =
            (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn)
              ? '#2E7D32'
              : '#1b5e1f';

          return (
            <Pressable
              style={[styles.categoryBox, {backgroundColor}]}
              onPress={() => {}}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    flex: 1,
  },
  header: {
    backgroundColor: '#003366',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 16,
  },
  tagsContainer: {
    // paddingHorizontal: 5,
  },
  tag: {
    backgroundColor: '#f5f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    fontWeight: 'bold',
    height: 32,
  },
  tagText: {
    fontSize: 12,
    color: '#000',
    textTransform: 'lowercase',
  },
  categoriesContainer: {
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  categoryBox: {
    backgroundColor: '#003366',
    flex: 1,
    height: 100,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
