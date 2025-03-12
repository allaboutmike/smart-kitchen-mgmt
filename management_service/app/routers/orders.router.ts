import { NamedRouter } from "./index.js";
import { Router, Request, Response } from "express";
import { Prisma, orders } from "@prisma/client";
// Prisma client renamed from prisma to Db to avoid confusion with the Prisma object
import { Db } from "@server/server.js";

const ordersRouter = Router() as NamedRouter;
ordersRouter.prefix = "orders";

ordersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { completed, orderItemsDetails } = req.query;
    console.log("Retrieving orders with status:", completed);
    console.log("Get order details:", orderItemsDetails);
    let orders: orders[] = [];
    if ((completed === "true" || completed === "false") && orderItemsDetails === "false") {
      console.log("Retrieving orders with completed status:", completed);
      const completedBoolean = completed === "true";
      orders = await Db.orders.findMany({
        where: { completed: completedBoolean },
      });
    } else if ((completed === "true" || completed === "false") && orderItemsDetails === "true") {
      console.log("Retrieving orders with completed status:", completed);
      console.log("Retrieving orders with order items details:", orderItemsDetails);
      const completedBoolean = completed === "true";
      orders = await Db.orders.findMany({
        where: { completed: completedBoolean },
        select: {
          orderid: true,
          orderitems: {
            select: {
              orderitemid: true,
              served: true,
              servedtimestamp: true,
              returned: true,
              menuitems: {
                select: {
                  name: true,
                  price: true,
                },
              },
              customizationdetail: true,
            },
          },
          ordertimestamp: true,
          completedTimeStamp: true,
          completed: true,
        },
      });
    } else {
      console.log("Retrieving all orders");
      orders = await Db.orders.findMany();
    }

    res.status(200).json({
      orders: orders,
    });
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

ordersRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    // This is a placeholder for the actual order retrieval logic
    const orderId = Number(req.params["id"]);
    const order = await Db.orders.findUnique({
      where: { orderid: orderId },
      select: {
        orderid: true,
        orderitems: {
          select: {
            orderitemid: true,
            served: true,
            servedtimestamp: true,
            returned: true,
            menuitems: {
              select: {
                name: true,
                price: true,
              },
            },
            customizationdetail: true,
          },
        },
        ordertimestamp: true,
        completed: true,
      },
    });

    res.status(200).json({
      order: order,
    });
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// MIGHT REPLACE THIS WITH WEBSOCKET
ordersRouter.post("/", async (req: Request, res: Response) => {
  try {
    // This is a placeholder for the actual order creation logic
    const { items, timePlaced } = req.body;

    const orderItemsData = items.map(
      (orderItem: Prisma.orderitemsCreateInput) => {
        return {
          menuitemid: orderItem.menuitems.connect?.menuitemid,
          customizationdetail: orderItem.customizationdetail,
        };
      }
    );

    // Simulate order creation
    const newOrder = {
      id: "123",
      items,
      timePlaced,
    };
    console.log("Order created:", newOrder);
    // In a real application, you would save the order to the database here
    await Db.orders.create({
      data: {
        ordertimestamp: timePlaced,
        orderitems: {
          createMany: {
            data: orderItemsData,
          },
        },
      },
    });

    // ONCE WEBSOCKET IS IMPLEMENTED, WE WILL NOTIFY THE CLIENT OF A NEW ORDER

    res.sendStatus(201);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

ordersRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    // This is a placeholder for the actual order update logic
    const orderId = Number(req.params["id"]);
    const { newStatus } = req.body;
    console.log("Updating order with ID:", orderId);

    // const order = await Db.orders.findUnique({ where: { orderid: orderId } });

    // if (!order) {
    //     return res.status(404).json({ error: "Order not found" });
    // }
    // Update the order status
    console.log("New status:", newStatus);
    await Db.orders.update({
      where: { orderid: orderId },
      data: { completed: newStatus },
    });
    console.log("Order updated successfully");

    // ONCE WEBSOCKET IS IMPLEMENTED, WE WILL NOTIFY THE CLIENT OF A A STATUS UPDATE

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default ordersRouter;
