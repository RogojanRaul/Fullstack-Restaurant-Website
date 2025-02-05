"use client";
import { deleteReq, get, post, put } from "@/utils/fetch";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "@/components/Modal";
import { IoIosArrowForward } from "react-icons/io";
import { MenuCategory, MenuItem, MenuSubcategory } from "@/types/menuTypes";

const MenuItemsPage = () => {
  const [menuSubcategories, setMenuSubcategories] = useState<any>([]);
  const [error, setError] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);

  const searchParams = useSearchParams();
  const [allCategories, setAllCategories] = useState<MenuCategory[]>([]);

  const selectedLocation = searchParams.get("location");
  const selectedCategory = searchParams.get("category");
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);

  const [openAddNewSubCategoryModal, setOpenAddNewSubCategoryModal] =
    useState(false);
  const [addNewSubCategoryData, setAddNewSubCategoryData] =
    useState<MenuSubcategory>({
      _id: "",
      title: "",
      description: "",
      items: [],
      categories: [selectedCategory || ""],
    });

  const [openUpdateSubCategoryModal, setOpenUpdateSubCategoryModal] =
    useState<any>(false);
  const [updateSubCategoryData, setUpdateSubCategoryData] = useState<any>({
    subcategoryId: "",
    newTitle: "",
    newDescription: "",
    categories: [],
  });

  const [openDeleteSubCategoryModal, setOpenDeleteSubCategoryModal] =
    useState(false);
  const [deleteSubCategoryData, setDeleteSubCategoryData] = useState({
    subcategoryId: "",
    title: "",
    categories: [],
  });

  const [openUpdateItemModal, setOpenUpdateItemModal] = useState(false);
  const [updateItemData, setUpdateItemData] = useState<
    MenuItem & { subcategoryId: string }
  >({
    _id: "",
    title: "",
    description: "",
    prices: [],
    glutenFree: false,
    plateSplitting: false,
    rawDisclaimer: false,
    subcategoryId: "",
  });

  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [addItemData, setAddItemData] = useState<
    MenuItem & { subcategoryId: string }
  >({
    _id: "",
    title: "",
    description: "",
    prices: [],
    glutenFree: false,
    plateSplitting: false,
    rawDisclaimer: false,
    subcategoryId: "",
  });

  const [openDeleteItemModal, setOpenDeleteModal] = useState(false);
  const [deleteItemData, setDeleteItemData] = useState({
    location: selectedLocation,
    category: selectedCategory,
    subcategory: "",
    itemId: "",
    itemTitle: "",
  });

  const openUpdateItem = (subcategory: any, item: any) => {
    setOpenUpdateItemModal(true);
    setUpdateItemData({
      _id: item._id,
      title: item.title,
      description: item.description || "",
      prices: item.prices || [],
      glutenFree: item.glutenFree || false,
      plateSplitting: item.plateSplitting || false,
      rawDisclaimer: item.rawDisclaimer || false,
      subcategoryId: subcategory._id,
    });
  };

  const closeUpdateItem = () => {
    setOpenUpdateItemModal(false);
    setUpdateItemData({
      _id: "",
      title: "",
      description: "",
      prices: [],
      glutenFree: false,
      plateSplitting: false,
      rawDisclaimer: false,
      subcategoryId: "",
    });
  };

  const updateItem = async () => {
    try {
      await put({
        url: `/api/menu/subcategories/${updateItemData.subcategoryId}/items/${updateItemData._id}`,
        body: updateItemData,
      });

      closeUpdateItem();
      setError("");
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to update item");
      closeUpdateItem();
    }
  };

  const openDeleteItem = (subcategory: any, item: any) => {
    setOpenDeleteModal(true);
    setDeleteItemData({
      location: selectedLocation,
      category: selectedCategory,
      subcategory: subcategory._id,
      itemId: item._id,
      itemTitle: item.title,
    });
  };

  const closeDeleteItem = () => {
    setOpenDeleteModal(false);
    setDeleteItemData({
      location: selectedLocation,
      category: selectedCategory,
      subcategory: "",
      itemId: "",
      itemTitle: "",
    });
  };

  const deleteItem = async () => {
    try {
      await deleteReq({
        url: `/api/menu/subcategories/${deleteItemData.subcategory}/items/${deleteItemData.itemId}`,
      });

      closeDeleteItem();
      setError("");
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to delete item");
      closeDeleteItem();
    }
  };

  const openAddItem = (subcategory: any) => {
    setOpenAddItemModal(true);
    setAddItemData({
      _id: "",
      title: "",
      description: "",
      prices: [],
      glutenFree: false,
      plateSplitting: false,
      rawDisclaimer: false,
      subcategoryId: subcategory._id,
    });
  };

  const closeAddItem = () => {
    setOpenAddItemModal(false);
    setAddItemData({
      _id: "",
      title: "",
      description: "",
      prices: [],
      glutenFree: false,
      plateSplitting: false,
      rawDisclaimer: false,
      subcategoryId: "",
    });
  };

  const addNewItem = async () => {
    try {
      await post({ url: "/api/menu/items", body: addItemData });
      closeAddItem();
      setError("");
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to add item");
      closeAddItem();
    }
  };

  const openAddNewSubcategory = () => {
    setOpenAddNewSubCategoryModal(true);
    setAddNewSubCategoryData({
      _id: "",
      title: "",
      description: "",
      items: [],
      categories: [selectedCategory || ""],
    });
  };

  const closeAddNewSubCategory = () => {
    setOpenAddNewSubCategoryModal(false);
    setAddNewSubCategoryData({
      _id: "",
      title: "",
      description: "",
      items: [],
      categories: [selectedCategory || ""],
    });
  };

  const addNewSubCategory = async () => {
    try {
      const payload = {
        title: addNewSubCategoryData.title,
        description: addNewSubCategoryData.description,
        categories: addNewSubCategoryData.categories,
      };

      await post({ url: "/api/menu/subcategories", body: payload });

      closeAddNewSubCategory();
      setError("");
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to add subcategory");
      closeAddNewSubCategory();
    }
  };
  const openUpdateSubcategory = (subcategory: any) => {
    setOpenUpdateSubCategoryModal(true);
    setUpdateSubCategoryData({
      subcategoryId: subcategory._id,
      newTitle: subcategory.title,
      newDescription: subcategory.description,
      categories: subcategory.categories || [],
    });
  };

  const closeUpdateSubcategory = () => {
    setOpenUpdateSubCategoryModal(false);
    setUpdateSubCategoryData({
      subcategoryId: "",
      newTitle: "",
      newDescription: "",
      categories: [],
    });
  };
  const updateSubcategory = async () => {
    try {
      const payload = {
        title: updateSubCategoryData.newTitle,
        description: updateSubCategoryData.newDescription,
        categories: updateSubCategoryData.categories,
      };

      await put({
        url: `/api/menu/subcategories/${updateSubCategoryData.subcategoryId}`,
        body: payload,
      });

      closeUpdateSubcategory();
      setError("");
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to update subcategory");
      closeUpdateSubcategory();
    }
  };

  const getSubcategories = async () => {
    if (!selectedLocation || !selectedCategory) return;

    try {
      const response = await get({
        url: `/api/menu/categories/${selectedCategory}/subcategories`,
      });

      if (Array.isArray(response)) {
        setMenuSubcategories(response);
      } else {
        console.error("Invalid subcategories response:", response);
        setMenuSubcategories([]);
      }
    } catch (error) {
      setError("Can't find subcategories");
      console.log(error);
    }
  };

  const openDeleteSubCategory = (subcategory: any) => {
    setOpenDeleteSubCategoryModal(true);
    setDeleteSubCategoryData({
      subcategoryId: subcategory._id,
      title: subcategory.title,
      categories: subcategory.categories || [],
    });
  };

  const closeDeleteSubCategory = () => {
    setOpenDeleteSubCategoryModal(false);
    setDeleteSubCategoryData({
      subcategoryId: "",
      title: "",
      categories: [],
    });
  };

  const deleteSubCategory = async () => {
    try {
      await deleteReq({
        url: `/api/menu/subcategories/${deleteSubCategoryData.subcategoryId}`,
      });

      closeDeleteSubCategory();
      setError("");
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to delete subcategory");
      closeDeleteSubCategory();
    }
  };

  useEffect(() => {
    getSubcategories();
  }, [refreshKey]);

  const fetchCategories = async () => {
    try {
      const response = await get({
        url: `/api/menu/categories`,
      });

      if (Array.isArray(response)) {
        setAllCategories(response);

        const category = response.find((cat) => cat._id === selectedCategory);
        if (category) {
          setSelectedCategoryName(category.title);
        } else {
          setSelectedCategoryName(null);
        }
      } else {
        console.error("Invalid categories response:", response);
        setAllCategories([]);
        setSelectedCategoryName(null);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setAllCategories([]);
      setSelectedCategoryName(null);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Menu Categories</h1>
        </div>
      </header>

      <Modal isOpen={openAddNewSubCategoryModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Add new Subcategory
          </h1>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="name" className="text-black font-semibold">
              Subcategory Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter subcategory name"
              value={addNewSubCategoryData.title}
              onChange={(e) => {
                setAddNewSubCategoryData({
                  ...addNewSubCategoryData,
                  title: e.target.value,
                });
              }}
              className="bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full"
            />
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="description" className="text-black font-semibold">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={addNewSubCategoryData.description}
              onChange={(e) => {
                setAddNewSubCategoryData({
                  ...addNewSubCategoryData,
                  description: e.target.value,
                });
              }}
              className="h-[100px] bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full"
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-black font-semibold">
              Select Categories
            </label>
            {allCategories.length > 0 ? (
              allCategories.map((category) => (
                <div key={category._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={category._id}
                    checked={addNewSubCategoryData.categories.includes(
                      category._id
                    )}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setAddNewSubCategoryData((prev) => ({
                        ...prev,
                        categories: isChecked
                          ? [...prev.categories, category._id]
                          : prev.categories.filter((id) => id !== category._id),
                      }));
                    }}
                  />
                  <label htmlFor={category._id} className="text-black">
                    {category.title}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No categories available</p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black"
              onClick={closeAddNewSubCategory}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 px-5 py-2 font-semibold rounded-md hover:bg-indigo-500 duration-200"
              onClick={addNewSubCategory}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openUpdateSubCategoryModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Update Subcategory
          </h1>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="newName" className="text-black font-semibold">
              New Subcategory Name
            </label>
            <input
              name="newName"
              type="text"
              value={updateSubCategoryData.newTitle}
              className="bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full"
              onChange={(e) => {
                setUpdateSubCategoryData({
                  ...updateSubCategoryData,
                  newTitle: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="description" className="text-black font-semibold">
              New Subcategory Description
            </label>
            <textarea
              name="description"
              value={updateSubCategoryData.newDescription}
              className="h-[100px] bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full"
              onChange={(e) => {
                setUpdateSubCategoryData({
                  ...updateSubCategoryData,
                  newDescription: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-black font-semibold">
              Select Categories
            </label>
            {allCategories.length > 0 ? (
              allCategories.map((category) => (
                <div key={category._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={category._id}
                    checked={updateSubCategoryData.categories.includes(
                      category._id
                    )}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setUpdateSubCategoryData(
                        (prev: { categories: any[] }) => ({
                          ...prev,
                          categories: isChecked
                            ? [...prev.categories, category._id]
                            : prev.categories.filter(
                                (id) => id !== category._id
                              ),
                        })
                      );
                    }}
                  />
                  <label htmlFor={category._id} className="text-black">
                    {category.title}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No categories available</p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black"
              onClick={closeUpdateSubcategory}
            >
              Cancel
            </button>
            <button
              className="bg-yellow-600 px-5 py-2 font-semibold rounded-md hover:bg-yellow-500 duration-200"
              onClick={updateSubcategory}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openDeleteSubCategoryModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Delete Subcategory
          </h1>
          <div className="text-black flex items-center mb-6">
            <p>{deleteSubCategoryData.title}</p>
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="categories" className="text-black font-semibold">
              Affected Categories
            </label>
            {deleteSubCategoryData.categories.length > 0 ? (
              <ul className="bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full">
                {deleteSubCategoryData.categories.map((categoryId) => (
                  <li key={categoryId} className="text-sm">
                    {allCategories.find((cat) => cat._id === categoryId)
                      ?.title || "Unknown Category"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No categories assigned</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-8">
            <p className="text-red-500 text-center">
              Are you sure you want to delete{" "}
              <span className="text-black font-bold">
                {deleteSubCategoryData.title}
              </span>{" "}
              subcategory? This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black"
              onClick={closeDeleteSubCategory}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200"
              onClick={deleteSubCategory}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openAddItemModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Add New Item
          </h1>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="name" className="text-black font-semibold">
              Item Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter item name"
              value={addItemData.title}
              onChange={(e) =>
                setAddItemData({ ...addItemData, title: e.target.value })
              }
              className="bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full"
            />
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="description" className="text-black font-semibold">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={addItemData.description}
              onChange={(e) =>
                setAddItemData({ ...addItemData, description: e.target.value })
              }
              className="h-[100px] bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full"
            />
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="prices" className="text-black font-semibold">
              Prices (Add multiple)
            </label>
            {(addItemData.prices || []).map((price, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder={`Price ${index + 1}`}
                  value={price}
                  onChange={(e) => {
                    const newPrices = [...(addItemData.prices || [])];
                    newPrices[index] = Number(e.target.value);
                    setAddItemData({ ...addItemData, prices: newPrices });
                  }}
                  className="bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full"
                />
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => {
                    setAddItemData({
                      ...addItemData,
                      prices: (addItemData.prices || []).filter(
                        (_, i) => i !== index
                      ),
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={() =>
                setAddItemData({
                  ...addItemData,
                  prices: [...(addItemData.prices || []), 0],
                })
              }
            >
              + Add Price
            </button>
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label className="text-black font-semibold">
              Additional Options
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={addItemData.glutenFree}
                  onChange={(e) =>
                    setAddItemData({
                      ...addItemData,
                      glutenFree: e.target.checked,
                    })
                  }
                />
                Gluten-Free
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={addItemData.plateSplitting}
                  onChange={(e) =>
                    setAddItemData({
                      ...addItemData,
                      plateSplitting: e.target.checked,
                    })
                  }
                />
                Plate Splitting
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={addItemData.rawDisclaimer}
                  onChange={(e) =>
                    setAddItemData({
                      ...addItemData,
                      rawDisclaimer: e.target.checked,
                    })
                  }
                />
                Raw Disclaimer
              </label>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black"
              onClick={closeAddItem}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 px-5 py-2 font-semibold rounded-md hover:bg-indigo-500 duration-200"
              onClick={addNewItem}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openUpdateItemModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Update Item
          </h1>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="title" className="text-black font-semibold">
              Item Name
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter item name"
              value={updateItemData.title}
              onChange={(e) =>
                setUpdateItemData({ ...updateItemData, title: e.target.value })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="description" className="text-black font-semibold">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={updateItemData.description}
              onChange={(e) =>
                setUpdateItemData({
                  ...updateItemData,
                  description: e.target.value,
                })
              }
              className="h-[100px] bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label className="text-black font-semibold">
              Prices (Multiple Sizes)
            </label>

            {updateItemData.prices?.map((price, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder={`Price ${index + 1}`}
                  value={price}
                  onChange={(e) => {
                    const newPrices = [...(updateItemData.prices || [])];
                    newPrices[index] = Number(e.target.value);
                    setUpdateItemData({ ...updateItemData, prices: newPrices });
                  }}
                  className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
                />
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => {
                    setUpdateItemData({
                      ...updateItemData,
                      prices:
                        updateItemData.prices?.filter((_, i) => i !== index) ||
                        [],
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={() =>
                setUpdateItemData({
                  ...updateItemData,
                  prices: [...(updateItemData.prices || []), 0],
                })
              }
            >
              + Add Price
            </button>
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label className="text-black font-semibold">
              Additional Options
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={updateItemData.glutenFree}
                  onChange={(e) =>
                    setUpdateItemData({
                      ...updateItemData,
                      glutenFree: e.target.checked,
                    })
                  }
                />
                Gluten-Free
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={updateItemData.plateSplitting}
                  onChange={(e) =>
                    setUpdateItemData({
                      ...updateItemData,
                      plateSplitting: e.target.checked,
                    })
                  }
                />
                Plate Splitting
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={updateItemData.rawDisclaimer}
                  onChange={(e) =>
                    setUpdateItemData({
                      ...updateItemData,
                      rawDisclaimer: e.target.checked,
                    })
                  }
                />
                Raw Disclaimer
              </label>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black"
              onClick={closeUpdateItem}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 px-5 py-2 font-semibold rounded-md hover:bg-indigo-500 duration-200"
              onClick={updateItem}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openDeleteItemModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Delete Item
          </h1>

          <div className="flex flex-col gap-1 mb-8">
            <p className="text-red-500 text-center">
              Are you sure you want to delete{" "}
              <span className="text-black font-bold">
                {deleteItemData.itemTitle}
              </span>{" "}
              item? This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black"
              onClick={closeDeleteItem}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200"
              onClick={deleteItem}
            >
              DELETE
            </button>
          </div>
        </div>
      </Modal>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="pb-8">
          <Link
            className="text-indigo-500 font-medium underline flex items-center gap-2"
            href={`/dashboard/categories?locationId=${selectedLocation}&category=${selectedCategory}`}
          >
            <FaArrowLeftLong /> Go back to categories
          </Link>
        </div>
        <div>
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCategoryName}
            </h1>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 duration-200 py-3 px-4 text-white font-semibold rounded-md flex justify-center items-center gap-2"
              onClick={openAddNewSubcategory}
            >
              <FiPlusCircle className="text-white" /> Add new Subcategory
            </button>
          </div>
          {menuSubcategories
            .slice()
            .reverse()
            .map((subcategory: any) => (
              <div
                key={subcategory._id}
                className="text-gray-900 bg-whit shadow-lg rounded-xl overflow-hidden mb-8"
              >
                <div
                  key={subcategory._id}
                  className="p-5 border-b-[1px] border-gray-300 bg-indigo-50 flex justify-between items-center"
                >
                  <div>
                    <h1 className="text-2xl font-bold">{subcategory.title}</h1>
                    {subcategory.description && (
                      <p className="font-medium text-md text-gray-500">
                        {subcategory.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="bg-yellow-600 w-10 h-10 rounded-md flex justify-center items-center"
                      onClick={() => openUpdateSubcategory(subcategory)}
                    >
                      <FaPencilAlt className="text-white" />
                    </button>
                    <button
                      className="bg-red-600 w-10 h-10 rounded-md flex justify-center items-center"
                      onClick={() => openDeleteSubCategory(subcategory)}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </div>
                <div>
                  {subcategory.items.length === 0 ? (
                    <p className="text-red-500 p-3">No items found</p>
                  ) : (
                    <div>
                      {subcategory.items.map((item: any) => (
                        <div
                          key={item._id}
                          className="p-5 b-3 border-b-[1px] border-gray-200 hover:bg-gray-200 duration-200"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-1xl font-semibold">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="font-medium text-md text-gray-500">
                                  {item.description}
                                </p>
                              )}
                              <p className="text-1xl font-semibold text-indigo-500">
                                {item.prices?.length > 0
                                  ? item.prices.join(", ")
                                  : "No price available"}
                              </p>

                              <div className="flex gap-2 mt-2">
                                {item.glutenFree && (
                                  <span className="bg-green-200 text-green-800 px-2 py-1 text-xs rounded">
                                    Gluten-Free
                                  </span>
                                )}
                                {item.plateSplitting && (
                                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 text-xs rounded">
                                    Plate Splitting
                                  </span>
                                )}
                                {item.rawDisclaimer && (
                                  <span className="bg-red-200 text-red-800 px-2 py-1 text-xs rounded">
                                    Raw Disclaimer
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-1">
                              <button
                                className="bg-yellow-600 w-8 h-8 rounded-md flex justify-center items-center"
                                onClick={() =>
                                  openUpdateItem(subcategory, item)
                                }
                              >
                                <FaPencilAlt className="text-white" />
                              </button>

                              <button
                                className="bg-red-600 w-8 h-8 rounded-md flex justify-center items-center"
                                onClick={() =>
                                  openDeleteItem(subcategory, item)
                                }
                              >
                                <MdDelete className="text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="px-6 py-3 flex justify-end">
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 duration-200 py-3 px-4 text-white font-semibold rounded-md flex justify-center items-center gap-2"
                    onClick={() => openAddItem(subcategory)}
                  >
                    <FiPlusCircle className="text-white" /> Add new Item
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default MenuItemsPage;
