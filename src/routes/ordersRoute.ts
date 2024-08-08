import express, { Request, Response, Router } from "express";
import { createOrder, deleteOrder, listOrders, showOrder, updateStatus } from "../controllers/ordersController";

const orderRouter: Router = express.Router();

orderRouter.post('/', createOrder);
orderRouter.get('/', listOrders);
orderRouter.get('/:id', showOrder);
orderRouter.delete('/:id', deleteOrder);
orderRouter.put('/:id/status', updateStatus);

export default orderRouter