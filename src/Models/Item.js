export function CategoryItem(name, id, qty, pPU) {
  this.itemName = name ?? "";
  this.itemId = id || "";
  this.quantity = Number(qty) ?? 0;
  this.pricePerUnit = Number(pPU).toFixed(2) ?? 0;

  this.adjustQuantity = function (adjustment) {
    this.quantity += adjustment;
  };

  this.formatPrice = function () {
    return parseFloat(this.pricePerUnit).toFixed(2);
  };

  // Convert CategoryItem to a plain object for Firestore
  this.toFirestore = function () {
    return {
      itemName: this.itemName,
      quantity: this.quantity,
      pricePerUnit: this.pricePerUnit,
    };
  };

  // Convert Firestore document to CategoryItem instance
  this.fromFirestore = function (snapshot, options) {
    const data = snapshot.data(options);

    const item = new CategoryItem(
      data.itemName,
      snapshot.id, // Use snapshot.id as itemId (Firestore document ID)
      data.quantity,
      data.pricePerUnit
    );

    return item;
  };
}

CategoryItem.converter = {
  toFirestore: (item) => item.toFirestore(),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new CategoryItem(
      data.itemName,
      snapshot.id,
      data.quantity,
      data.pricePerUnit
    );
  },
};
