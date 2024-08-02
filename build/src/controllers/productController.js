"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = exports.deleteProduct = exports.createProduct = exports.showProduct = exports.listProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const mongoose_1 = __importDefault(require("mongoose"));
const listProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const { search, category, brand } = req.query;
        let query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            if (mongoose_1.default.Types.ObjectId.isValid(category)) {
                query.category = new mongoose_1.default.Types.ObjectId(category);
            }
            else {
                return res.status(400).json({ message: 'Invalid category ID' });
            }
        }
        if (brand) {
            if (mongoose_1.default.Types.ObjectId.isValid(brand)) {
                query.brand = new mongoose_1.default.Types.ObjectId(brand);
            }
            else {
                return res.status(400).json({ message: 'Invalid category ID' });
            }
        }
        const product = await Product_1.default.find(query)
            .skip(skip)
            .limit(limit)
            .populate('category')
            .populate('brand');
        const total = await Product_1.default.countDocuments(query);
        const totalPages = Math.ceil(total / limit);
        res.status(200).json({
            data: product,
            currentPage: page,
            totalPages: totalPages,
            totalItems: total,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.listProduct = listProduct;
const showProduct = async (req, res) => {
    try {
        const category = await Product_1.default.findOne({ slug: req.params.slug }).populate('category').populate("brand");
        if (!category) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.showProduct = showProduct;
const createProduct = async (req, res, uuids) => {
    try {
        const { name, description, origin, dataSheet, model, isFeatuerd, category, brand } = req.body;
        const product = new Product_1.default({ brand, name, description, origin, dataSheet, model, isFeatuerd: Boolean(Number(isFeatuerd)), category, images: uuids });
        await product.save();
        res.status(201).json({ product: product });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Product name or slug must be unique' });
        }
        res.status(400).json({ message: error.message });
    }
};
exports.createProduct = createProduct;
const deleteProduct = async (req, res) => {
    try {
        console.log();
        const product = await Product_1.default.findOneAndDelete({ slug: req.params.slug });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // await product.remove();
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProduct = deleteProduct;
const UpdateProduct = () => { };
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=productController.js.map