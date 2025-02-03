import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

const menuSubcategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  items: [menuItemSchema],
});

const menuCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  subcategories: [menuSubcategorySchema],
});

const locationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  categories: [menuCategorySchema],
});

export default mongoose.model('Location', locationSchema);
