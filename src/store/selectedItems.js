import { defineStore } from "pinia";

export const useSelectedItemsStore = defineStore("selectedItems", {
  state: () => {
    return { items: [], totalPrice: 0.0, totalItem: 0 };
  },

  actions: {
    addSelectItem(item) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      const existingItem = this.items.find(
        (existing) =>
          existing.value.itemId === item.itemId &&
          existing.value.itemName === item.itemName
      );

      if (existingItem) {
        existingItem.count++;
        existingItem.value.quantity--;
      } else {
        this.items.push({ value: updatedItem, count: 1 });
      }

      this.totalPrice =
        this.totalPrice + Math.round(item.pricePerUnit * 100) / 100;
      this.totalItem = this.totalItem + 1;
    },
    deleteSelectedItem(item) {
      const updatedItem = {
        value: { ...item.value, quantity: item.value.quantity + 1 },
        count: item.count - 1,
      };
      const index = this.items.findIndex(
        (existing) =>
          existing.value.itemId === item.value.itemId &&
          existing.value.itemName === item.value.itemName
      );

      if (index !== -1) {
        this.items[index] = updatedItem;

        if (this.items[index].count === 0) {
          this.items.splice(index, 1);
        }
      }

      this.totalPrice =
        this.totalPrice - Math.round(item.value.pricePerUnit * 100) / 100;
      this.totalItem = this.totalItem - 1;
    },
    clearSelectedItems() {
      this.items = [];
      this.totalPrice = 0.0;
      this.totalItem = 0;
    },
  },
});
