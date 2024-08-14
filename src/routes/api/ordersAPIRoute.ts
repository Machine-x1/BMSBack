import express, { Request, Response, Router } from "express";
import { createOrder } from "../../controllers/ordersController";

const orderAPIRouter: Router = express.Router();

orderAPIRouter.post('/', createOrder);

export default orderAPIRouter