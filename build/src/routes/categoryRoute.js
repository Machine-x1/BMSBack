"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const categoryRouter = express_1.default.Router();
categoryRouter.post('/', categoryController_1.createCategory);
categoryRouter.get('/', categoryController_1.getCategories);
categoryRouter.get('/:slug', categoryController_1.getCategory);
categoryRouter.patch('/:slug', categoryController_1.updateCategory);
categoryRouter.delete('/:slug', categoryController_1.deleteCategory);
exports.default = categoryRouter;
//# sourceMappingURL=categoryRoute.js.map