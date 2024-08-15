import { Request, Response } from "express"
import Product from "../models/Product";
import mongoose from "mongoose";
import Order from "../models/Order";

export const listOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const id = req.query.id as string; // Get the ID from the query parameters

    let orders;
    if (id) {
      // Extract the last 5 digits of the ID
      const last5Digits = id.slice(-5);

      // Use a regular expression to find orders with IDs ending in the last 5 digits
      orders = await Order.find({ _id: { $regex: `.*${last5Digits}$` } }) 
        .skip(skip)
        .limit(limit)
        .populate('items');
    } else {
      // Otherwise, fetch all orders
      orders = await Order.find()
        .skip(skip)
        .limit(limit)
        .populate('items');
    }

    const total = await Order.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      data: orders,
      currentPage: page,
      totalPages: totalPages,
      totalItems: total,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const showOrder = async (req:Request, res:Response) => {
  try {
    const order = await Order.findOne({ id: req.query.id }).populate('items')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({data:order});
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}
export const createOrder = async (req: Request, res: Response) => {
    try {
      const { customerName, customerPhone,customerEmail,customerAddress,items} = req.body;
      console.log(req.body);
      
      const order = new Order({ name:customerName, phone:customerPhone,email:customerEmail,address:customerAddress,status:"pending",items });
        await order.save();

      res.status(201).json({order, message:"Created"});
    } catch (error:any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'order name or slug must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id =  req.params.id
    const { status } = req.body;
    if (!["pending", "processing", "shipped", "delivered", "cancelled", "returned"].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(id, { status },       
      { new: true, runValidators: true }
    );
    res.status(201).json({ order, message: 'Updated' });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'order name or slug must be unique' });
    }
    res.status(400).json({ message: error.message });
  }
};
export const deleteOrder = async (req:Request, res:Response) => {
  try {
    console.log();
    
    const product = await Order.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // await product.remove();
    res.status(204).json({ message: 'Order Deleted' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


export const UpdateProduct = () => {}

