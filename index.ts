import express, { json } from "express";
import config from "./src/config";
import { productRouter } from "./src/routes/productRoute";
import connectToDatabase from "./src/config/DBConnect";
import categoryRouter from "./src/routes/categoryRoute";
import brandsRouter from "./src/routes/brandRoute";
import { projectRouter } from "./src/routes/projectRoute";

const app = express();
app.use(json())
connectToDatabase()
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/brand", brandsRouter);
app.use("/project", projectRouter);

app.listen(8000 || process.env.PORT, () => {
  console.log("Server is running on port " + 8000 || process.env.PORT);
});
