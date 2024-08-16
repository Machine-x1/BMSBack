import { Request, Response } from "express"
import Product from "../models/Product";
import mongoose from "mongoose";
import Order from "../models/Order";
import Contact from "../models/Contact";

export const listContact = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    

    const orders = await Contact.find()
      .skip(skip)
      .limit(limit)
    
    const total = await Contact.countDocuments();
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
export const showContact = async (req:Request, res:Response) => {
  try {
    const order = await Contact.findOne({ id: req.query.id })

    if (!order) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({data:order});
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}
export const createContact = async (req: Request, res: Response) => {
    try {
      const { name, phone, email,address,message} = req.body;
      console.log(req.body);
      
      const contact = new Contact({ name, phone, email,address,message });
        await contact.save();

      res.status(201).json({contact, message:"Created"});
    } catch (error:any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'order name or slug must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  
};

export const deleteContact = async (req:Request, res:Response) => {
  try {
    
    const product = await Contact.findOneAndDelete({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).json({ message: 'Contact Deleted' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


export const UpdateProduct = () => {}

