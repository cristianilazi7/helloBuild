'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET;

// Async thunk to request GitHub access
export const requestGithubAccess = createAsyncThunk(
    'github/requestAccess',
    async (_, thunkAPI) => {
      try {
        
        const response = await fetch('http://localhost:3000/github/access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to request GitHub access');
        }
        const data = await response.json();
        return data; // This could be an access token or some status message
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );