import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  prices: { type: [Number], required: false },
  glutenFree: { type: Boolean, default: false },
  plateSplitting: { type: Boolean, default: false },
  rawDisclaimer: { type: Boolean, default: false },
});

const menuSubcategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  items: [menuItemSchema],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const menuCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }],
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
});

const locationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const Subcategory = mongoose.model("Subcategory", menuSubcategorySchema);
const Category = mongoose.model("Category", menuCategorySchema);
const Location = mongoose.model("Location", locationSchema);

export { Subcategory, Category, Location };
