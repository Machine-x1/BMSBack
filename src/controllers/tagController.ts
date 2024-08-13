import { Request, Response } from "express";
import Category from "../models/Category";
import Tag from "../models/Tags";

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const tags = new Tag({ name, description });
    await tags.save();
    res.status(201).json(tags);
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Tags name or slug must be unique" });
    }
    res.status(400).json({ message: error.message });
  }
};

// Get all categories
export const getTags = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const tags = await Tag.find().skip(skip).limit(limit);
    const total = await Tag.countDocuments();
    const totalPages = Math.ceil(total / limit);
    res.status(200).json({
      data: tags,
      currentPage: page,
      totalPages: totalPages,
      totalItems: total,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category
export const getTag = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.slug });
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
export const updateTag = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.slug });
    if (!tag) {
      return res.status(404).json({ message: "Category not found" });
    }
    const { name, description } = req.body;
    tag.name = name;
    tag.description = description;
    await tag.save();
    res.status(200).json(tag);
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Tag name or slug must be unique" });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete a category
export const deleteTag = async (req: Request, res: Response) => {
  try {
    const category = await Tag.findOneAndDelete({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: "Tag not found" });
    }
    // await category.remove();
    res.status(204).json({ message: "Tag Deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
