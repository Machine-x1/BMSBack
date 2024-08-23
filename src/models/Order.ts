import mongoose, { Document, Model, Schema, model } from 'mongoose';

// Define a TypeScript interface for the Order document
interface IOrder extends Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  clientOrderId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  createdAt: Date;
  items: {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
  updatedAt: Date;
}

const orderSchema: Schema<IOrder> = new Schema({
  name: {
    type: String,
    required: true,
  },
  clientOrderId: { type: String, required: true, unique: true },
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
    type: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
      }
    }],
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

// // Update updatedAt field before saving
// orderSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Order: Model<IOrder> = model<IOrder>('Order', orderSchema);

export default Order;