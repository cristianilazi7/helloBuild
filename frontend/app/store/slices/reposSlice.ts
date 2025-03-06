"use client";

import { createSlice, createAsyncThunk, PayloadAction, createAction } from "@reduxjs/toolkit";

type Repo = {
  name: string;
  description?: string;
  url?: string;
  stargazerCount?: number;
  forkCount?: number;
};

export interface ViewerData {
    repos: Repo[];
    login: string;
    avatarUrl: string;
    followers: number;
    following: number;
  }

interface ReposState {
  repos: Repo[];
  favorites: Repo[];
  login: string;
  avatarUrl: string;
  followers: number;
  following: number;
  loading: boolean;
  error: string | null;
}

const initialState: ReposState = {
  repos: [],
  favorites: [],
  login: '',
  avatarUrl: '',
  followers: 0,
  following: 0,
  loading: false,
  error: null,
};

export const logoutRepo = createAction('repo/logout');

export const fetchRepos = createAsyncThunk<
    ViewerData,
  { token: string },
  { rejectValue: string }
>("repos/fetchRepos", async ({ token }, { rejectWithValue }) => {
  try {
    const body = {
      query: `
            query {
              viewer {
                login
                avatarUrl
                followers{totalCount}
                following{totalCount}
                repositories(first: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
                  nodes {
                    name
                    description
                    url
                    stargazerCount
                    forkCount
                  }
                }
              }
            }
          `,
    };

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Fetch error: ${res.status} - ${text}`);
    }

    const data = await res.json();
    console.log('data:::: = ', data);
    const viewer = data?.data?.viewer;
    if (!viewer) {
      throw new Error(data.message || "Failed to fetch repos");
    }

   // Extract relevant fields
   const reposData: Repo[] = viewer.repositories?.nodes || [];
    
   return {
    repos: reposData,
    login: viewer.login,
    avatarUrl: viewer.avatarUrl,
    followers: viewer.followers?.totalCount || 0,
    following: viewer.following?.totalCount || 0,
  } as ViewerData;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Repo>) => {
      const exists = state.favorites.find(
        (f) => f.name === action.payload.name,
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (f) => f.name !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload.repos;
        state.login = action.payload.login;
        state.avatarUrl = action.payload.avatarUrl;
        state.followers = action.payload.followers;
        state.following = action.payload.following;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutRepo, () => initialState);
  },
});

export const { addFavorite, removeFavorite } = reposSlice.actions;
export default reposSlice.reducer;
