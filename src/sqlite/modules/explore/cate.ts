import SQLite from 'react-native-sqlite-storage';
import {Cate} from '~/types/Type';
import {openDatabaseParams, tables} from '../../constants';
SQLite.enablePromise(true);

export const saveCates = async (cates: Cate[]): Promise<void> => {
  const db = await SQLite.openDatabase(openDatabaseParams);

  await db.executeSql('delete from cates');
  await db.transaction((tx: SQLite.Transaction) => {
    for (const cate of cates) {
      tx.executeSql(
        `insert or replace into ${tables.cates} (id, name, created_at, updated_at) values (?, ?, ?, ?)`,
        [cate.id, cate.name, cate.created_at, cate.updated_at],
      );
    }
  });
  await db.close();
};

export const readCates = async (): Promise<Cate[]> => {
  const db = await SQLite.openDatabase(openDatabaseParams);
  const [result] = await db.executeSql(
    `Select * from ${tables.cates} order by id`,
  );

  const cates: Cate[] = [];
  for (let i = 0; i < result.rows.length; i++) {
    cates.push(result.rows.item(i));
  }
  await db.close();
  return cates;
};
