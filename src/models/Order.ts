import { Document, Model, Schema, model } from 'mongoose';
const mongoose = require('mongoose');

// Define a TypeScript interface for the Order document
interface IOrder extends Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  createdAt: Date;
  items:[]
  updatedAt: Date;
}

const orderSchema: Schema<IOrder> = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled", "returned"]
  },
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Order: Model<IOrder> = model<IOrder>('Order', orderSchema);

export default Order;