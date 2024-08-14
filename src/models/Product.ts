const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    text: true, 

  },
  description: {
    type: String,
    required: true,
    text: true, 

  },
  images: {
    type: [String],
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  dataSheet: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },  
  quantity: {
    type: String,
    required: true
  },
  isFeatuerd: {
    type: Boolean,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }, 
  tag: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    }
  ], 
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    unique: true
  },
});


productSchema.pre('save', function(next:any) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

productSchema.index({ name: 'text', description: 'text' }); // Create text index

const Product = mongoose.model('Product', productSchema);

export default Product;


