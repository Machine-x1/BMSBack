"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        const fileExtension = path_1.default.extname(file.originalname);
        const uuid = (0, uuid_1.v4)();
        cb(null, `${uuid}${fileExtension}`);
    }
});
const upload = (0, multer_1.default)({ storage });
const productRouter = express_1.default.Router();
exports.productRouter = productRouter;
productRouter.post("/", upload.array('images', 10), async (req, res) => {
    try {
        const uuids = req.files.map((file) => file.filename);
        await (0, productController_1.createProduct)(req, res, uuids);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product' });
    }
});
productRouter.get("/", productController_1.listProduct);
productRouter.get("/:slug", productController_1.showProduct);
productRouter.delete("/:slug", productController_1.deleteProduct);
//# sourceMappingURL=productRoute.js.map