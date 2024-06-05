import { defineStore } from 'pinia';

export enum Inners {
  Facebook = 'facebook',
  Puff = 'puff'
}

interface InnerState {
  visible: boolean;
  type: Inners;
  label: string | null;
}

export const versionOS = defineStore('version', {
  state: () => ({
    version: null,
    id: null
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

export const useInners = defineStore('inners', {
  state: (): InnerState => ({
    visible: false,
    type: Inners.Puff,
    label: null
  })
});
