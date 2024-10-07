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
      const selectedCategory = this.value.findIndex(
        (c) => c.categoryName === category
      );
      const selectedItem = this.value[selectedCategory].items.findIndex(
        (i) => i.itemName === newItem.itemName && i.itemId === newItem.itemId
      );

      if (selectedItem === 0) {
        this.value[selectedCategory].items[selectedItem] = {
          ...newItem,
          quantity: Number(newItem.quantity),
          pricePerUnit: Number(newItem.pricePerUnit),
        };
      } else {
        this.value[selectedCategory].items.push({
          ...newItem,
          quantity: Number(newItem.quantity),
          pricePerUnit: Number(newItem.pricePerUnit),
        });
      }
    },
    addCategory(category) {},
    editCategory(category) {},
    deleteCategory(category) {},
  },
});
