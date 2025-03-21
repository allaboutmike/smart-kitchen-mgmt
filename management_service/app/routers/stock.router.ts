import { NamedRouter } from "@server/routers/index.js";
// import { NamedRouter } from "@server/routers/index.js";
import { Router, Request, Response } from "express";
import { ingredients } from "@prisma/client";
import { Db } from "@server/server.js";

const stockRouter = Router() as NamedRouter;
stockRouter.prefix = "stocks";

// GET Inventory Items or filter by low stock
stockRouter.get("/", async ( _req: Request, res: Response) => {
  try{
    console.log("Retrieving Stock List" );
    // Check for low stock, to be included in later version
    // const { lowStock } = req.query;
    // console.log("Retrieving stock items", lowStock ? "with low stock" : "");
    let stockItems: ingredients[] = [];
      stockItems = await Db.ingredients.findMany({
        // where: { quantity: { lt: Number(lowStock) }},
        select: {
          ingredientid: true,
          ingredientname: true, 
          bulkOrderQuantity: true,
          stock: {
            select: {
              stockid: true,
              quantity: true,
              cost: true,
              isexpired: true,
              receivedtimestamp: true,
              expirationdate: true
            },
          },
          thresholdquantity: true,
          category: true,
          costperunit: true,
          shelflife: true,
          servingSize: true,
        }
      });
    
    res.status(200).json({ stock: stockItems });
  }
  catch (error) {
    console.error("Error retrieving stock:", error);
    res.status(500).json({ error: "internal server error" });
  }
});

// Get a single stock item by ID
stockRouter.get("/:id", async (req: Request, res: Response) => {
  try{
    const stockId = Number(req.params["id"]);
    console.log("Retrieving stock item with ID:", stockId);

    const stockItem = await Db.stock.findUnique({
      where: { stockid: stockId },
      include: {
        ingredients:{
          select:{
            ingredientname: true,
          },
        },
      },
    });
    // if (!stockItem){
    //   return res.status(404).json({ error: "Stock item not found "});
    // }
    res.status(200).json({ stock: stockItem });
  }
  catch (error) {
    console.error("Error retrieving stock item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

stockRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { bulkOrderQuantity, ingredientId, price, shelfLife } = req.body;
 
    const todaysDate = new Date();
    const expirationDate = new Date(todaysDate);
    expirationDate.setDate(todaysDate.getDate() + shelfLife);

    const stock = await Db.stock.create({
      data: {
        ingredientid: ingredientId,
        quantity: bulkOrderQuantity,
        cost: price * bulkOrderQuantity,
        expirationdate: expirationDate
      },
      select: {
        stockid: true,
        cost: true,
      },
    });

    await Db.expenses.create({
      data: {
        stockid: stock.stockid,
        amount: stock.cost,
        expensedate: todaysDate,
      },
    })
    console.log("Ordered stock with ID:", stock.stockid);
    res.sendStatus(201);
  } catch (error) {
    console.error("Error ordering stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default stockRouter
