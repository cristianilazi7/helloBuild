"use client";
import RepositoryList from "@/app/components/RepositoryList";
import Sidebar from "@/app/components/Sidebar";
import { RootState } from "@/app/store/store";
import AuthGuard from "@/utils/guards/authGuard";
import React from "react";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const { githubAccess, githubToken } = useSelector(
    (state: RootState) => state.auth,
  );
  return (
    <AuthGuard>
  
    
      <Sidebar githubAccess={githubAccess} token={githubToken || ''}/>

      <div className="p-4 sm:ml-64">
        <div className="rounded bg-white p-6 shadow-sm dark:bg-gray-800">
          
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-100">
            GitHub Repositories
          </h2>

          {githubAccess && githubToken ? (
            <div className="mt-4">
              <RepositoryList token={githubToken} />
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              GitHub access not available. Please connect your account.
            </p>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
