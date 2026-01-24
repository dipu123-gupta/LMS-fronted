import {configureStore}from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice.js'
import courseSlice from './Slices/CourseSlice.js'
import razorpaySlice from './Slices/RazorpaySlice.js'


const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        Courses:courseSlice,
        razorpay:razorpaySlice,
    },
    devTools:true,
})


export default store;