import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  isLoginedIn: localStorage.getItem("isLoginedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/user/register", data);
    toast.promise(res, {
      loading: "wait creating your accaunt",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create Account",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// export const {}=authSlice.actions;

export default authSlice.reducer;
