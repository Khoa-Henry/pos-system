export function CategoryItem(name, id, qty, pPU, categoryName, categoryId) {
  this.itemName = name ?? "";
  this.itemId = id || "";
  this.quantity = Number(qty) ?? 0;
  this.pricePerUnit = Number(pPU).toFixed(2) ?? 0;
  this.isDirty = false;
  this.categoryName = categoryName ?? "";
  this.categoryId = categoryId ?? "";

  this.formatPrice = function () {
    return parseFloat(this.pricePerUnit).toFixed(2);
  };

  // Convert CategoryItem to a plain object for Firestore
  this.toFirestore = function () {
    return {
      itemName: this.itemName,
      quantity: this.quantity,
      pricePerUnit: this.pricePerUnit,
      categoryName: this.categoryName,
      categoryId: this.categoryId, // Corrected from categoryID to categoryId
    };
  };

  // Convert Firestore document to CategoryItem instance
  this.fromFirestore = function (snapshot, options) {
    const data = snapshot.data(options);

    const item = new CategoryItem(
      data.itemName,
      snapshot.id, // Use snapshot.id as itemId (Firestore document ID)
      data.quantity,
      data.pricePerUnit,
      data.categoryName,
      data.categoryId
    );

    return item;
  };
}

CategoryItem.converter = {
  toFirestore: (item) => item,
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new CategoryItem(
      data.itemName,
      snapshot.id,
      data.quantity,
      data.pricePerUnit,
      data.categoryName,
      data.categoryId
    );
  },
};
