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
    const clientOrderId = req.query.order_id as string; // Get the clientOrderId from the query parameters

    let orders;
    if (clientOrderId) {
      orders = await Order.find({ clientOrderId })
        .skip(skip)
        .limit(limit)
        .populate({ path: 'items.product' });
    } else {
      orders = await Order.find()
        .skip(skip)
        .limit(limit)
        .populate({ path: 'items.product' });
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

    const {id} = req.params
    const order = await Order.findOne({ _id:id}).populate({ path: 'items.product' }); // Populate the product field
    
    console.log(order);

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
      
      let clientOrderId: string;
      let order: any;
      do {
        clientOrderId = Math.floor(10000 + Math.random() * 90000).toString();
        order = await Order.findOne({ clientOrderId });
      } while (order);

      const newOrder = new Order({ clientOrderId, name:customerName, phone:customerPhone,email:customerEmail,address:customerAddress,status:"pending",items });
        await newOrder.save();

      res.status(201).json({order:newOrder, message:"Created"});
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
      
    const product = await Order.findOneAndDelete({ _id: req.params.id });
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

