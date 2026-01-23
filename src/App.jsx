import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./Pages/HomePage.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Courses from "./Pages/course/Courses.jsx";
import Contact from "./Pages/Contact.jsx";
import Denied from "./Pages/Denied.jsx";
import CourseDescription from "./Pages/course/CourseDescription.jsx";

import RequireAuth from "./Components/Auth/RequireAuth.jsx";
import CreateCourse from "./Pages/course/CreateCourse.jsx";
import Profile from "./Pages/User/Profile.jsx";
import EditProfile from "./Pages/User/EditProfile.jsx";

function App() {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/course/description" element={<CourseDescription />} />
      <Route path="/denied" element={<Denied />} />

      {/* 🔐 Admin Protected Routes */}
      <Route element={<RequireAuth allowedRole={["admin"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
      </Route>

      {/* 🔐 User + Admin Protected Routes */}
      <Route element={<RequireAuth allowedRole={["admin", "user"]} />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/editProfile" element={<EditProfile />} />
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
