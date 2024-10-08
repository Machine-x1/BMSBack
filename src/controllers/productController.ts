import { Request, Response } from "express"
import Product from "../models/Product";
import mongoose from "mongoose";

export const listProduct = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const { search, category, brand, tag } = req.query;
    
    let query: any = {};
    
    if (search) {
      query.name = { $regex: search as string, $options: 'i' };
    }
    
    if (category) {
      let categoryIds: string[];
      if (typeof category === 'string') {
        categoryIds = category.split(",");
          
      } else {
        categoryIds = category as string[];
      }
      const validCategoryIds = categoryIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
      if (validCategoryIds.length > 0) {
        query.category = { $in: validCategoryIds.map((id) => new mongoose.Types.ObjectId(id)) };
      } else {
        return res.status(400).json({ message: 'Invalid category ID(s)' });
      }
    }

    if (brand) {
      let brandIds: string[];
      if (typeof brand === 'string') {
        brandIds = brand.split(",");
          
      } else {
        brandIds = brand as string[];
      }
      const validCategoryIds = brandIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
      if (validCategoryIds.length > 0) {
        query.brand = { $in: validCategoryIds.map((id) => new mongoose.Types.ObjectId(id)) };
      } else {
        return res.status(400).json({ message: 'Invalid Brand ID(s)' });
      }
    }

    
    if (tag) {
      let tags: string[];
      if (typeof tag === 'string') {
        tags = tag.split(",");
          
      } else {
        tags = tag as string[];
      }
      const validTagsIds = tags.filter((id) => mongoose.Types.ObjectId.isValid(id));
      if (validTagsIds.length > 0) {
        query.tag = { $in: validTagsIds.map((id) => new mongoose.Types.ObjectId(id)) };
      } else {
        return res.status(400).json({ message: 'Invalid Brand ID(s)' });
      }
    }
    

    const product = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate('category')
      .populate('brand')
      .populate('tag');

    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      data: product,
      currentPage: page,
      totalPages: totalPages,
      totalItems: total,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const showProduct = async (req:Request, res:Response) => {
  try {
    const category = await Product.findOne({ slug: req.params.slug }).populate('category').populate("brand").populate('tag');
    if (!category) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(category);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}
export const createProduct = async (req: Request, res: Response, uuids: string[]) => {
  
    try {
      const { name, description,origin,tag,dataSheet,model,isFeatuerd,category, brand, quantity } = req.body;
      // let newTag = ""
      // if (tag) {
      //   newTag = tag.split(",")
      // }
      let newTag: any[] = [];
      if (tag) {
        newTag = tag.split(",");
      }
  
      
      const product = new Product({ quantity,tag:newTag, brand, name, description,origin,dataSheet,model,isFeatuerd:Boolean(Number(isFeatuerd)),category, images:uuids });
      await product.save();
      
      
      res.status(201).json({product});
    } catch (error:any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Product name or slug must be unique' });
      }
      res.status(400).json({ message: error.message });
    }
  
  };
export const deleteProduct = async (req:Request, res:Response) => {
  try {
    
    const product = await Product.findOneAndDelete({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // await product.remove();
    res.status(204).json({ message: 'Product Deleted' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


export const UpdateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product name or slug must be unique' });
    }
    res.status(400).json({ message: error.message });
  }
};
