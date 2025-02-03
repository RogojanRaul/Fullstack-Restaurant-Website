'use client';
import React, { useEffect, useState } from 'react';

import { deleteReq, get, post } from '@/utils/fetch';
import Link from 'next/link';
import { FiPlusCircle } from 'react-icons/fi';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Modal from '@/components/Modal';

const DashboardPage = () => {
  const [locations, setLocations] = useState<any>([]);
  const [error, setError] = useState<string>('');
  const [openAddLocationModal, setOpenAddLocationModal] = useState(false);
  const [openUpdateLocationModal, setOpenUpdateLocationModal] = useState(false);
  const [locationToBeDeleted, setLocationToBeDeleted] = useState<string>();
  const [openDeleteLocationModal, setOpenDeleteLocationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addLocationsError, setAddLocationError] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  const [locationUpdateData, setLocationUpdateData] = useState<any>({
    id: '',
    title: '',
    address: '',
  });

  const [newLocation, setNewLocation] = useState({
    title: '',
    address: '',
  });

  const addNewLocation = async () => {
    setLoading(true);
    try {
      await post({ url: 'api/menu/location', body: newLocation });
      setLoading(false);
      setOpenAddLocationModal(false);
      setNewLocation({
        title: '',
        address: '',
      });
      setRefreshKey((prev) => prev + 1);
      setError('');
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
      console.log(error);
      setOpenAddLocationModal(false);
    }
  };

  const openAddLocation = () => {
    setOpenAddLocationModal(true);
  };

  const closeAddNewLocation = () => {
    setOpenAddLocationModal(false);
    setNewLocation({
      title: '',
      address: '',
    });
  };

  const openDeleteLocation = (e: any, id: string) => {
    e.preventDefault();
    setOpenDeleteLocationModal(true);
    setLocationToBeDeleted(id);
  };

  const closeDeleteLocation = () => {
    setOpenDeleteLocationModal(false);
    setLocationToBeDeleted('');
  };

  const deleteLocation = async (id: any) => {
    if (!id) return;

    try {
      await deleteReq({ url: `api/menu/deleteLocation/${id}` });
      setOpenDeleteLocationModal(false);
      setLocationToBeDeleted('');
      setRefreshKey((prev) => prev + 1);
      setError('');
    } catch (error: any) {
      setError(error.response.data.message);
      console.log(error);
      setOpenDeleteLocationModal(false);
    }
  };

  const openUpdateLocation = (e: any, location: any) => {
    e.preventDefault();
    setOpenUpdateLocationModal(true);
    setLocationUpdateData({
      id: location._id,
      title: location.title,
      address: location.address,
    });
  };

  const closeUpdateNewLocation = () => {
    setOpenUpdateLocationModal(false);
    setLocationUpdateData({
      title: '',
      address: '',
    });
  };

  const updateLocation = async () => {
    try {
      await post({ url: 'api/menu/updateLocation', body: locationUpdateData });
      setOpenUpdateLocationModal(false);
      setRefreshKey((prev) => prev + 1);
      setError('');
    } catch (error: any) {
      setError(error.response.data.message);
      console.log(error);
      setOpenUpdateLocationModal(false);
    }
  };

  const getLocations = async () => {
    try {
      const response = await get({ url: 'api/menu/getLocations' });
      setLocations(response);
      setError('');
    } catch (error) {
      setError('Failed to find locations');
      console.error(error);
    }
  };

  useEffect(() => {
    getLocations();
  }, [refreshKey]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-gray-900'>Locations</h1>
        </div>
      </header>

      <Modal isOpen={openAddLocationModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Add New Location
          </h1>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='title' className='text-black font-semibold'>
              Location Title
            </label>
            <input
              name='title'
              type='text'
              placeholder='title'
              value={newLocation.title}
              onChange={(e) => {
                setNewLocation({ ...newLocation, title: e.target.value });
              }}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='address' className='text-black font-semibold'>
              Location Address
            </label>
            <input
              name='address'
              type='text'
              placeholder='address'
              value={newLocation.address}
              onChange={(e) => {
                setNewLocation({ ...newLocation, address: e.target.value });
              }}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200'
              onClick={closeAddNewLocation}
            >
              Cancel
            </button>
            <button
              className='bg-indigo-600 px-5 py-2 font-semibold rounded-md hover:bg-indigo-500 duration-200'
              onClick={addNewLocation}
            >
              {loading ? 'loading' : 'Save'}
            </button>
          </div>
          {addLocationsError && (
            <p className='text-red-500 mt-5'>{addLocationsError}</p>
          )}
        </div>
      </Modal>

      <Modal isOpen={openDeleteLocationModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Add New Location
          </h1>
          <p className='text-red-500 text-center mb-8'>
            Are you sure you want to delete this location? All items from this
            location will also be deleted!
          </p>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-100 duration-200 text-black'
              onClick={closeDeleteLocation}
            >
              Cancel
            </button>
            <button
              className='bg-red-600 px-5 py-2 font-semibold rounded-md hover:bg-red-500 duration-200'
              onClick={() => deleteLocation(locationToBeDeleted)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openUpdateLocationModal}>
        <div>
          <h1 className='text-2xl text-black font-bold text-center mb-8'>
            Edit Location
          </h1>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='title' className='text-black font-semibold'>
              Location Title
            </label>
            <input
              name='title'
              type='text'
              placeholder='title'
              value={locationUpdateData.title}
              onChange={(e) => {
                setLocationUpdateData({
                  ...locationUpdateData,
                  title: e.target.value,
                });
              }}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <label htmlFor='address' className='text-black font-semibold'>
              Location Address
            </label>
            <input
              name='address'
              type='text'
              placeholder='address'
              value={locationUpdateData.address}
              onChange={(e) => {
                setLocationUpdateData({
                  ...locationUpdateData,
                  address: e.target.value,
                });
              }}
              className='bg-gray-100 rounded-lg p-2 border-opacity-50 border-2 border-slate-200 text-black w-full'
            />
          </div>
          <div className='flex gap-2 justify-end'>
            <button
              className='bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-100 duration-200 text-black'
              onClick={closeUpdateNewLocation}
            >
              Cancel
            </button>
            <button
              className='bg-yellow-600 px-5 py-2 font-semibold rounded-md hover:bg-yellow-500 duration-200'
              onClick={updateLocation}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <main className='max-w-7xl mx-auto px-4 py-8'>
        <div className='py-8 flex flex-col items-end'>
          <button
            className='bg-indigo-500 px-4 py-3 rounded-md text-white font-semibold hover:bg-indigo-400 duration-200 text-[14px] flex items-center gap-1 float-end'
            onClick={openAddLocation}
          >
            <FiPlusCircle />
            Add new Location
          </button>
          {error && <p className='text-red-500 w-full text-center'>{error}</p>}
        </div>
        <div className='flex flex-wrap justify-center gap-5'>
          {locations.map((location: any) => (
            <Link
              href={`dashboard/categories?location=${location.title}`}
              className='flex-[1_1_300px] bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative'
              key={location.title}
            >
              <p className='block text-xl font-bold text-gray-700'>
                {location.title}
              </p>
              <p className='block text-sm text-gray-500'>{location.address}</p>
              <div className='flex gap-2 absolute top-3 right-3'>
                <button
                  className='bg-yellow-600 w-8 h-8 rounded-md flex justify-center items-center hover:bg-yellow-500 duration-200'
                  onClick={(e) => openUpdateLocation(e, location)}
                >
                  <FaPencilAlt className='text-white' />
                </button>
                <button
                  className='bg-red-600 w-8 h-8 rounded-md flex justify-center items-center hover:bg-red-500 duration-200'
                  onClick={(e) => openDeleteLocation(e, location._id)}
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

export default DashboardPage;
