import express from 'express';
import {
  addLocation,
  deleteLocation,
  updateLocation,
} from '../controllers/menu.controller.js';
import {
  addNewCategories,
  deleteCategory,
  updateCategory,
} from '../controllers/menu.controller.js';
import {
  addNewSubcategories,
  updateSubCategory,
  deleteSubCategory,
} from '../controllers/menu.controller.js';
import { addItems, deleteItem } from '../controllers/menu.controller.js';
import { getLocations } from '../controllers/menu.controller.js';
import { getLocationsCategories } from '../controllers/menu.controller.js';
import { getSubcategories } from '../controllers/menu.controller.js';

const router = express();

router.post('/location', addLocation);
router.post('/category', addNewCategories);
router.post('/subcategory', addNewSubcategories);
router.post('/item', addItems);

router.get('/getLocations', getLocations);
router.get('/getLocationsCategories/:location', getLocationsCategories);
router.get('/menuItems/:location/:category', getSubcategories);

router.delete('/deleteLocation/:locationId', deleteLocation);
router.delete('/deleteCategory', deleteCategory);
router.delete('/deleteSubCategory', deleteSubCategory);
router.delete('/deleteItem', deleteItem);

router.post('/updateLocation', updateLocation);
router.post('/updateCategory', updateCategory);
router.post('/updateSubCategory', updateSubCategory);

export default router;
