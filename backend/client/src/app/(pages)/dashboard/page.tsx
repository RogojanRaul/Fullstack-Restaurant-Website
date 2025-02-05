"use client";
import React, { useEffect, useState } from "react";
import { deleteReq, get, post, put } from "@/utils/fetch";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "@/components/Modal";
import { Location } from "@/types/menuTypes";

const DashboardPage = () => {
  const [locations, setLocations] = useState<any>([]);
  const [error, setError] = useState<string>("");
  const [openAddLocationModal, setOpenAddLocationModal] = useState(false);
  const [openUpdateLocationModal, setOpenUpdateLocationModal] = useState(false);
  const [locationToBeDeleted, setLocationToBeDeleted] = useState<string>();
  const [openDeleteLocationModal, setOpenDeleteLocationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addLocationsError, setAddLocationError] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  const [locationUpdateData, setLocationUpdateData] = useState<
    Partial<Location>
  >({
    _id: "",
    title: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    emailAddress: "",
    categories: [],
  });

  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    title: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    emailAddress: "",
    categories: [],
  });

  const addNewLocation = async () => {
    setLoading(true);
    try {
      await post({ url: "api/menu/locations", body: newLocation });
      setLoading(false);
      setOpenAddLocationModal(false);
      setNewLocation({
        title: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
        emailAddress: "",
        categories: [],
      });
      setRefreshKey((prev) => prev + 1);
      setError("");
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "Failed to create location");
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
      title: "",
      address: "",
    });
  };

  const openDeleteLocation = (e: any, id: string) => {
    e.preventDefault();
    setOpenDeleteLocationModal(true);
    setLocationToBeDeleted(id);
  };

  const closeDeleteLocation = () => {
    setOpenDeleteLocationModal(false);
    setLocationToBeDeleted("");
  };

  const deleteLocation = async (id: string) => {
    if (!id) {
      console.error("Error: No location ID provided for deletion.");
      return;
    }

    try {
      const response = await deleteReq({ url: `api/menu/locations/${id}` });

      setOpenDeleteLocationModal(false);
      setLocationToBeDeleted("");
      setRefreshKey((prev) => prev + 1);
      setError("");
    } catch (error: any) {
      console.error("Error deleting location:", error);
      setError(error.response?.data?.message || "Failed to delete location");
      setOpenDeleteLocationModal(false);
    }
  };

  const openUpdateLocation = (e: any, location: Location) => {
    e.preventDefault();
    setOpenUpdateLocationModal(true);
    setLocationUpdateData({
      _id: location._id,
      title: location.title,
      address: location.address,
      city: location.city,
      postalCode: location.postalCode,
      phoneNumber: location.phoneNumber,
      emailAddress: location.emailAddress,
      categories: location.categories || [],
    });
  };

  const closeUpdateNewLocation = () => {
    setOpenUpdateLocationModal(false);
    setLocationUpdateData({
      title: "",
      address: "",
    });
  };

  const updateLocation = async (
    locationId: string,
    locationUpdateData: Partial<Location>
  ) => {
    try {
      const response = await put({
        url: `api/menu/locations/${locationId}`,
        body: locationUpdateData,
      });
      setOpenUpdateLocationModal(false);
      setRefreshKey((prev) => prev + 1);
      setError("");

      await getLocations();
    } catch (error: any) {
      console.error("Update Location Error:", error);

      setError(error.response?.data?.message || "Failed to update location");
      setOpenUpdateLocationModal(false);
    }
  };

  const getLocations = async () => {
    try {
      const response = await get({ url: "api/menu/locations" });
      console.log("API Response:", response);
      if (Array.isArray(response)) {
        setLocations(response);
      } else {
        setLocations([]);
        console.error("Expected an array, received:", response);
      }
      setError("");
    } catch (error) {
      setError("Failed to find locations");
      console.error(error);
    }
  };

  useEffect(() => {
    getLocations();
  }, [refreshKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
        </div>
      </header>

      <Modal isOpen={openAddLocationModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Add New Location
          </h1>

          {/* Title */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-black font-semibold">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={newLocation.title}
              onChange={(e) =>
                setNewLocation({ ...newLocation, title: e.target.value })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-black font-semibold">Address</label>
            <input
              type="text"
              placeholder="Address"
              value={newLocation.address}
              onChange={(e) =>
                setNewLocation({ ...newLocation, address: e.target.value })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-black font-semibold">City</label>
            <input
              type="text"
              placeholder="City"
              value={newLocation.city}
              onChange={(e) =>
                setNewLocation({ ...newLocation, city: e.target.value })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Postal Code */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-black font-semibold">Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={newLocation.postalCode}
              onChange={(e) =>
                setNewLocation({ ...newLocation, postalCode: e.target.value })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-black font-semibold">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              value={newLocation.phoneNumber}
              onChange={(e) =>
                setNewLocation({ ...newLocation, phoneNumber: e.target.value })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-black font-semibold">Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              value={newLocation.emailAddress}
              onChange={(e) =>
                setNewLocation({ ...newLocation, emailAddress: e.target.value })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-black font-semibold">Categories</label>
            <input
              type="text"
              placeholder="Comma-separated categories"
              value={newLocation.categories?.join(", ") || ""}
              onChange={(e) =>
                setNewLocation({
                  ...newLocation,
                  categories: e.target.value.split(",").map((c) => c.trim()),
                })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-100 duration-200 text-black"
              onClick={closeAddNewLocation}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 px-5 py-2 font-semibold rounded-md hover:bg-indigo-500 duration-200"
              onClick={addNewLocation}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openDeleteLocationModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Delete Location
          </h1>
          <p className="text-red-500 text-center mb-8">
            Are you sure you want to delete this location? This action{" "}
            <b>cannot</b> be undone.
          </p>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-100 duration-200 text-black"
              onClick={closeDeleteLocation}
            >
              Cancel
            </button>
            <button
              className={`px-5 py-2 font-semibold rounded-md duration-200 ${
                locationToBeDeleted
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                if (locationToBeDeleted) {
                  deleteLocation(locationToBeDeleted);
                }
              }}
              disabled={!locationToBeDeleted}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openUpdateLocationModal}>
        <div>
          <h1 className="text-2xl text-black font-bold text-center mb-8">
            Edit Location
          </h1>

          {/* Title */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="title" className="text-black font-semibold">
              Location Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={locationUpdateData.title}
              onChange={(e) =>
                setLocationUpdateData({
                  ...locationUpdateData,
                  title: e.target.value,
                })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="address" className="text-black font-semibold">
              Address
            </label>
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={locationUpdateData.address}
              onChange={(e) =>
                setLocationUpdateData({
                  ...locationUpdateData,
                  address: e.target.value,
                })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="city" className="text-black font-semibold">
              City
            </label>
            <input
              name="city"
              type="text"
              placeholder="City"
              value={locationUpdateData.city}
              onChange={(e) =>
                setLocationUpdateData({
                  ...locationUpdateData,
                  city: e.target.value,
                })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Postal Code */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="postalCode" className="text-black font-semibold">
              Postal Code
            </label>
            <input
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              value={locationUpdateData.postalCode}
              onChange={(e) =>
                setLocationUpdateData({
                  ...locationUpdateData,
                  postalCode: e.target.value,
                })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="phoneNumber" className="text-black font-semibold">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              value={locationUpdateData.phoneNumber}
              onChange={(e) =>
                setLocationUpdateData({
                  ...locationUpdateData,
                  phoneNumber: e.target.value,
                })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="emailAddress" className="text-black font-semibold">
              Email Address
            </label>
            <input
              name="emailAddress"
              type="email"
              placeholder="Email Address"
              value={locationUpdateData.emailAddress}
              onChange={(e) =>
                setLocationUpdateData({
                  ...locationUpdateData,
                  emailAddress: e.target.value,
                })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="categories" className="text-black font-semibold">
              Categories (Comma Separated)
            </label>
            <input
              name="categories"
              type="text"
              placeholder="Category1, Category2, Category3"
              value={locationUpdateData.categories?.join(", ") || ""}
              onChange={(e) =>
                setLocationUpdateData({
                  ...locationUpdateData,
                  categories: e.target.value.split(",").map((c) => c.trim()),
                })
              }
              className="bg-gray-100 rounded-lg p-2 border-2 border-slate-200 text-black w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-300 px-5 py-2 font-semibold rounded-md hover:bg-gray-100 duration-200 text-black"
              onClick={closeUpdateNewLocation}
            >
              Cancel
            </button>
            <button
              className="bg-yellow-600 px-5 py-2 font-semibold rounded-md hover:bg-yellow-500 duration-200"
              onClick={() => {
                if (!locationUpdateData._id) {
                  console.error("Missing location ID for update!");
                  return;
                }
                updateLocation(locationUpdateData._id, locationUpdateData);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Add New Location Button */}
        <div className="py-8 flex justify-end">
          <button
            className="bg-indigo-500 px-4 py-3 rounded-md text-white font-semibold hover:bg-indigo-400 duration-200 text-[14px] flex items-center gap-1"
            onClick={openAddLocation}
          >
            <FiPlusCircle />
            Add New Location
          </button>
        </div>

        {/* Location Cards */}
        <div className="flex flex-wrap justify-center gap-5">
          {locations.map((location: Location) => (
            <Link
              href={`dashboard/categories?locationId=${location._id}`}
              key={location._id}
              className="flex-[1_1_300px] bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
            >
              <p className="block text-xl font-bold text-gray-700">
                {location.title}
              </p>
              <p className="block text-sm text-gray-500">{location.address}</p>
              <p className="block text-sm text-gray-500">{location.city}</p>
              <p className="block text-sm text-gray-500">
                {location.postalCode}
              </p>
              <p className="block text-sm text-gray-500">
                {location.phoneNumber}
              </p>
              <p className="block text-sm text-gray-500">
                {location.emailAddress}
              </p>
              <p className="block text-sm text-gray-500">
                Categories: {location.categories.join(", ")}
              </p>

              <div className="flex gap-2 absolute top-3 right-3">
                <button
                  className="bg-yellow-600 w-8 h-8 rounded-md flex justify-center items-center hover:bg-yellow-500 duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    openUpdateLocation(e, location);
                  }}
                >
                  <FaPencilAlt className="text-white" />
                </button>
                <button
                  className="bg-red-600 w-8 h-8 rounded-md flex justify-center items-center hover:bg-red-500 duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    openDeleteLocation(e, location._id);
                  }}
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

export default DashboardPage;
