import React from "react";
import OrderTrackingButton from "./OrderTrackingMenu";

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
    <>
      <OrderTrackingButton />
      {/* <div className="orders-container">
        {orders.orderItems.map((order, index) => {
          return (
            <div key={index} className="order">
              <h2>Order: #{`${orders.orderId}`}</h2>
              <h3>{orders.orderStatus}</h3>
              <span>
                <p>{order.itemName}</p>
                <p>Qty {order.itemQuantity}</p>
                <p>{order.itemPrice}</p>
              </span>
            </div>
          );
        })}
        <p>Total {orderTotal}</p>
        <p>{formatter.format(new Date())}</p>
      </div> */}

      <div className="orders-container">
        <article className="order">
          <p className="order-number">Order #12345</p>
          <p className="order-status">Completed</p>
          <br className="line-break" />
          <span className="item-details">
            <p>Burger</p>
            <p>Qty 1</p>
            <p>$1.99</p>
          </span>
          <span className="item-details">
            <p>Gumbo</p>
            <p>Qty 1</p>
            <p>$4.99</p>
          </span>
          <span className="item-details">
            <p>French Fries</p>
            <p>Qty 2</p>
            <p>$2.49</p>
          </span>
          <br className="line-break" />
          <span className="order-total">
            <p>Total</p>
            <p>$21.94</p>
            <p>{formatter.format(new Date())}</p>
          </span>
        </article>
        <article className="order">
          <p className="order-number">Order #12346</p>
          <p className="order-status">Completed</p>
          <br className="line-break" />
          <span className="item-details">
            <p>Burger</p>
            <p>Qty 1</p>
            <p>$1.99</p>
          </span>
          <span className="item-details">
            <p>Gumbo</p>
            <p>Qty 1</p>
            <p>$4.99</p>
          </span>
          <span className="item-details">
            <p>French Fries</p>
            <p>Qty 2</p>
            <p>$2.49</p>
          </span>
          <br className="line-break" />
          <span className="order-total">
            <p>Total</p>
            <p>$21.94</p>
            <p>{formatter.format(new Date())}</p>
          </span>
        </article>
      </div>
    </>
  );
}
