import { NamedRouter } from "./index.js";
import { Router, Response } from "express";
import { menuitems } from "@prisma/client";
// Prisma client renamed from prisma to Db to avoid confusion with the Prisma object
import { Db } from "@server/server.js";

const menuItemsRouter = Router() as NamedRouter;
menuItemsRouter.prefix = "menuItems";

menuItemsRouter.get("/", async (_, res: Response) => {
  try {
    let menuItems:menuitems[] = [];
    console.log("Retrieving all menu items");
    menuItems = await Db.menuitems.findMany();

    res.status(200).json({
      menuItems: menuItems,
    });
  } catch (error) {
    console.error("Error retrieving menu items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
});
export default menuItemsRouter;

