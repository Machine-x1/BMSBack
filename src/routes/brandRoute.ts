import express, { Request, Response, Router } from "express";
import { createBrand, deleteBrand, getBrand, getBrands, updateBerand } from "../controllers/brandController";

const brandsRouter: Router = express.Router();

brandsRouter.post('/', createBrand);
brandsRouter.get('/', getBrands);
brandsRouter.get('/:slug', getBrand);
brandsRouter.patch('/:slug', updateBerand);
brandsRouter.delete('/:slug', deleteBrand);

export default brandsRouter