"use client";

import React, { useState } from "react";

interface RepoFilterProps {
  onFilterChange: (term: string) => void;
}

export default function RepoFilter({ onFilterChange }: RepoFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onFilterChange(term);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search repositories..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full rounded border border-gray-300 p-2 
                   text-sm text-gray-700 
                   focus:border-blue-500 focus:outline-none 
                   dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      />
    </div>
  );
}
