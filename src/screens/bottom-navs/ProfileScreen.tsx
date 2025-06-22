import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NormalInput} from '~/components';
import {ReduxState, ReduxStoreDispatch} from '~/reduxSaga/reduxStore';

import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Icon} from 'react-native-paper';
import {colors} from '~/constants';
import {loadProfile} from '~/reduxSaga/profile/profileSlice';
const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<ReduxStoreDispatch>();
  const loadingProfile = useSelector(
    (state: ReduxState) => state.profileData.loadingProfile,
  );
  const dataProfile = useSelector(
    (state: ReduxState) => state.profileData.dataProfile,
  );

  const error = useSelector((state: ReduxState) => state.profileData.error);

  const utilities = [
    {
      id: '6',
      name: 'Wallet',
      icon: <Icon source="wallet" size={30} color={colors.primary} />,
      url: '',
    },
  ];

  const expiresDate = dataProfile?.latest_subscription?.expires_at
    ? new Date(dataProfile.latest_subscription.expires_at).toLocaleDateString()
    : 'No subscription details';

  useEffect(() => {
    dispatch(loadProfile());
  }, []);
  const renderUtilityItem = useCallback(
    ({item}) => (
      <TouchableOpacity style={styles.utilityItem} onPress={() => {}}>
        {item.icon}
        <Text style={styles.utilityText}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [navigation],
  );
  if (loadingProfile) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  if (error != '') {
  }

  return (
    <View style={styles.container}>
      <NormalInput
        label="Name"
        required={false}
        value={dataProfile?.user?.name}
        onChangeText={() => {}}
      />
      <NormalInput
        label="Email"
        required={false}
        value={dataProfile?.user?.email}
        onChangeText={() => {}}
      />
      <NormalInput
        label="Expired Date"
        required={false}
        value={expiresDate}
        onChangeText={() => {}}
      />
      <TouchableOpacity style={styles.buttonDelete} onPress={() => {}}>
        <Text style={styles.deleteAccount}>{'delete account'}</Text>
      </TouchableOpacity>
      <View style={styles.savedOptions}>
        <View>
          <TouchableOpacity style={styles.optionItem} onPress={() => {}}>
            <Icon source="bookmark" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Bookmark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Icon source="check" size={20} color={colors.primary} />
            <Text style={styles.optionText}>Following</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.optionItem}>
            <Icon source="download-box" size={24} color={colors.primary} />
            <Text style={styles.optionText}>News downloaded</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Icon source="clock" size={24} color={colors.primary} />
            <Text style={styles.optionText}>Recently Read</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={utilities || []}
        keyExtractor={item => item.id}
        renderItem={renderUtilityItem}
        contentContainerStyle={styles.utilitiesList}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No utilities available.</Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    gap: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    borderBottomColor: '#ddd',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e1f',
    marginLeft: 10,
  },
  userInfoSection: {
    marginTop: 20,
  },
  savedOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  optionText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
    // marginLeft: 10,
  },
  utilitiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 20,
    paddingBottom: 10,
  },
  utilitiesList: {},
  utilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  utilityText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#555',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  deleteAccount: {
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonDelete: {
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'orange',
    width: 150,
    padding: 5,
  },
});
export default ProfileScreen;
