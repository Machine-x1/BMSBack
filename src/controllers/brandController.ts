import { Request, Response } from "express";
import Category from "../models/Category";
import Brand from "../models/Brand";

export const createBrand = async (req:Request, res:Response) => {
    try {
      const { name, description } = req.body;
      const brand = new Brand({ name, description });
      await brand.save();
      res.status(201).json(brand);
    } catch (error:any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'brand name or slug must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all categories
  export const getBrands = async (req:Request, res:Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const brands = await Brand.find().skip(skip).limit(limit);
      const total = await Brand.countDocuments();
      const totalPages = Math.ceil(total / limit);
  
      res.status(200).json({
        data: brands,
        currentPage: page,
        totalPages: totalPages,
        totalItems: total,
      });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single category
  export const getBrand = async (req:Request, res:Response) => {
   
    try {
      const brand = await Brand.findOne({ slug: req.params.slug });
      if (!brand) {
        return res.status(404).json({ message: 'brand not found' });
      }
      res.status(200).json(brand);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a category
  export const updateBerand = async (req:Request, res:Response) => {
    try {
      const brand = await Brand.findOne({ slug: req.params.slug });
      if (!brand) {
        return res.status(404).json({ message: 'brand not found' });
      }
      const { name, description } = req.body;
      brand.name = name;
      brand.description = description;
      await brand.save();
      res.status(200).json(brand);
    } catch (error:any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Category name or slug must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a category
  export const deleteBrand = async (req:Request, res:Response) => {
    try {
      const brand = await Brand.findOneAndDelete({ slug: req.params.slug });
      if (!brand) {
        return res.status(404).json({ message: 'brand not found' });
      }
      // await category.remove();
      res.status(204).json({ message: 'Brand Deleted' });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  