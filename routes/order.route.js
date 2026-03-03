import { Router } from "express";
import postOrder from "../controllers/order.controller.js";

const orderRoute = Router();

orderRoute.post("/", postOrder)

export default orderRoute;
