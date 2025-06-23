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
 
    await db.executeSql(
      `Create table if not exists ${tables.tags} (
          id integer primary key,
          name text,
          created_at text,
          updated_at text
      )`,
    );
    await db.close();
  } catch (error) {
    console.log('sqlite error', error);
  }
};
