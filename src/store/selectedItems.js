import { defineStore } from "pinia";

export const useSelectedItemsStore = defineStore("selectedItems", {
  state: () => {
    return { items: [], totalPrice: 0.0 };
  },

  //   actions: {
  //     increment() {
  //       this.count++;
  //     },
  //   },
});
