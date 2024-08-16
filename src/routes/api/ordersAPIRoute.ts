import express, { Request, Response, Router } from "express";
import { createOrder, deleteOrder, listOrders, showOrder, updateStatus } from "../../controllers/ordersController";

const orderAPIRouter: Router = express.Router();

orderAPIRouter.post('/', createOrder);
orderAPIRouter.get('/', listOrders);
orderAPIRouter.get('/:id', showOrder);
orderAPIRouter.delete('/:id', deleteOrder);
orderAPIRouter.put('/:id/status', updateStatus);
export default orderAPIRouter