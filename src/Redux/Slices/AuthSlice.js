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

 extraReducers: (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
    localStorage.setItem(
      "data",
      JSON.stringify(action?.payload?.user)
    );

    localStorage.setItem("isLogedIn", "true"); // string hona chahiye

    localStorage.setItem(
      "role",
      action?.payload?.user?.role   // ✅ FIX HERE
    );

    state.isLoginedIn = true;
    state.data = action?.payload?.user;
    state.role = action?.payload?.user?.role;
  });
},

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

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/user/login", data);
    toast.promise(res, {
      loading: "wait authentication  in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// export const {}=authSlice.actions;

export default authSlice.reducer;
