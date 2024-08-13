import express, { Request, Response, Router } from "express";
import { createBrand, deleteBrand, getBrand, getBrands, updateBerand } from "../controllers/brandController";
import { loginAuth } from "../controllers/authController";

const authRouter: Router = express.Router();

authRouter.post('/login', loginAuth);

export default authRouter