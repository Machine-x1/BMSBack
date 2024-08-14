import express, { Request, Response, Router } from "express";
import multer, { Multer } from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { listProduct, showProduct } from "../../controllers/productController";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const fileExtension = path.extname(file.originalname);
    const uuid = uuidv4();
    cb(null, `${uuid}${fileExtension}`);
  }
});

const upload: Multer = multer({ storage });

const productAPIRoute: Router = express.Router();

productAPIRoute.get("/", listProduct);
productAPIRoute.get("/:slug", showProduct);

export { productAPIRoute };