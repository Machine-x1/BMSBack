import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (req:Request, res:Response) => {
    try {
      const { name, description } = req.body;
      const category = new Category({ name, description });
      await category.save();
      res.status(201).json(category);
    } catch (error:any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Category name or slug must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all categories
  export const getCategories = async (req:Request, res:Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const categories = await Category.find().skip(skip).limit(limit);
      const total = await Category.countDocuments();
      const totalPages = Math.ceil(total / limit);
      res.status(200).json({
        data: categories,
        currentPage: page,
        totalPages: totalPages,
        totalItems: total,
      });    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single category
  export const getCategory = async (req:Request, res:Response) => {
   
    try {
      const category = await Category.findOne({ slug: req.params.slug });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a category
  export const updateCategory = async (req:Request, res:Response) => {
    try {
      const category = await Category.findOne({ slug: req.params.slug });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      const { name, description } = req.body;
      category.name = name;
      category.description = description;
      await category.save();
      res.status(200).json(category);
    } catch (error:any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Category name or slug must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a category
  export const deleteCategory = async (req:Request, res:Response) => {
    try {
      const category = await Category.findOneAndDelete({ slug: req.params.slug });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      // await category.remove();
      res.status(204).json();
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  