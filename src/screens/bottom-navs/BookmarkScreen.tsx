import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-paper';
import {
  NormalInput,
  NormalText,
  PrimaryButton,
  Row,
  TitleText,
} from '~/components';
import {colors} from '~/constants';
import {getAllUsers, initDB, insertUser} from '~/sqlite';
import {User} from '~/sqlite/constants';
import {deleteUser} from '~/sqlite/modules/deleteUser';
import {updateUser} from '~/sqlite/modules/updateUser';
import {Toaster} from '~/utils/toaster';

const BookmarkScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  useEffect(() => {
    initDB();
    getUsers();
  }, []);

  const addUser = async () => {
    try {
      insertUser(name, age);
    } catch (error) {
      Toaster.toast.show({
        type: 'danger',
        message: 'Insert failed',
      });
    }
  };

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      Toaster.toast.show({
        type: 'danger',
        message: 'Get all user failed',
      });
    }
  };

  const onItemPress = (user: User) => {
    setSelectedUser(user);
    setAge(user.age.toString());
    setName(user.name);
  };

  const onUpdate = async () => {
    try {
      if (selectedUser != null) {
        const success = await updateUser(parseInt(age, 10), selectedUser.id);
        if (success) {
          await getUsers();
          setSelectedUser(null);
          setName('');
          setAge('');
        } else {
          Toaster.toast.show({
            type: 'danger',
            message: 'Update failed',
          });
        }
      }
    } catch (error) {
      Toaster.toast.show({
        type: 'danger',
        message: 'Error Update failed',
      });
    }
  };

  const onDelete = async (user: User) => {
    try {
      if (user != null) {
        const success = await deleteUser(user.id);
        if (success) {
          await getUsers();
        } else {
          Toaster.toast.show({
            type: 'danger',
            message: 'Delete failed',
          });
        }
      }
    } catch (error) {
      Toaster.toast.show({
        type: 'danger',
        message: 'Error Delete failed',
      });
    }
  };

  return (
    <View style={styles.container}>
      <TitleText text="SQLite Example" />
      <NormalInput label="Name" value={name} onChangeText={setName} required />
      <NormalInput label="Age" value={age} onChangeText={setAge} required />
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Row
            key={item.id.toString()}
            style={{justifyContent: 'space-between', marginBottom: 8}}>
            <NormalText text={`${item.name}`} style={{flex: 1}} />
            <NormalText text={`${item.age}`} />
            <Pressable onPress={() => onItemPress(item)}>
              <Icon source={'pencil'} size={24} color={colors.primary} />
            </Pressable>

            <Pressable onPress={() => onDelete(item)}>
              <Icon
                source={'delete-outline'}
                size={24}
                color={colors.orange700}
              />
            </Pressable>
          </Row>
        )}
      />
      <PrimaryButton title="Add to database" onPress={addUser} />
      <PrimaryButton
        style={{
          backgroundColor:
            selectedUser != null ? colors.gray850 : colors.disabledBg,
        }}
        titleStyle={{
          color: selectedUser != null ? colors.white : colors.disabledText,
        }}
        disabled={selectedUser == null}
        title="Update"
        onPress={onUpdate}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    flex: 1,
    gap: 16,
    flexDirection: 'column',
  },
});
export default BookmarkScreen;
