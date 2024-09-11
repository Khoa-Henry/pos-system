import { defineStore } from "pinia";

export const useSelectedItemsStore = defineStore("selectedItems", {
  state: () => {
    return { items: [], totalPrice: 0.0 };
  },

  actions: {
    addSelectItem(item) {
      if (
        this.items?.value?.find(
          (storedItem) =>
            storedItem.itemName === item.itemName &&
            storedItem.itemId === item.itemId
        )
      ) {
        const index = this.items.findIndex(
          (storedItem) =>
            storedItem.itemName === item.itemName &&
            storedItem.itemId === item.itemId
        );
        // Increase the count for the repeated item
        this.items.value[index].count++;
        console.log("trigger");
      } else {
        console.log("else");
        // Add the item for the first time with a count of 1
        this.items.push({ value: item, count: 1 });
      }

      // Update the total price
      this.totalPrice += item.pricePerUnit;
    },
    deleteSelectedItem(item) {},
    clearSelectedItems() {
      this.items = [];
      this.totalPrice = [];
    },
  },
});
