import { defineStore } from "pinia";
import { inventoryList } from "../constant";

export const useInventoryListStore = defineStore("inventoryList", {
  state: () => {
    return { value: inventoryList };
  },

  actions: {
    updateItem(updatedItem) {
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

          category.items[itemIndex] = {
            ...updatedItem,
            quantity: Number(updatedItem.quantity),
            pricePerUnit: Number(updatedItem.pricePerUnit),
          };
        }
      }
    },
    deleteItem(item, category) {
      const selectedCategory = this.value.findIndex(
        (c) => c.categoryName === category
      );
      const selectedItem = this.value[selectedCategory].items.findIndex(
        (i) => i.itemName === item.itemName && i.itemId === item.itemId
      );

      this.value[selectedCategory].items.splice(selectedItem, 1);
    },
    addItem(newItem, category) {
      // TODO: add some validation for existing item

      const categoryIndex = this.value.findIndex(
        (c) => c.categoryName === category
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

      const existingItemIndex = this.value[categoryIndex].items.findIndex(
        (i) => i.itemId === newItem.itemId
      );

      const finalItem = {
        ...newItem,
        quantity: Number(newItem.quantity),
        pricePerUnit: Number(newItem.pricePerUnit).toFixed(2),
      };

      if (existingItemIndex !== -1) {
        // Update the existing item with the new item's details
        this.value[categoryIndex].items[existingItemIndex] = finalItem;
      } else {
        // Add the new item to the category
        this.value[categoryIndex].items.push(finalItem);
      }
    },
    addCategory(category) {},
    editCategory(category) {},
    deleteCategory(category) {},
  },
});
