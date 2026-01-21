import {configureStore}from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from './Slices/CourseSlice.js'

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        Courses:courseSliceReducer
    },
    devTools:true,
})


export default store;