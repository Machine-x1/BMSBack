import { Document, Model, Schema, model } from 'mongoose';
import slugify from 'slugify';

// Define a TypeScript interface for the Tag document
interface ITags extends Document {
  name: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const tagsSchema: Schema<ITags> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
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
tagsSchema.pre<ITags>('save', function(next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

// Define the Tag model
const Tag: Model<ITags> = model<ITags>('Tag', tagsSchema);

export default Tag;
