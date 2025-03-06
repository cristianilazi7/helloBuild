'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/store/slices/authSlice';
import { persistor } from '@/app/store/store';
import { useRouter } from "next/navigation";
import { logoutRepo } from '../store/slices/reposSlice';
export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutRepo());

     persistor.purge();

    router.push("/dashboard");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-2 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
    >
      Logout
    </button>
  );
}
