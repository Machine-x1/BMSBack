import { Document, Model, Schema, model } from 'mongoose';
const mongoose = require('mongoose');

// Define a TypeScript interface for the Order document
interface IProjectOrder extends Document {
  name: string;
  phone: string;
  email: string;
  compnay: string;
  projectType: string;
  files: string[]
  status: "Not Started" | "In Progress" | "Under Review" | "Completed" | "On Hold" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const projectsOrderSchema: Schema<IProjectOrder> = new Schema({
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
  compnay: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
    required: true
  }, 
  files: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Not Started", "In Progress", "Under Review", "Completed", "On Hold", "Cancelled"]
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

const ProjectOrder: Model<IProjectOrder> = model<IProjectOrder>('ProjectOrder', projectsOrderSchema);

export default ProjectOrder;