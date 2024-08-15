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
import { productAPIRoute } from "./src/routes/api/productAPIRoute";
import categoryAPIRoute from "./src/routes/api/categoryAPIRoute";
import brandAPIRoute from "./src/routes/api/brandAPIRoute";
import orderAPIRouter from "./src/routes/api/ordersAPIRoute";
import { projectOrderAPIRoute } from "./src/routes/api/projectOrderAPIRoute";
import contactAPIRoute from "./src/routes/api/contactAPIRoute";
import { rateLimit } from 'express-rate-limit'

const app = express();
app.use(json())
connectToDatabase()
app.use(cors());

app.use("/public", express.static("public"));



const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, 
	limit: 500, 
	standardHeaders: 'draft-7',
  legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
  message: async (req, res) => {
			return {status:429, message:'Too many requests from this IP, please try again later.'}
	},

})

app.use(limiter)

// });
app.use("/dashboard", (req, res, next) => {
  console.log(req.headers, "NEW");
  
  verifyToken(req, res, next);
});



app.use("/dashboard/product", productRouter);
app.use("/dashboard/category", categoryRouter);
app.use("/dashboard/brand", brandsRouter);
app.use("/dashboard/project", projectRouter);
app.use("/dashboard/order", orderRouter);
app.use("/dashboard/project-order", projectOrderRoute);
app.use("/dashboard/contact", contactRoute);
app.use("/dashboard/tag", tagRouter);
app.use("/auth", authRouter);

app.use("/api/product", productAPIRoute);
app.use("/api/category", categoryAPIRoute);
app.use("/api/brand", brandAPIRoute);
app.use("/api/order", orderAPIRouter);
app.use("/api/project-order", projectOrderAPIRoute);
app.use("/api/contact", contactAPIRoute);
app.use("/api/tag", tagRouter);
// app.use("/api/project", );
// app.use("/api/auth", authRouter);

app.listen(8000 || process.env.PORT, () => {
  console.log("Server is running on port " + 8000 || process.env.PORT);
});
