import { IRouter } from "express";

export interface NamedRouter extends IRouter {
  prefix: string;
}

export { default as ordersRouter } from "@server/routers/orders.router";
export { default as stockRouter } from "@server/routers/stock.router";
