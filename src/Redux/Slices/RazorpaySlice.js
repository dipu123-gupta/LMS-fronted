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
// export const getRazorpayId = createAsyncThunk(
//   "/razorpay/getId",
//   async () => {
//     try {
//       const response = await axiosInstance.get("/payment/razorpay-key");
//       return response.data;
//     } catch (error) {
//       toast.error("Failed to load Razorpay key");
//       throw error;
//     }
//   }
// );

export const getRazorpayId = createAsyncThunk("razorpay/getKey", async () => {
  const res = await axiosInstance.get("/payment/razorpay-key");
  return res.data.key;
});

/* ======================
   BUY SUBSCRIPTION
====================== */
// export const purchaseCourseBundle = createAsyncThunk(
//   "/purchaseCourse",
//   async () => {
//     try {
//       const response = await axiosInstance.post("/payment/subscribe");
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Subscription failed");
//       throw error;
//     }
//   }
// );

export const purchaseCourseBundle = createAsyncThunk(
  "razorpay/subscribe",
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payment/subscribe", {
        courseId,
      });

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Subscription failed");
      return rejectWithValue(error.response.data);
    }
  },
);
/* ======================
   VERIFY PAYMENT
====================== */
// export const verifyUserPayment = createAsyncThunk(
//   "/payment/verify",
//   async (data) => {
//     try {
//       const response = await axiosInstance.post("/payment/verify", {
//         razorpay_payment_id: data.razorpay_payment_id,
//         razorpay_subscription_id: data.razorpay_subscription_id,
//         razorpay_signature: data.razorpay_signature,
//       });
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Payment verification failed");
//       throw error;
//     }
//   }
// );

export const verifyUserPayment = createAsyncThunk(
  "razorpay/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payment/verify", data);
      return res.data;
    } catch (error) {
      toast.error("Payment verification failed");
      return rejectWithValue(error.response.data);
    }
  },
);
/* ======================
   GET PAYMENT RECORD (ADMIN)
====================== */
export const getPaymentRecord = createAsyncThunk(
  "/payment/record",
  async () => {
    try {
      const response = await axiosInstance.get("/payment/stats");
      return response.data;
    } catch (error) {
      toast.error("Failed to get payment records");
      throw error;
    }
  },
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
      toast.error(
        error?.response?.data?.message || "Failed to cancel subscription",
      );
      throw error;
    }
  },
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Razorpay Key */
      // .addCase(getRazorpayId.fulfilled, (state, action) => {
      //   state.key = action.payload.key;
      // })

      .addCase(getRazorpayId.fulfilled, (state, action) => {
        state.key = action.payload;
      })

      /* Purchase */
      // .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
      //   state.subscription_id = action.payload.subscription_id;
      // })

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
        state.allPayments = {
          count: action.payload.count || 0,
        };
        state.monthlySalesRecod = action.payload.monthlySalesRecod || [];
      });
  },
});

export default razorpaySlice.reducer;
