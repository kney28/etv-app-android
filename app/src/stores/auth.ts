import { defineStore } from 'pinia';

export const useAuthStore = defineStore('home', {
  state: () => ({
    token: null
  }),

  getters: {
    getToken: (state) => state.token
  }
})
