import {configureStore}from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import courseSlice from './Slices/CourseSlice.js'

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        Courses:courseSlice
    },
    devTools:true,
})


export default store;