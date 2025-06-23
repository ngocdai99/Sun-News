export type User = {
  id: number;
  name: string;
  age: number;
};
export const dbName = 'mydb.db';
export const openDatabaseParams = {
  name: dbName,
  location: 'default',
};

export const tables = {
  users: 'users',
  tags: 'tags'
};