import { defineStore } from "pinia";
import { CartItem } from "../Models/CartItem";

export const useSelectedItemsStore = defineStore("selectedItems", {
  state: () => ({
    items: [],
    totalPrice: 0.0,
    totalItem: 0,
  }),

  actions: {
    storeAddCustomItem(customItem, count) {
      console.log("here");
      const existingCartItem = this.items.find(
        (item) =>
          item.value.itemName === customItem.itemName &&
          item.value.itemId === customItem.itemId
      );

      if (existingCartItem) {
        // If item already exists, increment its count by the specified amount
        existingCartItem.count += count;
      } else {
        // Add a new CartItem instance to the items array
        const newCartItem = CartItem(customItem, count);
        this.items.push(newCartItem);
      }

      this.totalPrice +=
        Math.round(customItem.pricePerUnit * count * 100) / 100;
      this.totalItem += count;
    },

    storeAddSelectItem(item) {
      const existingCartItem = this.items.find(
        (cartItem) =>
          cartItem.value.itemName === item.itemName &&
          cartItem.value.itemId === item.itemId
      );

      if (existingCartItem) {
        // Increment the count using the model's method
        existingCartItem.increment();
      } else {
        // Create a new CartItem if it doesn't already exist in the cart
        const newCartItem = CartItem(item);
        this.items.push(newCartItem);
      }

      this.totalPrice += Math.round(item.pricePerUnit * 100) / 100;
      this.totalItem += 1;
    },

    storeDeleteSelectedItem(cartItem) {
      const index = this.items.findIndex(
        (item) =>
          item.value.itemName === cartItem.value.itemName &&
          item.value.itemId === cartItem.value.itemId
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

      this.totalPrice -= Math.round(cartItem.value.pricePerUnit * 100) / 100;
      this.totalItem -= 1;
    },

    storeClearSelectedItems() {
      this.items = [];
      this.totalPrice = 0.0;
      this.totalItem = 0;
    },
  },
});
