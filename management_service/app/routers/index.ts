import { IRouter } from "express";

export interface NamedRouter extends IRouter {
  prefix: string;
}

export { default as ordersRouter } from "./orders.router.js";