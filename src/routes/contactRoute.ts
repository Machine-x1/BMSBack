import express, { Request, Response, Router } from "express";
import { createOrder, deleteOrder, listOrders, showOrder, updateStatus } from "../controllers/ordersController";
import { createContact, deleteContact, listContact, showContact } from "../controllers/contactController";

const contactRoute: Router = express.Router();

contactRoute.post('/', createContact);
contactRoute.get('/', listContact);
contactRoute.get('/:id', showContact);
contactRoute.delete('/:id', deleteContact);

export default contactRoute