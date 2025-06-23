import SQLite from 'react-native-sqlite-storage';
import {Tag} from '~/types/Type';
import {openDatabaseParams} from '../../constants';
SQLite.enablePromise(true);

export const saveTags = async (tags: Tag[]) => {
  const db = await SQLite.openDatabase(openDatabaseParams);
  await db.executeSql(`DELETE FROM tags`);
  await db.transaction( tx => {
    for (const tag of tags) {
       tx.executeSql(
        `insert or replace into tags (id, name, created_at, updated_at) values (?, ?, ?, ?)`,
        [tag.id, tag.name, tag.created_at, tag.updated_at],
      );
    }
  });
  await db.close();
};

export const readTags = async (): Promise<Tag[]> => {
  const db = await SQLite.openDatabase(openDatabaseParams);
  const [result] = await db.executeSql(`select * from tags order by id`);

  const tags: Tag[] = [];
  for (let i = 0; i < result.rows.length; i++) {
    tags.push(result.rows.item(i));
  }
  await db.close();
  return tags;
};
