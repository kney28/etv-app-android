import { defineStore } from 'pinia';

export const useAuthStore = defineStore('home', {
  state: () => ({
    token: null,
    userName: null,
    passWord: null
  }),

  getters: {
    getToken: (state) => state.token
  }
})
