import { defineStore } from "pinia";
import { inventoryList } from "../constant";

export const useInventoryListStore = defineStore("inventoryList", {
  state: () => {
    return { value: inventoryList };
  },

  //   actions: {
  //     increment() {
  //       this.count++;
  //     },
  //   },
});
