import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUserAPI = async (email: string, password: string) => {
    console.log('API_URL',API_URL);
    const response = await fetch(`${API_URL}/auth/register`, {
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
      throw new Error(messageInfo || "Register failed");
    }
    const data = await response.json();
    console.log('data',data.data.user)
    return {token: data.data.access_token, user: data.data.user}; 
  };

  // Thunk to register a new user
export const registerUser = createAsyncThunk<
{ token: string; user: User },       
{ email: string; password: string }, 
{ rejectValue: string } 
>(
'auth/registerUser',
async ({ email, password }, { rejectWithValue }) => {
  try {

    const data = await registerUserAPI(email, password);
    return { token: data.token, user: data.user };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
}
);