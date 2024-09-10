import { defineStore } from "pinia";
import { inventorySystem } from "../constant";

export const useInventoryListStore = defineStore("inventoryList", {
  state: () => {
    return { inventorySystem };
  },

  //   actions: {
  //     increment() {
  //       this.count++;
  //     },
  //   },
});
