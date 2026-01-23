import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecod: [],
};

/* ======================
   GET RAZORPAY KEY
====================== */
export const getRazorpayId = createAsyncThunk(
  "/razorpay/getId",
  async () => {
    try {
      const response = await axiosInstance.get("/payment/razorpay-key");
      return response.data;
    } catch (error) {
      toast.error("Failed to load Razorpay key");
      throw error;
    }
  }
);

/* ======================
   BUY SUBSCRIPTION
====================== */
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.post("/payment/subscribe");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Subscription failed");
      throw error;
    }
  }
);

/* ======================
   VERIFY PAYMENT
====================== */
export const verifyUserPayment = createAsyncThunk(
  "/payment/verify",
  async (data) => {
    try {
      const response = await axiosInstance.post("/payment/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment verification failed");
      throw error;
    }
  }
);

/* ======================
   GET PAYMENT RECORD (ADMIN)
====================== */
export const getPaymentRecord = createAsyncThunk(
  "/payment/record",
  async () => {
    try {
      const response = await axiosInstance.get("/payment?count=100");
      return response.data;
    } catch (error) {
      toast.error("Failed to get payment records");
      throw error;
    }
  }
);

/* ======================
   CANCEL SUBSCRIPTION
====================== */
export const cancelCourseBundle = createAsyncThunk(
  "/payment/cancel",
  async () => {
    try {
      const response = await axiosInstance.post("/payment/unsubscribe");
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel subscription");
      throw error;
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Razorpay Key */
      .addCase(getRazorpayId.fulfilled, (state, action) => {
        state.key = action.payload.key;
      })

      /* Purchase */
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action.payload.subscription_id;
      })

      /* Verify */
      .addCase(verifyUserPayment.fulfilled, (state) => {
        state.isPaymentVerified = true;
        toast.success("Payment verified successfully");
      })

      .addCase(verifyUserPayment.rejected, (state) => {
        state.isPaymentVerified = false;
      })

      /* Payment Records */
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action.payload.subscriptions || {};
      });
  },
});

export default razorpaySlice.reducer;
