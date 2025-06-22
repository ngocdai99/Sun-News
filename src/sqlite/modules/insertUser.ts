import SQLite from 'react-native-sqlite-storage';
import {Toaster} from '~/utils/toaster';
import {openDatabaseParams, tables} from '../constants';
SQLite.enablePromise(true);

export const insertUser = async (name: string, age: string) => {
  if (!name.trim() || !age.trim()) {
    Toaster.toast.show({
      type: 'warning',
      message: 'Name and age are required',
    });
    return;
  }

  
  const db = await SQLite.openDatabase(openDatabaseParams);

  // Check name exists
  const [checkResult] = await db.executeSql(
    `select id from ${tables.users} where name = ? limit 1`,
    [name],
  );
  if (checkResult.rows.length > 0) {
    Toaster.message.show({
      title: 'Warning',
      type: 'warning',
      message: 'This name has already been existed',
    });
    db.close();
    return;
  }

  await db.executeSql(`INSERT INTO ${tables.users} (name, age) VALUES (?, ?)`, [
    name,
    age,
  ]);
  console.log(`Inserted user: ${name}, age: ${age}`);
  Toaster.toast.show({
    type: 'success',
    message: 'Insert successfully',
  });
  await db.close();
};
