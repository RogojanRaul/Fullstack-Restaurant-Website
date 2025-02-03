'use client';
import React, { ChangeEvent, useRef, useState } from 'react';

import {
  currentUserSelector,
  userErrorSelector,
  userLoadingSelector,
} from '@/store/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserStart,
  updateUserError,
  updateUserSuccess,
  deleteUserStart,
  deleteUserError,
  deleteUserSuccess,
  logoutUser,
} from '@/store/user/slice';

const ProfilePage = () => {
  const [formData, setFormData] = useState({});

  const fileRef = useRef<HTMLInputElement | null>(null);

  const currentUser = useSelector(currentUserSelector);
  const userLoading = useSelector(userLoadingSelector);
  const userError = useSelector(userErrorSelector);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserError(data));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserError(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserError(data));
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserError(error));
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('api/auth/logout');
      dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden accept='image/*' />
        <img
          src={currentUser?.profilePicture}
          alt='profile picture'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover'
          onClick={() => fileRef.current?.click()}
        />
        <input
          type='text'
          id='username'
          defaultValue={currentUser?.username}
          placeholder='Username'
          className='bg-slate-900 rounded-lg p-3 border-opacity-50 border-2 border-slate-400 text-white'
          onChange={handleChange}
        />
        <input
          type='email'
          id='email'
          defaultValue={currentUser?.email}
          placeholder='Email'
          className='bg-slate-900 rounded-lg p-3 border-opacity-50 border-2 border-slate-400 text-white'
          onChange={handleChange}
        />
        <input
          type='text'
          id='password'
          placeholder='Password'
          className='bg-slate-900 rounded-lg p-3 border-opacity-50 border-2 border-slate-400 text-white'
          onChange={handleChange}
        />
        <button className='bg-indigo-600 p-3 rounded-lg uppercase font-semibold hover:bg-indigo-500 duration-200'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          className='text-red-500 cursor-pointer'
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span className='text-red-500 cursor-pointer' onClick={handleLogout}>
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default ProfilePage;
