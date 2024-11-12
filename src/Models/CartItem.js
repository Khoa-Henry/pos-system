export function CartItem(item, count = 1) {
  return {
    value: item,
    count,

    // Method to increment count
    increment() {
      this.count++;
      this.value.quantity--;
    },

    // Method to decrement count
    decrement() {
      if (this.count > 0) {
        this.count--;
        this.value.quantity++;
      }
    },
  };
}
