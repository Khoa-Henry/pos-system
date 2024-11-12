import generateUniqueId from "../utils/generateUniqueId";

export function CategoryItem(name, id, qty, pPU) {
  this.itemName = name ?? "";
  this.itemId = id || generateUniqueId(); // Generate ID if not provided
  this.quantity = Number(qty) ?? 0;
  this.pricePerUnit = Number(pPU).toFixed(2) ?? 0;

  this.adjustQuantity = function (adjustment) {
    this.quantity += adjustment;
  };

  this.formatPrice = function () {
    return parseFloat(this.pricePerUnit).toFixed(2);
  };
}
