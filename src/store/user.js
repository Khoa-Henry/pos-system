import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    value: {},
  }),

  actions: {
    setUser(user) {
      this.value = user;
    },
  },
});
