import generateUniqueId from "../utils/generateUniqueId";

export function Category(name, id, itemList = []) {
  this.categoryName = name ?? "";
  this.categoryId = id ?? generateUniqueId();
  this.items = itemList ?? [];

  this.findItemIndexById = function (itemId) {
    return this.items.findIndex((item) => item.itemId === itemId);
  };

  this.updateItem = function (updatedItem) {
    const index = this.findItemIndexById(updatedItem.itemId);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  };

  this.addItem = function (newItem) {
    const existingIndex = this.findItemIndexById(newItem.itemId);
    if (existingIndex !== -1) {
      this.items[existingIndex] = newItem; // Update if exists
    } else {
      this.items.push(newItem); // Add if new
    }
  };

  this.deleteItem = function (itemId) {
    const index = this.findItemIndexById(itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  };
}
