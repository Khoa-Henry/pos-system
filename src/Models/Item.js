export function CategoryItem(name, id, qty, pPU) {
  this.itemName = name ?? "";
  this.itemId = id; //need to generate the id here
  this.quantity = qty ?? "";
  this.pricePerUnit = pPU ?? "";
}
