import SQLite from 'react-native-sqlite-storage';
import {Toaster} from '~/utils/toaster';
import {openDatabaseParams, tables} from '../constants';
SQLite.enablePromise(true);

export const deleteUser = async (id: number) => {
  const db = await SQLite.openDatabase(openDatabaseParams);
  const [result] = await db.executeSql(
    `delete from ${tables.users} where id = ?`,
    [id],
  );

  console.log(`Deleted user ID: ${id}, rows affected: ${result.rowsAffected}`);

  Toaster.toast.show({
    type: 'success',
    message: 'Deleted successfully',
  });

  await db.close();
  return result.rowsAffected > 0;
};
