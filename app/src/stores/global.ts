import { defineStore } from 'pinia';

export const versionOS = defineStore('version', {
  state: () => ({
    version: null,
  }),
  getters: {
    getVersion: (state) => state.version
  },
  actions: {
    increment() {
      // this.counter++;
    },
  },
});
