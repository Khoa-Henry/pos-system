import { CategoryItem } from "./Item";

export class CartItem extends CategoryItem {
  constructor(name, id, qty, pPU, categoryName, categoryId, count) {
    super(name, id, qty, pPU, categoryName, categoryId);
    this.count = Number(count) ?? 0;
  }

  increment() {
    this.count += 1;
    this.isDirty = true;
    this.quantity--;
  }

  decrement() {
    if (this.count > 0) {
      this.count -= 1;
      this.isDirty = true;
      this.quantity++;
    }
  }

  // Override the toFirestore method to include the count
  toFirestore() {
    return {
      itemName: this.itemName,
      quantity: this.quantity,
      pricePerUnit: this.pricePerUnit,
      categoryName: this.categoryName,
      categoryId: this.categoryId,
      count: this.count,
    };
  }

  // Override the fromFirestore method to handle the count
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    const item = new CartItem(
      data.itemName,
      snapshot.id,
      data.quantity,
      data.pricePerUnit,
      data.categoryName,
      data.categoryId,
      data.count
    );

    return item;
  }
}

CartItem.converter = {
  toFirestore: (item) => {
    return {
      itemName: item.itemName,
      itemId: item.itemId,
      quantity: item.quantity,
      pricePerUnit: item.pricePerUnit,
      categoryName: item.categoryName,
      categoryId: item.categoryId,
      count: item.count,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new CartItem(
      data.itemName,
      data.itemId,
      data.quantity,
      data.pricePerUnit,
      data.categoryName,
      data.categoryId,
      data.count
    );
  },
};
