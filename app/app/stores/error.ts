import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
  state: () => ({
    isOpen: false,
    message: '',
  }),
  actions: {
    open(message: string) {
      this.message = message;
      this.isOpen = true;
    },
    close() {
      this.message = '';
      this.isOpen = false;
    },
  },
});
