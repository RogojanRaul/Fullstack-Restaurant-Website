import Location from '../models/menu.model.js';

export const addLocation = async (req, res, next) => {
  const { title, address } = req.body;

  try {
    const newLocation = new Location({ title, address });
    const validNewLocation = await Location.findOne({
      $or: [{ title }, { address }],
    });

    if (validNewLocation) {
      return res.status(409).json({
        success: false,
        message: 'Similar Location already exists',
      });
    }

    await newLocation.save();
    res.status(201).json({ message: 'Location added successfully!' });
  } catch (error) {
    next(error);
  }
};

export const addNewCategories = async (req, res, next) => {
  const { location, categoryName } = req.body;

  try {
    const validLocation = await Location.findOne({ title: location });

    if (!validLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const newCategory = { categoryName };

    validLocation.categories.push(newCategory);
    await validLocation.save();

    res.status(200).json({ message: 'Category added successfully!' });
  } catch (error) {
    next(error);
  }
};

export const addNewSubcategories = async (req, res, next) => {
  const { location, category, title, description } = req.body;

  try {
    const validLocation = await Location.findOne({ title: location });
    const validCategory = validLocation.categories.find(
      (cat) => cat.categoryName === category
    );

    if (!validLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }
    if (!validCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newSubcategory = {
      title,
      description,
    };

    validCategory.subcategories.push(newSubcategory);
    await validLocation.save();

    res.status(200).json({ message: 'Subcategory added successfully!' });
  } catch (error) {
    next(error);
  }
};

export const addItems = async (req, res, next) => {
  const { location, category, subcategory, title, description, price } =
    req.body;

  try {
    const validLocation = await Location.findOne({ title: location });
    const validCategory = validLocation.categories.find(
      (cat) => cat.categoryName === category
    );
    const validSubcategory = validCategory.subcategories.find(
      (subcat) => subcat.title === subcategory
    );

    if (!validLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }
    if (!validCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (!validSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const newItem = {
      title,
      description,
      price,
    };

    validSubcategory.items.push(newItem);
    await validLocation.save();

    res.status(200).json({ message: 'Item added successfully!' });
  } catch (error) {
    next(error);
  }
};

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({}, 'title address');
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLocationsCategories = async (req, res) => {
  try {
    const { location } = req.params;
    const validLocation = await Location.findOne(
      { title: location },
      'categories.categoryName categories._id'
    );

    if (!validLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json(validLocation.categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubcategories = async (req, res) => {
  try {
    const { location, category } = req.params;

    if (!location || !category) {
      return res
        .status(400)
        .json({ error: 'Location and category are required' });
    }

    const validLocation = await Location.findOne({ title: location });

    if (!validLocation) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const validCategory = validLocation.categories.find(
      (cat) => cat.categoryName === category
    );

    if (!validCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(validCategory.subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLocation = async (req, res, next) => {
  const { locationId } = req.params;

  try {
    await Location.findByIdAndDelete({ _id: locationId });
    res.status(200).json('Location was deleted');
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  const { id, title, address } = req.body;

  if (!title || !address) {
    res.status(404).json({ message: 'Fields cannot be empty' });
    return;
  }

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          address,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedLocation);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { location, categoryName } = req.body;

  try {
    const validLocation = await Location.findOne({ title: location });

    if (!validLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const leftCategories = validLocation.categories.filter(
      (category) => category.categoryName !== categoryName
    );

    if (leftCategories.length === validLocation.categories.length) {
      return res.status(404).json({ message: 'Category not found' });
    }

    validLocation.categories = leftCategories;

    await validLocation.save();

    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  const { location, oldCategoryName, newCategoryName } = req.body;

  if (!newCategoryName) {
    res
      .status(404)
      .json({ message: 'You need to provide an new name for the category' });
    return;
  }

  try {
    const validLocation = await Location.findOne({ title: location });

    if (!validLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const category = validLocation.categories.find(
      (category) => category.categoryName === oldCategoryName
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.categoryName = newCategoryName;

    await validLocation.save();

    res.status(200).json({ message: 'Category updated successfully!' });
  } catch (error) {
    next(error);
  }
};

export const updateSubCategory = async (req, res, next) => {
  const { location, category, oldTitle, newTitle, newDescription } = req.body;

  if (!newTitle && !newDescription) {
    res.status(404).json({
      message: 'You need to provide at least a new title or a new description',
    });
    return;
  }

  try {
    const validLocation = await Location.findOne({ title: location });

    if (!validLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const validCategory = validLocation.categories.find(
      (cat) => cat.categoryName === category
    );

    if (!validCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = validCategory.subcategories?.find(
      (subcategory) => subcategory.title === oldTitle
    );

    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    if (newTitle) subCategory.title = newTitle;
    if (newDescription) subCategory.description = newDescription;

    await validLocation.save();
    res.status(200).json({
      message: 'Subcategory updated successfully',
      updatedSubCategory: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubCategory = async (req, res, next) => {
  const { location, category, title } = req.body;

  try {
    if (!location || !category || !title) {
      return res
        .status(400)
        .json({ message: 'Location, category, and title are required.' });
    }

    const validLocation = await Location.findOne({ title: location });
    if (!validLocation) {
      return res.status(404).json({ message: 'Location not found.' });
    }

    const validCategory = validLocation.categories.find(
      (cat) =>
        cat.categoryName.toLowerCase().trim() === category.toLowerCase().trim()
    );
    if (!validCategory) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    const subCategoryIndex = validCategory.subcategories.findIndex(
      (subcategory) => subcategory.title === title
    );
    if (subCategoryIndex === -1) {
      return res.status(404).json({ message: 'Subcategory not found.' });
    }

    validCategory.subcategories.splice(subCategoryIndex, 1);

    await validLocation.save();

    return res.status(200).json({
      message: 'Subcategory deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  const { location, category, subcategory, itemId } = req.body;

  try {
    const validLocation = await Location.findOne({ title: location });
    if (!validLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const validCategory = validLocation.categories.find(
      (cat) => cat.categoryName === category
    );
    if (!validCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const validSubcategory = validCategory.subcategories.find(
      (subcat) => subcat.title === subcategory
    );
    if (!validSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const itemIndex = validSubcategory.items.findIndex(
      (item) => item.id === itemId
    );
    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found' });
    }

    validSubcategory.items.splice(itemIndex, 1);

    await validLocation.save();

    return res.status(200).json({
      message: 'Item deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
