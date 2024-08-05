import express, { Request, Response, Router } from "express";
import {  createProduct, deleteProduct, listProduct, showProduct,  } from "../controllers/productController";
import multer, { Multer } from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

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

const productRouter: Router = express.Router();

productRouter.post("/", upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    const uuids: string[] = (req.files as Express.Multer.File[]).map((file) => file.filename);
    await createProduct(req, res, uuids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
});
productRouter.get("/", listProduct);
productRouter.get("/:slug", showProduct);
productRouter.delete("/:slug", deleteProduct);

export { productRouter };