import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NormalInput} from '~/components';
import {ReduxState, ReduxStoreDispatch} from '~/reduxSaga/reduxStore';

import {colors} from '~/constants';
import {loadExploreData, searchTags} from '~/reduxSaga/explore/exploreSlice';

const ExploreScreen: React.FC = () => {
  const dispatch = useDispatch<ReduxStoreDispatch>();
  const dataCategories = useSelector(
    (state: ReduxState) => state.exploreData.dataCates,
  );
  const loadingCates = useSelector(
    (state: ReduxState) => state.exploreData.loadingCates,
  );

  const loadingTags = useSelector(
    (state: ReduxState) => state.exploreData.loadingTags,
  );
  const dataTags = useSelector(
    (state: ReduxState) => state.exploreData.dataTags,
  );

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (keyword.trim() !== '') {
      dispatch(searchTags({keyword}));
    }
  }, [keyword]);

  useEffect(() => {
    dispatch(loadExploreData());
  }, []);

  const safeDataTags = Array.isArray(dataTags) ? dataTags : [];
  const safeDataCategories = Array.isArray(dataCategories)
    ? dataCategories
    : [];
  return (
    <View style={styles.container}>
      <NormalInput
        required={false}
        onChangeText={setKeyword}
        value={keyword}
        placeholder="Search"
      />

      <FlatList
        data={safeDataTags}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContainer}
        renderItem={({item}) =>
          item ? (
            <Pressable style={styles.tag} onPress={() => {}}>
              <Text style={styles.tagText}>{item.name}</Text>
            </Pressable>
          ) : null
        }
        ListEmptyComponent={
          !loadingTags ? (
            <Text style={{padding: 10, color: '#999'}}>Không có thẻ nào.</Text>
          ) : null
        }
      />

      <FlatList
        data={safeDataCategories}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={({item, index}) =>
          item ? (
            <Pressable
              style={[
                styles.categoryBox,
                {
                  backgroundColor:
                    (Math.floor(index / 2) % 2 === 0) === (index % 2 === 0)
                      ? '#2E7D32'
                      : '#1b5e1f',
                },
              ]}
              onPress={() => {}}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </Pressable>
          ) : null
        }
        ListEmptyComponent={
          !loadingCates ? (
            <Text style={{padding: 10, color: '#999'}}>
              Không có danh mục nào.
            </Text>
          ) : null
        }
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
    gap: 16,
    flexDirection: 'column',
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
