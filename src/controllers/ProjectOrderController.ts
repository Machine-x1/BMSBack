import { Request, Response } from "express";
import ProjectOrder from "../models/ProjectsOrders";

export const createProjectOrder = async (req: Request, res: Response, uuid:string[]) => {
  
  try {
      const { name, phone,email,compnay,projectType} = req.body;
      console.log(req.body);
      
      const projectOrder = new ProjectOrder({name,files:uuid, phone, email, compnay, projectType, status:"Not Started"});
        await projectOrder.save();

      res.status(201).json({projectOrder, message:"Created"});
    } catch (error:any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'order name or slug must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  
};


export const updateStatusProject = async (req: Request, res: Response) => {
  try {
    const id =  req.params.id
    const { status } = req.body;
    if (!["Not Started", "In Progress", "Under Review", "Completed", "On Hold", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await ProjectOrder.findByIdAndUpdate(id, { status },       
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
export const deleteOrderProject = async (req:Request, res:Response) => {
  try {
    
    const product = await ProjectOrder.findOneAndDelete({ id: req.query.id });
    if (!product) {
      return res.status(404).json({ message: 'Project Order not found' });
    }
    // await product.remove();
    res.status(204).json({ message: 'Project Order Deleted' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const listProjectOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (id) {
      // Search for order by ID
      const order = await ProjectOrder.findById(id)

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      return res.status(200).json(order);
    } else {
      // List all orders with pagination
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const orders = await ProjectOrder.find()
        .skip(skip)
        .limit(limit)
        .populate('items');

      const total = await ProjectOrder.countDocuments();
      const totalPages = Math.ceil(total / limit);

      return res.status(200).json({
        data: orders,
        currentPage: page,
        totalPages: totalPages,
        totalItems: total,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};