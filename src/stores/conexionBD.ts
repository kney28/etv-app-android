import { defineStore } from 'pinia';
import { CapacitorSQLite, SQLiteConnection, ISQLiteDBConnection } from '@capacitor-community/sqlite'

export const conexionBD = defineStore('db', {
  state: () => ({
    DB: {} as ISQLiteDBConnection,
    SQLITE: {} as SQLiteConnection
  }),

  /*getters: {
    getDB: (state) => state.db,
    getSqlite: (state) => state.sqlite
  }*/
})
