import { Location, Category, Subcategory } from "../models/menu.model.js";

export const addLocation = async (req, res, next) => {
  const { title, address, city, postalCode, phoneNumber, emailAddress } =
    req.body;

  try {
    const existingLocation = await Location.findOne({
      $or: [{ title }, { address }],
    });

    if (existingLocation) {
      return res.status(409).json({
        success: false,
        message: "A location with the same title or address already exists.",
      });
    }

    const newLocation = new Location({
      title,
      address,
      city,
      postalCode,
      phoneNumber,
      emailAddress,
    });

    await newLocation.save();

    res.status(201).json({
      success: true,
      message: "Location added successfully!",
      location: newLocation,
    });
  } catch (error) {
    next(error);
  }
};

export const addCategory = async (req, res, next) => {
  const { title, locations } = req.body;

  try {
    if (locations && locations.length > 0) {
      const validLocations = await Location.find({ _id: { $in: locations } });

      if (validLocations.length !== locations.length) {
        return res.status(400).json({
          success: false,
          message: "One or more locations are invalid.",
        });
      }
    }

    const newCategory = new Category({ title, locations });
    await newCategory.save();

    await Location.updateMany(
      { _id: { $in: locations } },
      { $push: { categories: newCategory._id } }
    );

    res.status(201).json({
      success: true,
      message: "Category added successfully!",
      category: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const addSubcategory = async (req, res, next) => {
  const { title, description, categories } = req.body;

  try {
    if (categories && categories.length > 0) {
      const validCategories = await Category.find({ _id: { $in: categories } });

      if (validCategories.length !== categories.length) {
        return res.status(400).json({
          success: false,
          message: "One or more categories are invalid.",
        });
      }
    }

    const newSubcategory = new Subcategory({ title, description, categories });
    await newSubcategory.save();

    await Category.updateMany(
      { _id: { $in: categories } },
      { $push: { subcategories: newSubcategory._id } }
    );

    res.status(201).json({
      success: true,
      message: "Subcategory added successfully!",
      subcategory: newSubcategory,
    });
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  const {
    subcategoryId,
    title,
    description,
    prices,
    glutenFree,
    plateSplitting,
    rawDisclaimer,
  } = req.body;

  try {
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const newItem = {
      title,
      description,
      prices,
      glutenFree,
      plateSplitting,
      rawDisclaimer,
    };

    subcategory.items.push(newItem);
    await subcategory.save();

    res.status(201).json({
      success: true,
      message: "Item added successfully!",
      subcategory,
    });
  } catch (error) {
    next(error);
  }
};

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLocationCategories = async (req, res) => {
  try {
    const { locationId } = req.params;

    const validLocation = await Location.findById(locationId).populate(
      "categories"
    );
    if (!validLocation) {
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });
    }

    res.json(validLocation.categories);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategorySubcategories = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const validCategory = await Category.findById(categoryId).populate(
      "subcategories"
    );
    if (!validCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.json(validCategory.subcategories);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSubcategoryItems = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    const validSubcategory = await Subcategory.findById(subcategoryId);
    if (!validSubcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });
    }

    res.json(validSubcategory.items);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLocation = async (req, res, next) => {
  const { locationId } = req.params;
  const { title, address, city, postalCode, phoneNumber, emailAddress } =
    req.body;

  if (!title || !address) {
    return res
      .status(400)
      .json({ success: false, message: "Fields cannot be empty" });
  }

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      {
        $set: {
          title,
          address,
          city,
          postalCode,
          phoneNumber,
          emailAddress,
        },
      },
      { new: true }
    );

    if (!updatedLocation) {
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });
    }

    res.status(200).json({
      success: true,
      message: "Location updated successfully!",
      updatedLocation,
    });
  } catch (error) {
    next(error);
  }
};
export const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const { title, locations } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "You must provide a category title.",
    });
  }

  try {
    const currentCategory = await Category.findById(categoryId);
    if (!currentCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const locationsToRemove = currentCategory.locations.filter(
      (locId) => !locations.includes(locId.toString())
    );

    const locationsToAdd = locations.filter(
      (locId) => !currentCategory.locations.map(String).includes(locId)
    );

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: { title, locations: locations || [] },
      },
      { new: true }
    );

    if (locationsToRemove.length > 0) {
      await Location.updateMany(
        { _id: { $in: locationsToRemove } },
        { $pull: { categories: categoryId } }
      );
    }
    if (locationsToAdd.length > 0) {
      await Location.updateMany(
        { _id: { $in: locationsToAdd } },
        { $push: { categories: categoryId } }
      );
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully!",
      updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

import mongoose from "mongoose";

export const updateSubcategory = async (req, res, next) => {
  const { subcategoryId } = req.params;
  const { title, description, categories } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "You must provide a title for the subcategory.",
    });
  }

  try {
    const currentSubcategory = await Subcategory.findById(subcategoryId);
    if (!currentSubcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const validCategories = (categories || []).filter((catId) =>
      mongoose.Types.ObjectId.isValid(catId)
    );

    const categoriesToRemove = currentSubcategory.categories.filter(
      (catId) => !validCategories.includes(catId.toString())
    );

    const categoriesToAdd = validCategories.filter(
      (catId) => !currentSubcategory.categories.map(String).includes(catId)
    );

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      {
        $set: {
          title: title,
          description: description,
          categories: validCategories,
        },
      },
      { new: true }
    );

    if (categoriesToRemove.length > 0) {
      await Category.updateMany(
        { _id: { $in: categoriesToRemove } },
        { $pull: { subcategories: subcategoryId } }
      );
    }

    if (categoriesToAdd.length > 0) {
      await Category.updateMany(
        { _id: { $in: categoriesToAdd } },
        { $push: { subcategories: subcategoryId } }
      );
    }

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully!",
      updatedSubcategory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  const { subcategoryId, itemId } = req.params;
  const {
    title,
    description,
    prices,
    glutenFree,
    plateSplitting,
    rawDisclaimer,
  } = req.body;

  try {
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });
    }

    const item = subcategory.items.id(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    if (title) item.title = title;
    if (description) item.description = description;
    if (prices) item.prices = prices;
    if (glutenFree !== undefined) item.glutenFree = glutenFree;
    if (plateSplitting !== undefined) item.plateSplitting = plateSplitting;
    if (rawDisclaimer !== undefined) item.rawDisclaimer = rawDisclaimer;

    await subcategory.save();

    res.status(200).json({
      success: true,
      message: "Item updated successfully!",
      updatedItem: item,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  const { locationId } = req.params;

  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });
    }

    await Category.updateMany(
      { locations: locationId },
      { $pull: { locations: locationId } }
    );

    await Location.findByIdAndDelete(locationId);

    res.status(200).json({
      success: true,
      message: "Location deleted successfully and removed from categories!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await Location.updateMany(
      { categories: categoryId },
      { $pull: { categories: categoryId } }
    );

    await Subcategory.updateMany(
      { categories: categoryId },
      { $pull: { categories: categoryId } }
    );

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message:
        "Category deleted successfully and removed from locations and subcategories!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubcategory = async (req, res, next) => {
  const { subcategoryId } = req.params;

  try {
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });
    }

    await Category.updateMany(
      { subcategories: subcategoryId },
      { $pull: { subcategories: subcategoryId } }
    );

    await Subcategory.findByIdAndDelete(subcategoryId);

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully and removed from categories!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  const { subcategoryId, itemId } = req.params;

  try {
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });
    }

    const itemIndex = subcategory.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    subcategory.items.splice(itemIndex, 1);
    await subcategory.save();

    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
