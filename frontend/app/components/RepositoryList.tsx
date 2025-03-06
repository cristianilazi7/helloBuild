"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  fetchRepos,
  removeFavorite,
} from "../store/slices/reposSlice";
import { AppDispatch, RootState } from "../store/store";
import RepoFilter from "./RepoFilter";

export default function RepositoryList({ token }: { token: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, favorites, loading, error } = useSelector(
    (state: RootState) => state.repos,
  );

  const hasExecuted = useRef(false);

  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    if (hasExecuted.current) return;
    if (repos.length === 0) {
      hasExecuted.current = true;
      dispatch(fetchRepos({ token }));
    }
  }, [dispatch, repos, token]);

  const handleToggleFavorite = (repoName: string) => {
    const isFav = favorites.some((f) => f.name === repoName);
    if (isFav) {
      dispatch(removeFavorite(repoName));
    } else {
      const repo = repos.find((r) => r.name === repoName);
      if (repo) {
        dispatch(addFavorite(repo));
      }
    }
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(filterTerm.toLowerCase()),
  );

  if (loading) return <p>Loading repositories...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Repository List</h1>

      <RepoFilter onFilterChange={(term) => setFilterTerm(term)} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <ul className="space-y-2">
            {filteredRepos.map((repo) => {
              const isFavorite = favorites.some((f) => f.name === repo.name);
              return (
                <li key={repo.name} className="border-b pb-2">
                  <p className="font-medium">{repo.name}</p>
                  {repo.description && (
                    <p className="text-sm text-gray-600">{repo.description}</p>
                  )}
                  {repo.url && (
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {repo.url}
                    </a>
                  )}
                  <div className="text-sm text-gray-500">
                    Stars: {repo.stargazerCount || 0}, Forks:{" "}
                    {repo.forkCount || 0}
                  </div>

                  <button
                    onClick={() => handleToggleFavorite(repo.name)}
                    className={`mt-2 rounded px-3 py-1 text-sm font-medium ${
                      isFavorite
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">My Favorite Repos</h2>
          {favorites.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5">
              {favorites.map((fav) => (
                <li key={fav.name} className="text-gray-700 dark:text-gray-200">
                  {fav.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No favorites yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
