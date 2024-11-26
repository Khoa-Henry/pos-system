import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { auth, db } from "../firebase";

export const useUserStore = defineStore("user", {
  state: () => ({
    role: "",
    isAuth: false,
    isLoading: true,
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

    initializeAuth() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // find the user in the database and set it to the user store
          const userDocRef = doc(collection(db, "Users"), auth.currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          this.setUser(userDocSnap.data());
        } else {
          // clear the user store
          this.clearUser();
        }
        console.log(this.isAuth, "in store", user);

        this.isLoading = false;
      });
    },
  },
});
