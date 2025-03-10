import { NamedRouter } from "@server/routers";
import { Router, Request, Response } from "express";

const stockRouter = Router() as NamedRouter;
stockRouter.prefix = "stocks";

// GET Inventory Items 

stockRouter.get("/", ( _req: Request, res: Response) => {
  try {
    const sampleStockInvList = [
      {id: "1", product: "Sample Product A", quantity: 50, lastUpdated: new Date().toISOString() },
      {id: "2", product: "Sample Product B", quantity: 30, lastUpdated: new Date().toISOString() },
      {id: "3", product: "Sample Product C", quantity: 100, lastUpdated: new Date().toISOString() },
    ];

    res.status(200).json({
      stock: sampleStockInvList,
    });
  } catch (error) {
      console.error("ERROR: Retrieving stock items:", error);
        res.status(500).json({error: "Internal Server Error"});
  }
});

stockRouter.get("/:id", (req: Request, res: Response) => {
  try {
    const sampleStockInvList = {
      id: req.params["id"],
      product: "Sample Product",
      quantity: 100,
      lastUpdated: new Date().toISOString(),
    };

    res.status(200).json({
      message: "Stock retrieved successfully.",
      stock: sampleStockInvList,
    });
  } catch (error) {
    console.error("Error retrieving stock:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

stockRouter.post("/", (req: Request, res: Response) => {
  try {
    const { product, quantity } = req.body;

    const newStock = {
      id: "123",
      product,
      quantity,
      lastUpdated: new Date().toISOString(),
    };
    console.log("Stock created:", newStock);

    res.sendStatus(201);
  }catch (error){
    console.error("Error creating stock:", error);
    res.status(500).json({ error: "Internal Server Error"});
  }
});


export default stockRouter
