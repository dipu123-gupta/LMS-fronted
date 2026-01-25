import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import courseSlice from "./Slices/CourseSlice.js";
import razorpaySlice from "./Slices/RazorpaySlice.js";
import lectureSlice from "./Slices/LectureSlice.js"; // ✅ ADD THIS
import passwordReducer from "./Slices/PasswordSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    Courses: courseSlice,
    razorpay: razorpaySlice,
    lecture: lectureSlice, // ✅ THIS FIXES EVERYTHING
    password: passwordReducer,
  },
  devTools: true,
});

export default store;
