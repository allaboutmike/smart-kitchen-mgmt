import { IRouter } from "express";

export interface NamedRouter extends IRouter {
  prefix: string;
}

export { default as ordersRouter } from "@server/routers/orders.router.js";
export { default as stockRouter } from "@server/routers/stock.router.js";
export { default as menuItemsRouter } from "@server/routers/menuItems.router.js";
