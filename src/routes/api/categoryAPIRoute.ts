import express, { Request, Response, Router } from "express";
import { getCategories, getCategory } from "../../controllers/categoryController";

const categoryAPIRoute: Router = express.Router();

categoryAPIRoute.get('/', getCategories);
categoryAPIRoute.get('/:slug', getCategory);

export default categoryAPIRoute