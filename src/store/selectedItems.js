import { defineStore } from "pinia";

export const useSelectedItemsStore = defineStore("selectedItems", {
  state: () => {
    return { items: [], totalPrice: 0.0 };
  },

  actions: {
    addSelectItem(item) {
      const existingItem = this.items.find(
        (existing) =>
          existing.value.itemId === item.itemId &&
          existing.value.itemName === item.itemName
      );

      if (existingItem) {
        existingItem.count++;
      } else {
        this.items.push({ value: item, count: 1 });
      }

      // Update the total price
      this.totalPrice += item.pricePerUnit;
    },
    deleteSelectedItem(item) {},
    clearSelectedItems() {
      this.items = [];
      this.totalPrice = 0;
    },
  },
});
