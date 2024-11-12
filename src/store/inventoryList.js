import { defineStore } from "pinia";
import { inventoryList } from "../constant";

export const useInventoryListStore = defineStore("inventoryList", {
  state: () => {
    return { value: inventoryList };
  },

  actions: {
    storeUpdateItem(updatedItem) {
      const category = this.value.find(
        (cat) => cat.findItemIndexById(updatedItem.itemId) !== -1
      );
      if (category) {
        category.updateItem(updatedItem);
      }
    },

    storeDeleteItem(itemId, categoryName) {
      const category = this.value.find(
        (cat) => cat.categoryName === categoryName
      );
      if (category) {
        category.deleteItem(itemId);
      }
    },

    storeAddItem(newItem, categoryName) {
      const categoryIndex = this.value.findIndex(
        (cat) => cat.categoryName === categoryName
      );

      // Check if the item exists in a different category
      for (let i = 0; i < this.value.length; i++) {
        if (i !== categoryIndex) {
          // Skip the current category
          const existingItemIndex = this.value[i].items.findIndex(
            (item) => item.itemId === newItem.itemId
          );

          if (existingItemIndex !== -1) {
            // If it exists in a different category, remove it from there
            this.value[i].items.splice(existingItemIndex, 1);
            break;
          }
        }
      }

      this.value[categoryIndex].addItem(newItem);
    },

    storeAddCategory(categoryName) {
      const newCategory = new Category(categoryName, generateUniqueId());
      this.value.push(newCategory);
    },

    storeDeleteCategory(categoryName) {
      const index = this.value.findIndex(
        (cat) => cat.categoryName === categoryName
      );
      if (index !== -1) {
        this.value.splice(index, 1);
      }
    },
  },
});
