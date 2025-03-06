"use client";

import React from "react";

export default function GitHubAccessButton() {
  const handleGitHubAccess = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = "http://localhost:3000/auth/github";

    const scope = "read:user user:email repo";

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;
  };

  return (
    <button
      onClick={handleGitHubAccess}
      className="rounded bg-gray-800 px-4 py-2 font-semibold text-white hover:bg-gray-900"
    >
      Get GitHub Access
    </button>
  );
}
