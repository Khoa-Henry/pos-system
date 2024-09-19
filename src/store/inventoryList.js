import { defineStore } from "pinia";
import { inventoryList } from "../constant";

export const useInventoryListStore = defineStore("inventoryList", {
  state: () => {
    return { value: inventoryList };
  },

  actions: {
    editItem(updatedItem) {
      // Find the category containing the item
      const category = this.value.find((category) =>
        category.items.some((item) => item.itemId === updatedItem.itemId)
      );

      if (category) {
        // Find the index of the item within the category
        const itemIndex = category.items.findIndex(
          (item) => item.itemId === updatedItem.itemId
        );

        if (itemIndex !== -1) {
          // Update the entire item at the found index
          category.items[itemIndex] = updatedItem;
        }
      }
    },
    deleteItem(item) {},
    addItem(item) {},
    addCategory(category) {},
    editCategory(category) {},
    deleteCategory(category) {},
  },
});
