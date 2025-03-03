import { NamedRouter } from "@server/routers";
import { Router, Request, Response } from "express";

const ordersRouter = Router() as NamedRouter;
ordersRouter.prefix = "orders";

ordersRouter.get("/:id", (res: Response) => {
    try {
        // This is a placeholder for the actual order retrieval logic
    // const orderId = req.params.id;
    // const order = await prisma.order.findUnique({ where: { id: orderId } });
    const sampleOrder = {
        id: "123",
        items: [
            { 
                productId: "1",
                productName: "Cheeseburger",
                ingredients: {
                    cheese: true,
                    lettuce: true,
                    tomato: false,
                    onion: true,
                    pickles: false,
                    ketchup: true,
                    mustard: false
                },
                notes: "Extra ketchup, side of mayo",
            },
        ],
        status: "In progress",
        total: 15.99,
        timePlaced: new Date().toISOString(),
    }

    res.status(200).json({
        order: sampleOrder,
    });
    } catch (error) {
        console.error("Error retrieving order:", error);
         res.status(500).json({ error: "Internal server error" });
        
    }
    
});

// MIGHT REPLACE THIS WITH WEBSOCKET
ordersRouter.post("/", (req: Request, res: Response) => {
    try {
        // This is a placeholder for the actual order creation logic
    const { items, status, total, timePlaced } = req.body;

    // Simulate order creation
    const newOrder = {
        id: "123",
        items,
        status,
        total,
        timePlaced,
    };
    console.log("Order created:", newOrder);
    // In a real application, you would save the order to the database here
    // await prisma.order.create({ data: newOrder });

    // ONCE WEBSOCKET IS IMPLEMENTED, WE WILL NOTIFY THE CLIENT OF A NEW ORDER

    res.sendStatus(201)
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
    
});


ordersRouter.put("/:id", (req: Request, res: Response) => {
    try {
        // This is a placeholder for the actual order update logic
    const orderId = req.params["id"];
    const { newStatus } = req.body;
    console.log("Updating order with ID:", orderId);
    // const order = await prisma.order.findUnique({ where: { id: orderId } });
    // if (!order) {
    //     return res.status(404).json({ error: "Order not found" });
    // }
    // Update the order status
    console.log("New status:", newStatus);
    // await prisma.order.update({
    //     where: { id: orderId },
    //     data: { status: newStatus },
    // });
    console.log("Order updated successfully");

    // ONCE WEBSOCKET IS IMPLEMENTED, WE WILL NOTIFY THE CLIENT OF A A STATUS UPDATE
    

    res.sendStatus(200);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    
});

export default ordersRouter;