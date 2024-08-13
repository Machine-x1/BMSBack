import express, { json } from "express";
import config from "./src/config";
import { productRouter } from "./src/routes/productRoute";
import connectToDatabase from "./src/config/DBConnect";
import categoryRouter from "./src/routes/categoryRoute";
import brandsRouter from "./src/routes/brandRoute";
import { projectRouter } from "./src/routes/projectRoute";
var path = require('path');
import cors from 'cors';
import orderRouter from "./src/routes/ordersRoute";
import { projectOrderRoute } from "./src/routes/projectOrderRoute";
import contactRoute from "./src/routes/contactRoute";
import tagRouter from "./src/routes/tagRoute";
import authRouter from "./src/routes/authRoute";
import { verifyToken } from "./src/controllers/authController";

const app = express();
app.use(json())
connectToDatabase()
app.use(cors());

// verifyToken middlware
app.use("/public", express.static("public"));

app.use((req, res, next) => {
  if (req.path.startsWith('/auth')) {
    return next();
  }
  verifyToken(req, res, next);
});

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/brand", brandsRouter);
app.use("/project", projectRouter);
app.use("/order", orderRouter);
app.use("/project-order", projectOrderRoute);
app.use("/contact", contactRoute);
app.use("/tag", tagRouter);
app.use("/auth", authRouter);

app.listen(8000 || process.env.PORT, () => {
  console.log("Server is running on port " + 8000 || process.env.PORT);
});
