'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

export default function Profile() {

  const { login, avatarUrl, followers, following } = useSelector(
    (state: RootState) => state.repos
  );

  return (
    <div className="flex flex-col items-center space-y-4 rounded-md border p-6 shadow-sm 
                    dark:border-gray-700 dark:bg-gray-800">

      <div className="relative">
        <img
          src={avatarUrl}
          alt={login}
          className="h-24 w-24 rounded-full border border-gray-300 
                     dark:border-gray-600"
        />
      </div>

   
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {login}
      </h1>


      <p className="text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{followers}</span> 
        {followers === 1 ? ' follower' : ' followers'} 
        {' · '}
        <span className="font-medium">{following}</span> following
      </p>

    </div>
  );
}
