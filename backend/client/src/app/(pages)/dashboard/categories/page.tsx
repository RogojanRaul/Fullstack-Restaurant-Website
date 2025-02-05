"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { deleteReq, get, post, put } from "@/utils/fetch";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Modal from "@/components/Modal";
import { Location } from "@/types/menuTypes";

const CategoriesPage = () => {
  const searchParams = useSearchParams();
  const selectedLocation = searchParams.get("locationId");
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [selectedLocationName, setSelectedLocationName] = useState<
    string | null
  >(null);

  const [categories, setCategories] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  const [openAddNewCategoryModal, setOpenAddNewCategoryModal] = useState(false);
  const [addNewCategoryData, setAddNewCategoryData] = useState<{
    categoryName: string;
    locations: string[];
  }>({
    categoryName: "",
    locations: [],
  });

  const [openUpdateCategoryModal, setOpenUpdateCategoryModal] = useState(false);
  const [updateCategoryData, setUpdateCategoryData] = useState<{
    categoryId: string;
    newCategoryName: string;
    locations: string[];
  }>({
    categoryId: "",
    newCategoryName: "",
    locations: [],
  });

  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] =
    useState<any>(false);
  const [deleteCategoryData, setDeleteCategoryData] = useState<{
    categoryId: string;
    categoryName: string;
    locations: string[];
  }>({
    categoryId: "",
    categoryName: "",
    locations: [],
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const openAddNewCategory = () => {
    setOpenAddNewCategoryModal(true);
    setAddNewCategoryData({
      categoryName: "",
      locations: selectedLocation ? [selectedLocation] : [],
    });
  };

  const closeAddNewCategory = () => {
    setOpenAddNewCategoryModal(false);
    setAddNewCategoryData({ categoryName: "", locations: [] });
  };

  const addNewCategory = async () => {
    try {
      const payload = {
        title: addNewCategoryData.categoryName,
        locations: addNewCategoryData.locations,
      };

      await post({ url: "/api/menu/categories", body: payload });

      closeAddNewCategory();
      setError("");
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to add category");
      closeAddNewCategory();
    }
  };

  const openDeleteCategory = (e: any, category: any) => {
    e.preventDefault();
    setOpenDeleteCategoryModal(true);
    setDeleteCategoryData({
      categoryId: category._id,
      categoryName: category.title,
      locations: category.locations || [],
    });
  };

  const closeDeleteCategory = () => {
    setOpenDeleteCategoryModal(false);
    setDeleteCategoryData({
      categoryId: "",
      categoryName: "",
      locations: [],
    });
  };

  const deleteCategory = async () => {
    try {
      await deleteReq({
        url: `/api/menu/categories/${deleteCategoryData.categoryId}`,
      });

      closeDeleteCategory();
      setError("");
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to delete category");
      closeDeleteCategory();
    }
  };

  const openUpdateCategory = (e: any, category: any) => {
    e.preventDefault();
    setOpenUpdateCategoryModal(true);
    setUpdateCategoryData({
      categoryId: category._id,
      newCategoryName: category.title,
      locations: category.locations || [],
    });
  };

  const closeUpdateCategory = () => {
    setOpenUpdateCategoryModal(false);
    setUpdateCategoryData({
      categoryId: "",
      newCategoryName: "",
      locations: [],
    });
  };

  const updateCategory = async () => {
    try {
      const payload = {
        title: updateCategoryData.newCategoryName,
        locations: updateCategoryData.locations,
      };

      await put({
        url: `/api/menu/categories/${updateCategoryData.categoryId}`,
        body: payload,
      });

      closeUpdateCategory();
      setError("");
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to update category");
      closeUpdateCategory();
    }
  };

  const getLocationCategories = async () => {
    try {
      const response = await get({
        url: `/api/menu/locations/${selectedLocation}/categories`,
      });

      if (Array.isArray(response)) {
        setCategories(response);
      } else {
        setCategories([]);
        console.error("Invalid categories response:", response);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load categories");
      setCategories([]);
    }
  };

  useEffect(() => {
    getLocationCategories();
  }, [refreshKey]);

  const fetchLocations = async () => {
    try {
      const response = await get({ url: "/api/menu/locations" });

      if (Array.isArray(response)) {
        setAllLocations(response as Location[]);

        const location = response.find((loc) => loc._id === selectedLocation);
        if (location) {
          setSelectedLocationName(location.title);
        } else {
          setSelectedLocationName(null);
        }
      } else {
        console.error("Invalid response format:", response);
        setAllLocations([]);
        setSelectedLocationName(null);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setAllLocations([]);
      setSelectedLocationName(null);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedLocationName}: Menu Categories
          </h1>
        </div>
      </header>
      <Modal isOpen={openAddNewCategoryModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Add New Category
          </h1>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="name" className="text-black font-semibold">
              Category Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter category name"
              value={addNewCategoryData.categoryName}
              onChange={(e) =>
                setAddNewCategoryData({
                  ...addNewCategoryData,
                  categoryName: e.target.value,
                })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-black font-semibold">Select Locations</label>
            {allLocations.length > 0 ? (
              allLocations.map((location: Location) => (
                <div key={location._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={location._id}
                    checked={addNewCategoryData.locations.includes(
                      location._id
                    )}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setAddNewCategoryData((prev) => ({
                        ...prev,
                        locations: isChecked
                          ? [...prev.locations, location._id]
                          : prev.locations.filter((id) => id !== location._id),
                      }));
                    }}
                  />
                  <label htmlFor={location._id} className="text-black">
                    {location.title}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No locations available</p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black"
              onClick={closeAddNewCategory}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 px-5 py-2 font-semibold rounded-md hover:bg-indigo-500 duration-200"
              onClick={addNewCategory}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openDeleteCategoryModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Delete Category
          </h1>
          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="categoryName" className="text-black font-semibold">
              Category
            </label>
            <input
              name="categoryName"
              type="text"
              placeholder="Category name"
              value={deleteCategoryData.categoryName}
              readOnly
              className="bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="locations" className="text-black font-semibold">
              Affected Locations
            </label>
            {deleteCategoryData.locations.length > 0 ? (
              <ul className="bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full">
                {deleteCategoryData.locations.map((locationId) => (
                  <li key={locationId} className="text-sm">
                    {allLocations.find((loc) => loc._id === locationId)
                      ?.title || "Unknown Location"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No locations assigned</p>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black"
              onClick={closeDeleteCategory}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200"
              onClick={deleteCategory}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openUpdateCategoryModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Update Category
          </h1>

          <div className="text-black flex items-center mb-6">
            <p>Editing: {updateCategoryData.newCategoryName}</p>
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="newName" className="text-black font-semibold">
              New Category Name
            </label>
            <input
              name="newName"
              type="text"
              placeholder="Enter new category name"
              value={updateCategoryData.newCategoryName}
              className="bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full"
              onChange={(e) => {
                setUpdateCategoryData({
                  ...updateCategoryData,
                  newCategoryName: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-black font-semibold">Select Locations</label>
            {allLocations.length > 0 ? (
              allLocations.map((location) => (
                <div key={location._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={location._id}
                    checked={updateCategoryData.locations.includes(
                      location._id
                    )}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setUpdateCategoryData((prev) => ({
                        ...prev,
                        locations: isChecked
                          ? [...prev.locations, location._id]
                          : prev.locations.filter((id) => id !== location._id),
                      }));
                    }}
                  />
                  <label htmlFor={location._id} className="text-black">
                    {location.title}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No locations available</p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black"
              onClick={closeUpdateCategory}
            >
              Cancel
            </button>
            <button
              className="bg-yellow-600 px-5 py-2 font-semibold rounded-md hover:bg-yellow-500 duration-200"
              onClick={updateCategory}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="pb-8 flex justify-between items-center">
          <Link
            className="text-indigo-500 font-medium underline flex items-center gap-2"
            href="/dashboard"
          >
            <FaArrowLeftLong /> Go back to locations
          </Link>
          {error && <p className="text-red-500 w-[50%] text-center">{error}</p>}
          <button
            className="bg-indigo-500 px-4 py-3 rounded-md text-white font-semibold hover:bg-indigo-400 duration-200 text-[14px] flex items-center gap-1"
            onClick={openAddNewCategory}
          >
            <FiPlusCircle />
            Add new Category
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {categories.map((category: any) => (
            <Link
              key={category._id}
              href={`categories/menuItems?location=${selectedLocation}&category=${category._id}`}
              className="flex-[1_1_200px] bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
            >
              <p className="block text-xl font-bold text-gray-700">
                {category.title}
              </p>
              <div className="flex gap-2 absolute top-3 right-3">
                <button
                  className="bg-yellow-600 w-8 h-8 rounded-md flex justify-center items-center hover:bg-yellow-500 duration-200"
                  onClick={(e) => openUpdateCategory(e, category)}
                >
                  <FaPencilAlt className="text-white" />
                </button>
                <button
                  className="bg-red-600 w-8 h-8 rounded-md flex justify-center items-center hover:bg-red-500 duration-200"
                  onClick={(e) => openDeleteCategory(e, category)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
