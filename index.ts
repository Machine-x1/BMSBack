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

const app = express();
app.use(json())
connectToDatabase()
app.use(cors());


app.use("/public", express.static("public"));
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/brand", brandsRouter);
app.use("/project", projectRouter);
app.use("/order", orderRouter);
app.use("/project-order", projectOrderRoute);
app.use("/contact", contactRoute);

app.listen(8000 || process.env.PORT, () => {
  console.log("Server is running on port " + 8000 || process.env.PORT);
});
