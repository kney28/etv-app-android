import { defineStore } from 'pinia';

export const conexionBD = defineStore('db', {
  state: () => ({
    DB: null as object | null,
    SQLITE: null as object | null
  }),

  /*getters: {
    getDB: (state) => state.db,
    getSqlite: (state) => state.sqlite
  }*/
})
