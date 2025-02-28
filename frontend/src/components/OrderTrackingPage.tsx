import React from "react";

const orders = {
  orderId: 12345,
  orderStatus: "completed",
  orderItems: [
    {
      itemName: "burger",
      itemPrice: 1.99,
      itemQuantity: 1,
    },
    {
      itemName: "gumbo",
      itemPrice: 4.99,
      itemQuantity: 3,
    },
  ],
};

export default function OrderTrackingPage() {
  let orderTotal = orders.orderItems.reduce(
    (acc, cur) => acc + cur.itemPrice * cur.itemQuantity,
    0
  );

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  });

  return (
    <div>
      {orders.orderItems.map((order, index) => {
        return (
          <div key={index}>
            <h2>Order: #{`${orders.orderId}`}</h2>
            <h3>{orders.orderStatus}</h3>
            <span>
              <p>{order.itemName}</p>
              <p>{order.itemQuantity}</p>
              <p>{order.itemPrice}</p>
            </span>
          </div>
        );
      })}
      <p>Total {orderTotal}</p>
      <p>{formatter.format(new Date())}</p>
    </div>
  );
}
