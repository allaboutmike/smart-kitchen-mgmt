import { NamedRouter } from "@server/routers";
import { Router, Request, Response } from "express";

const ordersRouter = Router() as NamedRouter;
ordersRouter.prefix = "orders";

ordersRouter.get("/:id", (req: Request, res: Response) => {
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
        timePlaced: "2023-10-01T12:00:00Z",
    }

    res.status(200).json({
        message: "Order retrieved successfully",
        order: sampleOrder,
    });
});

export default ordersRouter;