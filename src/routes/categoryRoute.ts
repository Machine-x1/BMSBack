import express, { Request, Response, Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryController";

const categoryRouter: Router = express.Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/:slug', getCategory);
categoryRouter.patch('/:slug', updateCategory);
categoryRouter.delete('/:slug', deleteCategory);

export default categoryRouter