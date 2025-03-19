import { NamedRouter } from "./index.js";
import { Router, Response } from "express";
import { waste } from "@prisma/client";
import { Db } from "@server/server.js";

const metricsRouter = Router() as NamedRouter;
metricsRouter.prefix = "metrics";


// Waste Router
// GET All Waste records for frontend waste table | Excluding req:Request
metricsRouter.get("/waste", async (_, res: Response) => {
  try{
    let wasteRecords:waste[] = [];
    console.log("Retrieving Waste metrics: ");
     // Fetch waste records along with stock and ingredient details
    wasteRecords = await Db.waste.findMany({
      select: {
        wasteid: true,
        stockid: true,
        reason: true,
        wastetimestamp: true,
        quantity: true,
        stock: {
          select:{
            ingredients: {
              select:{
                ingredientname: true,
                category: true,
              },
            },
          },
        },

      },
    });

     // Respond with the retrieved waste records
    res.status(200).json({
      waste: wasteRecords,
    });
   }catch (error){
    // Logged Error
    console.error("Error retrieving waste metrics:", error);
    res.status(500).json({ error: "Internal server error" });
   }
});


// Will include other metrics later once identified 


// Profit Tracking Router (Stretch Goal, currently using sample data)
metricsRouter.get("/profit", (_, res: Response) => {
  try{
    console.log("Retrieving Profit Metrics: ");


    /* Sample profit metrics data for a period of 30 days. */
    const today = new Date();
    const profitMetrics = Array.from({ length: 30 }, (_, index) => {
      const date = new Date();
      date.setDate(today.getDate() - index);

      /* Part of the logic for generating sample profit metrics data. */
      return {
        id: index + 1,
        date: date.toISOString().split("T")[0],
      /* Random values for revenue and expenses
      for each entry in the `profitMetrics` array. Here's a breakdown of what it does: */
        revenue: Math.floor(Math.random() * 1000) + 500,
        expenses: Math.floor(Math.random() * 700) + 300,
      };
   /* Using the `map` function to transform each entry in the `profitMetrics`
   array. */
    }).map((entry) => ({
      ...entry,
      profit: entry.revenue - entry.expenses,
    }));
    res.status(200).json({ profit:profitMetrics });
  } catch (error){
    console.error("Error retrieving profit metrics:", error);
    res.status(500).json({ error: "Internal server error "});
  }
});



// Attach the routers to the main metricsRouter

export default metricsRouter;
