'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { fetchRepos } from '../store/slices/reposSlice';

export default function RefreshReposButton({ token }: { token: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleRefresh = () => {
    dispatch(fetchRepos({ token }));
  };

  return (
    <button
      onClick={handleRefresh}
      className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold 
                 text-white hover:bg-blue-700"
    >
      Refresh list
    </button>
  );
}
