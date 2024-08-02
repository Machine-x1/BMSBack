"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBerand = exports.getBrand = exports.getBrands = exports.createBrand = void 0;
const Brand_1 = __importDefault(require("../models/Brand"));
const createBrand = async (req, res) => {
    try {
        const { name, description } = req.body;
        const brand = new Brand_1.default({ name, description });
        await brand.save();
        res.status(201).json(brand);
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'brand name or slug must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
};
exports.createBrand = createBrand;
// Get all categories
const getBrands = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const brands = await Brand_1.default.find().skip(skip).limit(limit);
        const total = await Brand_1.default.countDocuments();
        const totalPages = Math.ceil(total / limit);
        res.status(200).json({
            data: brands,
            currentPage: page,
            totalPages: totalPages,
            totalItems: total,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getBrands = getBrands;
// Get a single category
const getBrand = async (req, res) => {
    try {
        const brand = await Brand_1.default.findOne({ slug: req.params.slug });
        if (!brand) {
            return res.status(404).json({ message: 'brand not found' });
        }
        res.status(200).json(brand);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getBrand = getBrand;
// Update a category
const updateBerand = async (req, res) => {
    try {
        const brand = await Brand_1.default.findOne({ slug: req.params.slug });
        if (!brand) {
            return res.status(404).json({ message: 'brand not found' });
        }
        const { name, description } = req.body;
        brand.name = name;
        brand.description = description;
        await brand.save();
        res.status(200).json(brand);
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category name or slug must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
};
exports.updateBerand = updateBerand;
// Delete a category
const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand_1.default.findOneAndDelete({ slug: req.params.slug });
        if (!brand) {
            return res.status(404).json({ message: 'brand not found' });
        }
        // await category.remove();
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteBrand = deleteBrand;
//# sourceMappingURL=brandController.js.map