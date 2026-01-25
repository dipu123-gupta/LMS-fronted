import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {},
  // data: JSON.parse(localStorage.getItem("data")) || {},
  // ? JSON.parse(localStorage.getItem("data"))
  // : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/user/register", data);
    toast.promise(res, {
      loading: "Creating account...",
      success: (data) => data?.data?.message,
      error: "Failed to create account",
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
      loading: "Authenticating...",
      success: (data) => data?.data?.message,
      error: "Failed to login",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("/user/logout");
    toast.promise(res, {
      loading: "Logging out...",
      success: (data) => data?.data?.message,
      error: "Failed to logout",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async ({ id, formData }) => {
    const res = axiosInstance.put(`/user/update`, formData);
    toast.promise(res, {
      loading: "Updating profile...",
      success: (data) => data?.data?.message,
      error: "Failed to update profile",
    });
    return (await res).data;
  },
);

export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("/user/profile");
    return (await res).data;
  } catch (error) {
    toast.error(error?.message);
  }
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/change-password", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload.user;
        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);
        state.isLoggedIn = true;
        state.data = user;
        state.role = user.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        const user = action.payload.user;
        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);
        state.isLoggedIn = true;
        state.data = user;
        state.role = user.role;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.data = null;
      })
      .addCase(changePassword.rejected, (_, action) => {
        toast.error(action.payload?.message || "Failed to change password");
      });
  },
});

export default authSlice.reducer;
