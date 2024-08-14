import express, { Request, Response, Router } from "express";
import { getBrand, getBrands } from "../../controllers/brandController";

const brandAPIRoute: Router = express.Router();

brandAPIRoute.get('/', getBrands);
brandAPIRoute.get('/:slug', getBrand);
export default brandAPIRoute