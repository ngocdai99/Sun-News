import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Pressable, StyleSheet} from 'react-native';
import {NormalInput, TitleText} from '~/components';
import newsService from '~/services/newsService';
import {ReduxState, reduxStore, ReduxStoreDispatch} from '~/redux/reduxStore';
import {useDispatch, useSelector} from 'react-redux';
import {getCategories, getTags} from '~/redux/reducer/dataReducer/fetchData';
import {ActivityIndicator, Icon} from 'react-native-paper';
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

  const [keyword, setKeyword] = useState('');

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
      <NormalInput
        required={false}
        onChangeText={setKeyword}
        value={keyword}
        placeholder="Search"
      />

      <FlatList
        data={Array.isArray(dataTags) ? dataTags : []}
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
        data={Array.isArray(dataCategories) ? dataCategories : []}
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
          !loadingCategories ? (
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
