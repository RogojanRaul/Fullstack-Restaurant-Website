'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { deleteReq, get, post } from '@/utils/fetch';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FiPlusCircle } from 'react-icons/fi';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import Modal from '@/components/Modal';

const CategoriesPage = () => {
  const searchParams = useSearchParams();
  const selectedLocation = searchParams.get('location');

  const [categories, setCategories] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  const [openAddNewCategoryModal, setOpenAddNewCategoryModal] = useState(false);
  const [addNewCategoryData, setAddNewCategoryData] = useState<any>({
    categoryName: '',
    location: selectedLocation,
  });
  const [openUpdateCategoryModal, setOpenUpdateCategoryModal] = useState(false);
  const [updateCategoryData, setUpdateCategoryData] = useState<any>({
    oldCategoryName: '',
    location: selectedLocation,
    newCategoryName: '',
  });
  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] =
    useState<any>(false);
  const [deleteCategoryData, setDeleteCategoryData] = useState<any>({
    categoryName: '',
    location: selectedLocation,
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const openAddNewCategory = () => {
    setOpenAddNewCategoryModal(true);
    setAddNewCategoryData({ categoryName: '', location: selectedLocation });
  };

  const closeAddNewCategory = () => {
    setOpenAddNewCategoryModal(false);
    setAddNewCategoryData({ categoryName: '', location: selectedLocation });
  };

  const addNewCategory = async () => {
    try {
      await post({ url: '/api/menu/category', body: addNewCategoryData });
      closeAddNewCategory();
      setError('');
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      closeAddNewCategory();
    }
  };

  const openDeleteCategory = (e: any, category: any) => {
    e.preventDefault();
    setOpenDeleteCategoryModal(true);
    setDeleteCategoryData({
      categoryName: category.categoryName,
      location: selectedLocation,
    });
  };

  const closeDeleteCategory = () => {
    setOpenDeleteCategoryModal(false);
    setDeleteCategoryData({ categoryName: '', location: selectedLocation });
  };

  const deleteCategory = async () => {
    try {
      await deleteReq({
        url: '/api/menu/deleteCategory',
        body: deleteCategoryData,
      });
      closeDeleteCategory();
      setError('');
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      closeDeleteCategory();
    }
  };

  const openUpdateCategory = (e: any, category: any) => {
    e.preventDefault();
    setOpenUpdateCategoryModal(true);
    setUpdateCategoryData({
      oldCategoryName: category.categoryName,
      location: selectedLocation,
      newCategoryName: updateCategoryData.newCategoryName,
    });
  };

  const closeUpdateCategory = () => {
    setOpenUpdateCategoryModal(false);
    setUpdateCategoryData({
      oldCategoryName: '',
      location: selectedLocation,
      newCategoryName: '',
    });
  };

  const updateCategory = async () => {
    try {
      await post({
        url: '/api/menu/updateCategory',
        body: updateCategoryData,
      });
      closeUpdateCategory();
      setError('');
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      closeUpdateCategory();
    }
  };

  const getLocationCategories = async () => {
    try {
      const response = await get({
        url: `/api/menu/getLocationsCategories/${selectedLocation}`,
      });
      setCategories(response);
    } catch (error) {
      console.log(error);
      setError(`Failed to find ${selectedLocation} categories`);
    }
  };

  useEffect(() => {
    getLocationCategories();
  }, [refreshKey]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-gray-900'>{`${selectedLocation}: Menu Categories`}</h1>
        </div>
      </header>

      <Modal isOpen={openAddNewCategoryModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            {`Add New Category to ${selectedLocation} location`}
          </h1>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='name' className='text-black font-semibold'>
              Add category name
            </label>
            <input
              name='name'
              type='text'
              placeholder='name'
              value={addNewCategoryData.categoryName}
              onChange={(e) => {
                setAddNewCategoryData({
                  ...addNewCategoryData,
                  categoryName: e.target.value,
                });
              }}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200'
              onClick={closeAddNewCategory}
            >
              Cancel
            </button>
            <button
              className='bg-indigo-600 px-5 py-2 font-semibold rounded-md hover:bg-indigo-500 duration-200'
              onClick={addNewCategory}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openDeleteCategoryModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Delete Category
          </h1>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='location' className='text-black font-semibold'>
              Location
            </label>
            <input
              name='location'
              type='text'
              placeholder='location'
              value={deleteCategoryData.location}
              readOnly
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full focus:outline-none'
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='name' className='text-black font-semibold'>
              Category
            </label>
            <input
              name='name'
              type='text'
              placeholder='name'
              value={deleteCategoryData.categoryName}
              readOnly
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full focus:outline-none'
            />
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black'
              onClick={closeDeleteCategory}
            >
              Cancel
            </button>
            <button
              className='bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200'
              onClick={deleteCategory}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openUpdateCategoryModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Update Category
          </h1>
          <div className='text-black flex items-center mb-6'>
            <p>{updateCategoryData.location}</p>
            <IoIosArrowForward />
            <p>{updateCategoryData.oldCategoryName}</p>
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='newName' className='text-black font-semibold'>
              New Category Name
            </label>
            <input
              name='newName'
              type='text'
              placeholder='Add the new Category Name'
              value={updateCategoryData.newCategoryName}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
              onChange={(e) => {
                setUpdateCategoryData({
                  ...updateCategoryData,
                  newCategoryName: e.target.value,
                });
              }}
            />
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black'
              onClick={closeUpdateCategory}
            >
              Cancel
            </button>
            <button
              className='bg-yellow-600 px-5 py-2 font-semibold rounded-md hover:bg-yellow-500 duration-200'
              onClick={updateCategory}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <main className='max-w-7xl mx-auto px-4 py-8'>
        <div className='pb-8 flex justify-between items-center'>
          <Link
            className='text-indigo-500 font-medium underline flex items-center gap-2'
            href='/dashboard'
          >
            <FaArrowLeftLong /> Go back to locations
          </Link>
          {error && <p className='text-red-500 w-[50%] text-center'>{error}</p>}
          <button
            className='bg-indigo-500 px-4 py-3 rounded-md text-white font-semibold hover:bg-indigo-400 duration-200 text-[14px] flex items-center gap-1'
            onClick={openAddNewCategory}
          >
            <FiPlusCircle />
            Add new Category
          </button>
        </div>
        <div className='flex flex-wrap justify-center gap-5'>
          {categories.map((category: any) => (
            <Link
              key={category._id}
              href={`categories/menuItems?location=${selectedLocation}&category=${category.categoryName}`}
              className='flex-[1_1_200px] bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative'
            >
              <p className='block text-xl font-bold text-gray-700'>
                {category.categoryName}
              </p>
              <div className='flex gap-2 absolute top-3 right-3'>
                <button
                  className='bg-yellow-600 w-8 h-8 rounded-md flex justify-center items-center hover:bg-yellow-500 duration-200'
                  onClick={(e) => openUpdateCategory(e, category)}
                >
                  <FaPencilAlt className='text-white' />
                </button>
                <button
                  className='bg-red-600 w-8 h-8 rounded-md flex justify-center items-center hover:bg-red-500 duration-200'
                  onClick={(e) => openDeleteCategory(e, category)}
                >
                  <MdDelete className='text-white' />
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
