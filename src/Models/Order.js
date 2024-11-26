export function Order(orderId, itemList, date, paymentInfo, orderer, total) {
  this.orderId = orderId ?? "";
  this.items = itemList ?? [];
  this.date = date ?? new Date();
  this.total = total ?? this.calculateTotal(); // calculate below
  this.paymentInfo = paymentInfo ?? "";
  this.orderer = orderer ?? "";

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
}
