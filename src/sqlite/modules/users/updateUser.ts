import SQLite from 'react-native-sqlite-storage';
import {Toaster} from '~/utils/toaster';
import {openDatabaseParams, tables, User} from '../../constants';
SQLite.enablePromise(true);

export const updateUser = async (age: number, id: number) => {
  const db = await SQLite.openDatabase(openDatabaseParams);
  const [result] = await db.executeSql(
    `Update ${tables.users} set age = ? where id = ?`,
    [age, id],
  );
  Toaster.toast.show({
    type: 'success',
    message: 'Updated successfully',
  });
  console.log('rowsAffected', result.rowsAffected);

  await db.close();
  return result.rowsAffected > 0;
};
