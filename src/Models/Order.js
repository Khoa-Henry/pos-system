import { CartItem } from "./CartItem";

export function Order(orderId, itemList, date, paymentType, issuer, total) {
  this.orderId = orderId ?? "";
  this.items = itemList ?? [];
  this.date = date ?? new Date();
  this.total = total ?? ""; // calculate below
  this.paymentType = paymentType ?? "";
  this.issuer = issuer ?? "";

  // Ensure each item in itemList is a CartItem
  this.items = this.items.map((item) =>
    item instanceof CartItem
      ? item
      : new CartItem(
          item.itemName,
          item.itemId,
          item.quantity,
          item.pricePerUnit,
          item.categoryName,
          item.categoryId,
          item.count
        )
  );

  this.calculateTotal = function () {
    let itemTotal = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    let total =
      itemTotal + this.shippingInfo.shippingCost - this.discount + this.tax;
    return total;
  };

  this.formatTotal = function () {
    return parseFloat(this.total).toFixed(2);
  };

  // Convert the order object into a plain object format for Firestore
  this.toFirestore = function () {
    const finalItems = this.items.map((item) =>
      CartItem.converter.toFirestore(item)
    );
    return {
      items: finalItems,
      date: this.date,
      total: this.total,
      paymentType: this.paymentType,
      issuer: this.issuer,
    };
  };

  // Convert a Firestore document into a order object
  this.fromFirestore = function (snapshot, options) {
    const data = snapshot.data(options);

    const order = new Order(
      snapshot.id,
      data.items.map((itemData) =>
        CartItem.converter.fromFirestore({ data: () => itemData })
      ),
      data.date,
      data.paymentType,
      data.issuer,
      data.total
    );

    return order;
  };
}

Order.converter = {
  toFirestore: (order) => order,
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Order(
      snapshot.id,
      data.items.map((itemData) =>
        CartItem.converter.fromFirestore({ data: () => itemData })
      ),
      data.date,
      data.paymentType,
      data.issuer,
      data.total
    );
  },
};
