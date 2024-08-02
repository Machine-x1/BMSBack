"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new Category_1.default({ name, description });
        await category.save();
        res.status(201).json(category);
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category name or slug must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
};
exports.createCategory = createCategory;
// Get all categories
const getCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const categories = await Category_1.default.find().skip(skip).limit(limit);
        const total = await Category_1.default.countDocuments();
        const totalPages = Math.ceil(total / limit);
        res.status(200).json({
            data: categories,
            currentPage: page,
            totalPages: totalPages,
            totalItems: total,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCategories = getCategories;
// Get a single category
const getCategory = async (req, res) => {
    try {
        const category = await Category_1.default.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCategory = getCategory;
// Update a category
const updateCategory = async (req, res) => {
    try {
        const category = await Category_1.default.findOne({ slug: req.params.slug });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const { name, description } = req.body;
        category.name = name;
        category.description = description;
        await category.save();
        res.status(200).json(category);
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category name or slug must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
};
exports.updateCategory = updateCategory;
// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category_1.default.findOneAndDelete({ slug: req.params.slug });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // await category.remove();
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map