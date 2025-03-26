import { NamedRouter } from "./index.js";
import { Router, Response } from "express";
import { forecasts } from "@prisma/client";
// Prisma client renamed from prisma to Db to avoid confusion with the Prisma object
import { Db } from "@server/server.js";


const forecastRouter = Router() as NamedRouter;
forecastRouter.prefix = "forecast";

forecastRouter.get("/", async (_, res: Response) => {
  try{
    console.log("Retrieving forecast");

    let forecast: forecasts[] = [];
    forecast = await Db.forecasts.findMany({
      select:{
        forecastid: true,
        recommendation: true,
        recommendationfor: true,
        createdat: true,
      }
    });
    res.status(200).json({ forecast: forecast });
  }
  catch (error){
    console.error("Error retrieving forecast:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default forecastRouter;
