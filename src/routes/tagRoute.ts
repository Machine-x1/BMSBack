import express, { Request, Response, Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryController";
import { createTag, deleteTag, getTag, getTags, updateTag } from "../controllers/tagController";

const tagRouter: Router = express.Router();

tagRouter.post('/', createTag);
tagRouter.get('/', getTags);
tagRouter.get('/:slug', getTag);
tagRouter.patch('/:slug', updateTag);
tagRouter.delete('/:slug', deleteTag);

export default tagRouter