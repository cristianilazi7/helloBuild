'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/app/interfaces/user';
import { registerUser } from '@/app/service/user-service';
import { saveGitHubCode } from '@/app/service/auth-service';


// Initial state for auth
const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  githubAccess: false,
  user: null,
  token: null,
  githubToken: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.githubAccess = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.githubAccess = false;
      state.token = null;
      state.user = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.githubAccess = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },
    resetAuthError(state) {
      state.error = null;
    },
  },
  // Handle async actions in extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.githubAccess = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.githubAccess = false;
        state.token = null;
        state.user = null;
        state.error = action.payload as string;
      })
      .addCase(saveGitHubCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveGitHubCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.githubToken = action.payload.code;
        state.githubAccess = true;
      })
      .addCase(saveGitHubCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export your existing actions if needed
export const {
  authStart,
  authSuccess,
  authFailure,
  logout,
  resetAuthError,
} = authSlice.actions;

export default authSlice.reducer;
