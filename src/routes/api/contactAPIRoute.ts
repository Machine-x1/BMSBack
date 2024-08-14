import express, { Request, Response, Router } from "express";
import { createContact } from "../../controllers/contactController";

const contactAPIRoute: Router = express.Router();

contactAPIRoute.post('/', createContact);

export default contactAPIRoute