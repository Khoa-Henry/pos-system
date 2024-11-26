import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    role: "",
    isAuth: false,
  }),

  actions: {
    setUser(user) {
      this.role = user.role;
      this.isAuth = true;
    },

    clearUser() {
      this.role = "";
      this.isAuth = false;
    },
  },
});
