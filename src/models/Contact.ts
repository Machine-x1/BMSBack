import { Document, Model, Schema, model } from 'mongoose';
const mongoose = require('mongoose');

// Define a TypeScript interface for the Contact document
interface IContact extends Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema: Schema<IContact> = new Schema({
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
 message: {
    type: String,
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

const Contact: Model<IContact> = model<IContact>('Contact', contactSchema);

export default Contact;