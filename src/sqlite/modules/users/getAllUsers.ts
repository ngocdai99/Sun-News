import SQLite from 'react-native-sqlite-storage';
import {openDatabaseParams, tables, User} from '../../constants';
SQLite.enablePromise(true);

export const getAllUsers = async () => {
  const db = await SQLite.openDatabase(openDatabaseParams);
  const [result] = await db.executeSql(`Select * from ${tables.users}`);

  const users: User[] = [];
  for (let i = 0; i < result.rows.length; i++) {
    users.push(result.rows.item(i));
  }

  await db.close();
  return users;
};
