import express from "express";
import {
  addLocation,
  addCategory,
  addSubcategory,
  addItem,
  getLocations,
  getLocationCategories,
  getCategorySubcategories,
  getSubcategoryItems,
  updateLocation,
  updateCategory,
  updateSubcategory,
  updateItem,
  deleteLocation,
  deleteCategory,
  deleteSubcategory,
  deleteItem,
  getAllCategories,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/locations", addLocation);
router.post("/categories", addCategory);
router.post("/subcategories", addSubcategory);
router.post("/items", addItem);

router.get("/locations", getLocations);
router.get("/locations/:locationId/categories", getLocationCategories);
router.get("/categories/:categoryId/subcategories", getCategorySubcategories);
router.get("/subcategories/:subcategoryId/items", getSubcategoryItems);
router.get("/categories", getAllCategories);

router.put("/locations/:locationId", updateLocation);
router.put("/categories/:categoryId", updateCategory);
router.put("/subcategories/:subcategoryId", updateSubcategory);
router.put("/subcategories/:subcategoryId/items/:itemId", updateItem);

router.delete("/locations/:locationId", deleteLocation);
router.delete("/categories/:categoryId", deleteCategory);
router.delete("/subcategories/:subcategoryId", deleteSubcategory);
router.delete("/subcategories/:subcategoryId/items/:itemId", deleteItem);

export default router;
