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
                costperunit: true,
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


// Productivity Tracking Router (Stretch Goal, currently using sample data)
metricsRouter.get("/Productivity", async (_, res: Response) => {
  try{
    console.log("Retrieving Profit Metrics: ");
     
    const profitMetricsToday = await Db.$queryRaw`
      SELECT COALESCE(( SELECT sum(menuitems.price) AS sum
      FROM menuitems
      JOIN orderitems ON menuitems.menuitemid = orderitems.menuitemid
      WHERE orderitems.servedtimestamp::date >= CURRENT_DATE), 0::numeric) - COALESCE(( SELECT sum(expenses.amount) AS sum
      FROM expenses
      WHERE expenses.expensedate::date >= CURRENT_DATE), 0::numeric) AS profit;`;
    
    const profitMetricsSevenDays = await Db.$queryRaw`
      SELECT COALESCE(( SELECT sum(menuitems.price) AS sum
      FROM menuitems
      JOIN orderitems ON menuitems.menuitemid = orderitems.menuitemid
      WHERE orderitems.servedtimestamp::date >= (CURRENT_DATE - '7 days'::interval)), 0::numeric) - COALESCE(( SELECT sum(expenses.amount) AS sum
      FROM expenses
      WHERE expenses.expensedate::date >= (CURRENT_DATE - '7 days'::interval)), 0::numeric) AS profit;`;
    
    const profitMetricsOneYear = await Db.$queryRaw`SELECT COALESCE(( 
      SELECT sum(menuitems.price) AS sum
      FROM menuitems
      JOIN orderitems ON menuitems.menuitemid = orderitems.menuitemid
      WHERE orderitems.servedtimestamp::date >= (CURRENT_DATE - '1 year'::interval)), 0::numeric) - COALESCE(( SELECT sum(expenses.amount) AS sum
      FROM expenses
      WHERE expenses.expensedate::date >= (CURRENT_DATE - '1 year'::interval)), 0::numeric) AS profit;`;

    const successfulOrdersToday = await Db.orders.aggregate({
      where: {
        completed: true,
        ordertimestamp: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
      _count: {
        completed: true,
      },
    })
    const totalOrdersToday = await Db.orders.count({
      where: {
        ordertimestamp: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },     
    })
    const successfulOrdersSevenDays = await Db.orders.aggregate({
      where: {
        completed: true,
        ordertimestamp: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          lt: new Date(),
        },
      },
      _count: {
        completed: true,
      },
    })
    const totalOrdersSevenDays = await Db.orders.count({
      where: {
        ordertimestamp: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          lt: new Date(),
        },
      },
    })
    const successfulOrdersOneYear = await Db.orders.aggregate({
      where: {
        completed: true,
        ordertimestamp: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          lt: new Date(),
        },
      },
      _count: {
        completed: true,
      },
    })
    const totalOrdersOneYear = await Db.orders.count({
      where: {
        ordertimestamp: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          lt: new Date(),
        },
      },
    })
    const bestSellingItemToday = await Db.$queryRaw`
      SELECT 
	      menuitems.name,
		    "pictureUrl"
      FROM
      	orderitems
      	INNER JOIN menuitems USING (menuitemid)
      WHERE orderitems.servedtimestamp >= CURRENT_DATE
      GROUP BY
      	menuitems.name,
		    "pictureUrl"
      ORDER BY COUNT(menuitems.menuitemid) DESC
      LIMIT 1;`;
    
    const worstSellingItemToday = await Db.$queryRaw`
      SELECT 
        menuitems.name,
		    "pictureUrl"
      FROM
        orderitems
      INNER JOIN menuitems USING (menuitemid)
      WHERE orderitems.servedtimestamp >= CURRENT_DATE
      GROUP BY
        menuitems.name,
		    "pictureUrl"
      ORDER BY COUNT(menuitems.menuitemid) ASC
      LIMIT 1;`;
    
    const bestSellingItemLastSevenDays = await Db.$queryRaw`
      SELECT 
        menuitems.name,
		    "pictureUrl"
      FROM
        orderitems
      INNER JOIN menuitems USING (menuitemid)
      WHERE orderitems.servedtimestamp >= (CURRENT_DATE - '7 days'::interval)
      GROUP BY
        menuitems.name,
		    "pictureUrl"
      ORDER BY COUNT(menuitems.menuitemid) DESC
      LIMIT 1;`;
    
    const worstSellingItemLastSevenDays = await Db.$queryRaw`
      SELECT 
        menuitems.name,
		    "pictureUrl"
      FROM
        orderitems
      INNER JOIN menuitems USING (menuitemid)
      WHERE orderitems.servedtimestamp >= (CURRENT_DATE - '7 days'::interval)
      GROUP BY
        menuitems.name,
		    "pictureUrl"
      ORDER BY COUNT(menuitems.menuitemid) ASC
      LIMIT 1;`;

    const bestSellingItemYearToDate = await Db.$queryRaw`
      SELECT 
        menuitems.name,
		    "pictureUrl"
      FROM
        orderitems
      INNER JOIN menuitems USING (menuitemid)
      WHERE orderitems.servedtimestamp >= (CURRENT_DATE - '1 year'::interval)
      GROUP BY
        menuitems.name,
		    "pictureUrl"
      ORDER BY COUNT(menuitems.menuitemid) DESC
      LIMIT 1;`;

    const worstSellingItemYearToDate = await Db.$queryRaw`
      SELECT 
        menuitems.name,
		    "pictureUrl"
      FROM
        orderitems
      INNER JOIN menuitems USING (menuitemid)
      WHERE orderitems.servedtimestamp >= (CURRENT_DATE - '1 year'::interval)
      GROUP BY
        menuitems.name,
		    "pictureUrl"
      ORDER BY COUNT(menuitems.menuitemid) ASC
      LIMIT 1;`;


    res.status(200).json({ profitMetricsToday, profitMetricsSevenDays, profitMetricsOneYear, successfulOrdersToday, totalOrdersToday, successfulOrdersSevenDays, totalOrdersSevenDays, successfulOrdersOneYear, totalOrdersOneYear, bestSellingItemToday, worstSellingItemToday, bestSellingItemLastSevenDays, worstSellingItemLastSevenDays, bestSellingItemYearToDate, worstSellingItemYearToDate });
  } catch (error){
    console.error("Error retrieving profit metrics:", error);
    res.status(500).json({ error: "Internal server error "});
  }
});

// Attach the routers to the main metricsRouter

export default metricsRouter;
