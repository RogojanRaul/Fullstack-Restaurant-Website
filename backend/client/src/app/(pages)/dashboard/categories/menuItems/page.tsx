'use client';
import { deleteReq, get, post } from '@/utils/fetch';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FiPlusCircle } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import Modal from '@/components/Modal';
import { IoIosArrowForward } from 'react-icons/io';

const MenuItemsPage = () => {
  const [menuSubcategories, setMenuSubcategories] = useState<any>([]);
  const [error, setError] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);

  const searchParams = useSearchParams();

  const selectedLocation = searchParams.get('location');
  const selectedCategory = searchParams.get('category');

  const [openAddNewSubCategoryModal, setOpenAddNewSubCategoryModal] =
    useState(false);
  const [addNewSubCategoryData, setAddNewSubCategoryData] = useState<any>({
    location: selectedLocation,
    category: selectedCategory,
    title: '',
    description: '',
  });
  const [openUpdateSubCategoryModal, setOpenUpdateSubCategoryModal] =
    useState<any>(false);
  const [updateSubCategoryData, setUpdateSubCategoryData] = useState<any>({
    location: selectedLocation,
    category: selectedCategory,
    oldTitle: '',
    newTitle: '',
    newDescription: '',
  });
  const [openDeleteSubCategoryModal, setOpenDeleteSubCategoryModal] =
    useState(false);
  const [deleteSubCategoryData, setDeleteSubCategoryData] = useState({
    location: selectedLocation,
    category: selectedCategory,
    title: '',
  });
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [addItemData, setAddItemData] = useState<any>({
    location: selectedLocation,
    category: selectedCategory,
    subcategory: '',
    title: '',
    description: '',
    price: '',
  });
  const [openDeleteItemModal, setOpenDeleteModal] = useState(false);
  const [deleteItemData, setDeleteItemData] = useState({
    location: selectedLocation,
    category: selectedCategory,
    subcategory: '',
    itemId: '',
    itemTitle: '',
  });

  const openDeleteItem = (subcategory: any, item: any) => {
    setOpenDeleteModal(true);
    setDeleteItemData({
      location: selectedLocation,
      category: selectedCategory,
      subcategory: subcategory.title,
      itemId: item._id,
      itemTitle: item.title,
    });
  };

  const closeDeleteItem = () => {
    setOpenDeleteModal(false);
    setDeleteItemData({
      location: selectedLocation,
      category: selectedCategory,
      subcategory: '',
      itemId: '',
      itemTitle: '',
    });
  };

  const deleteItem = async () => {
    try {
      await deleteReq({
        url: '/api/menu/deleteItem',
        body: deleteItemData,
      });
      closeDeleteItem();
      setError('');
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      closeDeleteItem();
    }
  };

  const openAddItem = (subcategory: any) => {
    setOpenAddItemModal(true);
    setAddItemData({
      location: selectedLocation,
      category: selectedCategory,
      subcategory: subcategory.title,
      title: '',
      description: '',
      price: null,
    });
  };

  const closeAddItem = () => {
    setOpenAddItemModal(false);
    setAddItemData({
      location: selectedLocation,
      category: selectedCategory,
      subcategory: '',
      title: '',
      description: '',
      price: null,
    });
  };

  const addNewItem = async () => {
    try {
      await post({ url: '/api/menu/item', body: addItemData });
      closeAddItem();
      setError('');
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      closeAddItem();
    }
  };

  const openAddNewSubcategory = () => {
    setOpenAddNewSubCategoryModal(true);
    setAddNewSubCategoryData({
      location: selectedLocation,
      category: selectedCategory,
      title: '',
      description: '',
    });
  };

  const closeAddNewSubCategory = () => {
    setOpenAddNewSubCategoryModal(false);
    setAddNewSubCategoryData({
      location: selectedLocation,
      category: selectedCategory,
      title: '',
      description: '',
    });
  };

  const addNewSubCategory = async () => {
    try {
      await post({ url: '/api/menu/subcategory', body: addNewSubCategoryData });
      closeAddNewSubCategory();
      setError('');
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      closeAddNewSubCategory();
    }
  };

  const openUpdateSubcategory = (subcategory: any) => {
    setOpenUpdateSubCategoryModal(true);
    setUpdateSubCategoryData({
      location: selectedLocation,
      category: selectedCategory,
      oldTitle: subcategory.title,
      oldDescription: subcategory.description,
      newTitle: subcategory.title,
      newDescription: subcategory.description,
    });
  };

  const closeUpdateSubcategory = () => {
    setOpenUpdateSubCategoryModal(false);
  };

  const updateSubcategory = async () => {
    try {
      await post({
        url: '/api/menu/updateSubCategory',
        body: updateSubCategoryData,
      });
      closeUpdateSubcategory();
      setError('');
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      closeUpdateSubcategory();
    }
  };

  const getSubcategories = async () => {
    try {
      const response = await get({
        url: `api/menu/menuItems/${selectedLocation}/${selectedCategory}`,
      });
      setMenuSubcategories(response);
    } catch (error) {
      setError("Can't find menu items");
      console.log(error);
    }
  };

  const openDeleteSubCategory = (subcategory: any) => {
    setOpenDeleteSubCategoryModal(true);
    setDeleteSubCategoryData({
      location: selectedLocation,
      category: selectedCategory,
      title: subcategory.title,
    });
  };

  const closeDeleteSubCategory = () => {
    setOpenDeleteSubCategoryModal(false);
    setDeleteSubCategoryData({
      location: selectedLocation,
      category: selectedCategory,
      title: '',
    });
  };

  const deleteSubCategory = async () => {
    try {
      await deleteReq({
        url: '/api/menu/deleteSubCategory',
        body: deleteSubCategoryData,
      });
      closeDeleteSubCategory();
      setError('');
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      closeDeleteSubCategory();
    }
  };

  useEffect(() => {
    getSubcategories();
  }, [refreshKey]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-gray-900'>Menu Categories</h1>
        </div>
      </header>

      <Modal isOpen={openAddNewSubCategoryModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Add new Subcategory
          </h1>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='name' className='text-black font-semibold'>
              Add Subcategory Name
            </label>
            <input
              name='name'
              type='text'
              placeholder='name'
              value={addNewSubCategoryData.title}
              onChange={(e) => {
                setAddNewSubCategoryData({
                  ...addNewSubCategoryData,
                  title: e.target.value,
                });
              }}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='description' className='text-black font-semibold'>
              Add Subcategory Description
            </label>
            <textarea
              name='description'
              placeholder='description'
              value={addNewSubCategoryData.description}
              onChange={(e) => {
                setAddNewSubCategoryData({
                  ...addNewSubCategoryData,
                  description: e.target.value,
                });
              }}
              className='h-[100px] bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200'
              onClick={closeAddNewSubCategory}
            >
              Cancel
            </button>
            <button
              className='bg-indigo-600 px-5 py-2 font-semibold rounded-md hover:bg-indigo-500 duration-200'
              onClick={addNewSubCategory}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openUpdateSubCategoryModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Update Category
          </h1>
          <div className='text-black flex items-center mb-6'>
            <p>{updateSubCategoryData.location}</p>
            <IoIosArrowForward />
            <p>{updateSubCategoryData.category}</p>
            <IoIosArrowForward />
            <p>{updateSubCategoryData.oldTitle}</p>
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='newName' className='text-black font-semibold'>
              New Subcategory Name
            </label>
            <input
              name='newName'
              type='text'
              defaultValue={updateSubCategoryData.oldTitle}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
              onChange={(e) => {
                setUpdateSubCategoryData({
                  ...updateSubCategoryData,
                  newTitle: e.target.value,
                });
              }}
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='description' className='text-black font-semibold'>
              New Subcategory Description
            </label>
            <textarea
              name='description'
              defaultValue={updateSubCategoryData.oldDescription}
              className='h-[100px] bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
              onChange={(e) => {
                setUpdateSubCategoryData({
                  ...updateSubCategoryData,
                  newDescription: e.target.value,
                });
              }}
            />
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black'
              onClick={closeUpdateSubcategory}
            >
              Cancel
            </button>
            <button
              className='bg-yellow-600 px-5 py-2 font-semibold rounded-md hover:bg-yellow-500 duration-200'
              onClick={updateSubcategory}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openDeleteSubCategoryModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Delete Category
          </h1>
          <div className='text-black flex items-center mb-6'>
            <p>{deleteSubCategoryData.location}</p>
            <IoIosArrowForward />
            <p>{deleteSubCategoryData.category}</p>
          </div>
          <div className='flex flex-col gap-1 mb-8'>
            <p className='text-red-500 text-center'>
              Are you sure you want to delete{' '}
              <span className='text-black font-bold'>
                {deleteSubCategoryData.title}
              </span>{' '}
              subcategory?
            </p>
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black'
              onClick={closeDeleteSubCategory}
            >
              Cancel
            </button>
            <button
              className='bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200'
              onClick={deleteSubCategory}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openAddItemModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Add new item
          </h1>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='name' className='text-black font-semibold'>
              Add New Item Name
            </label>
            <input
              name='name'
              type='text'
              placeholder='name'
              value={addItemData.title}
              onChange={(e) => {
                setAddItemData({
                  ...addItemData,
                  title: e.target.value,
                });
              }}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='description' className='text-black font-semibold'>
              Add New Item Description
            </label>
            <input
              name='description'
              type='text'
              placeholder='description'
              value={addItemData.description}
              onChange={(e) => {
                setAddItemData({
                  ...addItemData,
                  description: e.target.value,
                });
              }}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='price' className='text-black font-semibold'>
              Add New Item Price
            </label>
            <input
              name='price'
              type='number'
              placeholder='price'
              value={addItemData.price}
              onChange={(e) => {
                setAddItemData({
                  ...addItemData,
                  price: Number(e.target.value),
                });
              }}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200'
              onClick={closeAddItem}
            >
              Cancel
            </button>
            <button
              className='bg-indigo-600 px-5 py-2 font-semibold rounded-md hover:bg-indigo-500 duration-200'
              onClick={addNewItem}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openDeleteItemModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Delete Item
          </h1>
          <div className='text-black flex items-center mb-6'>
            <p>{deleteSubCategoryData.location}</p>
            <IoIosArrowForward />
            <p>{deleteSubCategoryData.category}</p>
            <IoIosArrowForward />
            <p>{deleteItemData.subcategory}</p>
          </div>
          <div className='flex flex-col gap-1 mb-8'>
            <p className='text-red-500 text-center'>
              Are you sure you want to delete{' '}
              <span className='text-black font-bold'>
                {deleteItemData.itemTitle}
              </span>{' '}
              item?
            </p>
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-200 duration-200 text-black'
              onClick={closeDeleteItem}
            >
              Cancel
            </button>
            <button
              className='bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200'
              onClick={deleteItem}
            >
              DELETE
            </button>
          </div>
        </div>
      </Modal>

      <main className='max-w-7xl mx-auto px-8 py-8'>
        <div className='pb-8'>
          <Link
            className='text-indigo-500 font-medium underline flex items-center gap-2'
            href={`/dashboard/categories?location=${selectedLocation}&${selectedCategory}`}
          >
            <FaArrowLeftLong /> Go back to categories
          </Link>
        </div>
        <div>
          <div className='mb-8 flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-gray-900'>
              {selectedCategory}
            </h1>
            <button
              className='bg-indigo-600 hover:bg-indigo-700 duration-200 py-3 px-4 text-white font-semibold rounded-md flex justify-center items-center gap-2'
              onClick={openAddNewSubcategory}
            >
              <FiPlusCircle className='text-white' /> Add new Subcategory
            </button>
          </div>
          {menuSubcategories
            .slice()
            .reverse()
            .map((subcategory: any) => (
              <div
                key={subcategory._id}
                className='text-gray-900 bg-whit shadow-lg rounded-xl overflow-hidden mb-8'
              >
                <div
                  key={subcategory._id}
                  className='p-5 border-b-[1px] border-gray-300 bg-indigo-50 flex justify-between items-center'
                >
                  <div>
                    <h1 className='text-2xl font-bold'>{subcategory.title}</h1>
                    {subcategory.description && (
                      <p className='font-medium text-md text-gray-500'>
                        {subcategory.description}
                      </p>
                    )}
                  </div>
                  <div className='flex gap-1'>
                    <button
                      className='bg-yellow-600 w-10 h-10 rounded-md flex justify-center items-center'
                      onClick={() => openUpdateSubcategory(subcategory)}
                    >
                      <FaPencilAlt className='text-white' />
                    </button>
                    <button
                      className='bg-red-600 w-10 h-10 rounded-md flex justify-center items-center'
                      onClick={() => openDeleteSubCategory(subcategory)}
                    >
                      <MdDelete className='text-white' />
                    </button>
                  </div>
                </div>
                <div>
                  {subcategory.items.length === 0 ? (
                    <p className='text-red-500 p-3'>No items found</p>
                  ) : (
                    <div>
                      {subcategory.items.map((item: any) => (
                        <div
                          key={item._id}
                          className='p-5 b-3 border-b-[1px] border-gray-200 hover:bg-gray-200 duration-200'
                        >
                          <div className='flex justify-between items-center'>
                            <div>
                              <h3 className='text-1xl font-semibold'>
                                {item.title}
                              </h3>
                              <p className='font-medium text-md text-gray-500'>
                                {item.description}
                              </p>
                              <p className='text-1xl font-semibold text-indigo-500'>
                                {item.price}
                              </p>
                            </div>
                            <div className='flex gap-1'>
                              <button
                                className='bg-yellow-600 w-8 h-8 rounded-md flex justify-center items-center'
                                // onClick={}
                              >
                                <FaPencilAlt className='text-white' />
                              </button>
                              <button
                                className='bg-red-600 w-8 h-8 rounded-md flex justify-center items-center'
                                onClick={() =>
                                  openDeleteItem(subcategory, item)
                                }
                              >
                                <MdDelete className='text-white' />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='px-6 py-3 flex justify-end'>
                  <button
                    className='bg-indigo-600 hover:bg-indigo-700 duration-200 py-3 px-4 text-white font-semibold rounded-md flex justify-center items-center gap-2'
                    onClick={() => openAddItem(subcategory)}
                  >
                    <FiPlusCircle className='text-white' /> Add new Item
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
