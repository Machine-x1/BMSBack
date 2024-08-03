import { Document, Model, Schema, model } from 'mongoose';
import slugify from 'slugify';

// Define a TypeScript interface for the Brand document
interface IProject extends Document {
  name: string;
  description: string;
  slug: string;
  images:[String]
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const projectSchema: Schema<IProject> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  slug: {
    type: String,
    unique: true
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

// Middleware to generate slug from name before saving the document
projectSchema.pre<IProject>('save', function(next) {
  // 'this' refers to the current document
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

// Define the Brand model
const Project: Model<IProject> = model<IProject>('Project', projectSchema);

export default Project;
