import { CartItem } from "@/Models/CartItem";
import { defineStore } from "pinia";

export const useSelectedItemsStore = defineStore("selectedItems", {
  state: () => ({
    items: [],
    totalPrice: 0.0,
    totalItem: 0,
  }),

  actions: {
    storeAddCustomItem(customItem, count) {
      const existingCartItem = this.items.find(
        (item) =>
          item.itemName === customItem.itemName &&
          item.itemId === customItem.itemId
      );

      if (existingCartItem) {
        // If item already exists, increment its count by the specified amount
        existingCartItem.increment();
      } else {
        // Add a new CartItem instance to the items array
        const newCartItem = new CartItem(
          customItem.itemName,
          customItem.itemId,
          customItem.quantity,
          customItem.pricePerUnit,
          customItem.categoryName,
          customItem.categoryId,
          count
        );
        this.items.push(newCartItem);
      }
      this.totalPrice +=
        Math.round(customItem.pricePerUnit * count * 100) / 100;
      this.totalItem += count;
    },

    storeAddSelectItem(item) {
      const existingCartItem = this.items.find(
        (cartItem) =>
          cartItem.itemName === item.itemName && cartItem.itemId === item.itemId
      );

      if (existingCartItem) {
        // Increment the count using the model's method
        existingCartItem.increment();
      } else {
        // Create a new CartItem if it doesn't already exist in the cart
        const newCartItem = new CartItem(
          item.itemName,
          item.itemId,
          item.quantity,
          item.pricePerUnit,
          item.categoryName,
          item.categoryId,
          1
        );
        newCartItem.quantity--;
        this.items.push(newCartItem);
      }

      this.totalPrice += Math.round(item.pricePerUnit * 100) / 100;
      this.totalItem += 1;
    },

    storeDeleteSelectedItem(cartItem) {
      const index = this.items.findIndex(
        (item) =>
          item.itemName === cartItem.itemName && item.itemId === cartItem.itemId
      );

      if (index !== -1) {
        const selectedCartItem = this.items[index];

        // Decrement count using the model's method
        selectedCartItem.decrement();

        // Remove item if count reaches zero
        if (selectedCartItem.count === 0) {
          this.items.splice(index, 1);
        }
      }

      this.totalPrice -= Math.round(cartItem.pricePerUnit * 100) / 100;
      this.totalItem -= 1;
    },

    storeClearSelectedItems() {
      this.items = [];
      this.totalPrice = 0.0;
      this.totalItem = 0;
    },
  },
});
