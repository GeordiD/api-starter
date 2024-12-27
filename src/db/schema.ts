import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const exampleTable = sqliteTable('examples_table', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});
