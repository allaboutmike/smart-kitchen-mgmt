import { NamedRouter } from "./index.js";
import { Router, Response } from "express";
import { waste } from "@prisma/client";


import { Db } from "@server/server.js";

const metricsRouter = Router() as NamedRouter;
metricsRouter.prefix = "metrics";

// GET All Waste records for frontend waste table | Excluding req:Request
metricsRouter.get("/", async (_, res: Response) => {
  try{
    let wasteRecords:waste[] = [];
    console.log("Retrieving Waste metrics: ");
     // Fetch waste records along with stock and ingredient details
    wasteRecords = await Db.waste.findMany();

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

export default metricsRouter;
