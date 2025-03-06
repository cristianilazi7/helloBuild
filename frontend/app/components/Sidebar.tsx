"use client";

import React from "react";
import RefreshReposButton from "./RefreshReposButton";
import GitHubAccessButton from "./GitHubAccessButton";
import Profile from "./Profile";
import LogoutButton from "./LogoutButton";

interface SidebarProps {
  githubAccess: boolean;
  token: string;
}

export default function Sidebar({ githubAccess, token }: SidebarProps) {
  return (
    <aside
      id="default-sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 
             -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col gap-4 overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        {/* Profile Section */}
        <div
          className="rounded-md border border-gray-200 bg-white p-4 shadow-sm 
                    dark:border-gray-700 dark:bg-gray-900"
        >
          <Profile />
        </div>

        {/* Action Buttons (Refresh or Access) */}
        <ul className="space-y-2 font-medium">
          {githubAccess ? (
            <li>
              <RefreshReposButton token={token} />
            </li>
          ) : (
            <li>
              <GitHubAccessButton />
            </li>
          )}

          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </aside>
  );
}
