import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUserAPI = async (email: string, password: string) => {
  console.log("API_URL", API_URL);
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const messageInfo = errorData.message;
    throw new Error(messageInfo || "Login failed");
  }
  const data = await response.json();

  return { token: data.data.access_token, user: data.data.user }; // API returns a JWT token
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const data = await loginUserAPI(email, password);
    return data;
  },
);

/**
 * Thunk to send the GitHub code to the backend,
 * so the backend can store or exchange it for an access token.
 */
export const saveGitHubCode = createAsyncThunk<
  { success: boolean; message: string; code: string },
  { code: string; id: number; token: string },
  { rejectValue: string }
>("auth/saveGitHubCode", async ({ code, id, token }, { rejectWithValue }) => {
  try {
   
    const response = await fetch(`${API_URL}/auth/github/code`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ id, githubToken: code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save GitHub code");
    }

    // Example: server might return { success: true, message: 'Code stored' }
    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
      code: data.data.github_token,
    };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
