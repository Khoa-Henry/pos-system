import { defineStore } from "pinia";
import { inventoryList } from "../constant";

export const useInventoryListStore = defineStore("inventoryList", {
  state: () => {
    return { value: inventoryList };
  },

  actions: {
    editItem(item) {
      this.count++;
    },
    deleteItem(item) {},
    addItem(item) {},
    addCategory(category) {},
    editCategory(category) {},
    deleteCategory(category) {},
  },
});
