import { Router } from "express";
import postOrder, {
  getOrdersController,
  setStatus
} from "../controllers/order.controller.js";
import sessionMiddleware from "../middlewares/session.middleware.js";

const orderRoute = Router();

orderRoute.get("/", sessionMiddleware, getOrdersController);
orderRoute.post("/", sessionMiddleware, postOrder);
orderRoute.patch("/:id", sessionMiddleware, setStatus);

export default orderRoute;
