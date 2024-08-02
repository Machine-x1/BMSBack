import { Document, Model, Schema, model } from 'mongoose';
import slugify from 'slugify';

// Define a TypeScript interface for the Category document
interface ICategory extends Document {
  name: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const categorySchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
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
categorySchema.pre<ICategory>('save', function(next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

// Define the Category model
const Category: Model<ICategory> = model<ICategory>('Category', categorySchema);

export default Category;
