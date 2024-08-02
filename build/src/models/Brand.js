"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
// Define the schema
const brandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
// Middleware to generate slug from name before saving the document
brandSchema.pre('save', function (next) {
    // 'this' refers to the current document
    this.slug = (0, slugify_1.default)(this.name, { lower: true, strict: true });
    next();
});
// Define the Brand model
const Brand = (0, mongoose_1.model)('Brand', brandSchema);
exports.default = Brand;
//# sourceMappingURL=Brand.js.map