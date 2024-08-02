"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandController_1 = require("../controllers/brandController");
const brandsRouter = express_1.default.Router();
brandsRouter.post('/', brandController_1.createBrand);
brandsRouter.get('/', brandController_1.getBrands);
brandsRouter.get('/:slug', brandController_1.getBrand);
brandsRouter.patch('/:slug', brandController_1.updateBerand);
brandsRouter.delete('/:slug', brandController_1.deleteBrand);
exports.default = brandsRouter;
//# sourceMappingURL=brandRoute.js.map