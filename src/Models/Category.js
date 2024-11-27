import { CategoryItem } from "./Item";

export function Category(name, id, itemList = []) {
  this.categoryName = name ?? "";
  this.categoryId = id ?? "";
  this.items = itemList ?? []; // Items should be CategoryItem instances

  // Ensure each item in itemList is a CategoryItem
  this.items = this.items.map((item) =>
    item instanceof CategoryItem
      ? item
      : new CategoryItem(
          item.itemName,
          item.itemId,
          item.quantity,
          item.pricePerUnit
        )
  );

  // Method to find an item's index by its ID
  this.findItemIndexById = function (itemId) {
    return this.items.findIndex((item) => item.itemId === itemId);
  };

  // Method to update an item in the items list
  this.updateItem = function (updatedItem) {
    const index = this.findItemIndexById(updatedItem.itemId);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  };

  // Method to add a new item or update if it already exists
  this.addItem = function (newItem) {
    const existingIndex = this.findItemIndexById(newItem.itemId);
    if (existingIndex !== -1) {
      this.items[existingIndex] = newItem; // Update if exists
    } else {
      this.items.push(newItem); // Add if new
    }
  };

  // Method to delete an item by its ID
  this.deleteItem = function (itemId) {
    const index = this.findItemIndexById(itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  };

  // Convert the Category object into a plain object format for Firestore
  this.toFirestore = function () {
    return {
      categoryName: this.categoryName,
      items: this.items.map((item) => item.toFirestore()), // serialized the item oject correctly
    };
  };

  // Convert a Firestore document into a Category object
  this.fromFirestore = function (snapshot, options) {
    const data = snapshot.data(options);

    // create the model
    const items = data.items.map(
      (item) =>
        new CategoryItem(
          item.itemName,
          item.itemId,
          item.quantity,
          item.pricePerUnit
        )
    );

    const category = new Category(data.categoryName, snapshot.id, items);

    return category;
  };
}

Category.converter = {
  toFirestore: (category) => category.toFirestore(),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Category(data.categoryName, snapshot.id, data.items);
  },
};
