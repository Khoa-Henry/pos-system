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

      this.totalPrice =
        this.totalPrice + Math.round(item.pricePerUnit * 100) / 100;
    },
    deleteSelectedItem(item) {
      const index = this.items.findIndex(
        (existing) =>
          existing.value.itemId === item.value.itemId &&
          existing.value.itemName === item.value.itemName
      );

      if (index !== -1) {
        item.count--;

        if (item.count === 0) {
          this.items.splice(index, 1);
        }
      }

      this.totalPrice =
        this.totalPrice - Math.round(item.value.pricePerUnit * 100) / 100;
    },
    clearSelectedItems() {
      this.items = [];
      this.totalPrice = 0;
    },
  },
});
