import SQLite from 'react-native-sqlite-storage';
import {openDatabaseParams, tables, User} from '../constants';
SQLite.enablePromise(true);

export const initDB = async () => {
  try {
    const db = await SQLite.openDatabase(openDatabaseParams);
    // await db.executeSql(`DROP TABLE IF EXISTS users`);
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tables.users} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)`,
    );
  } catch (error) {
    console.log('sqlite error', error);
  }
};


