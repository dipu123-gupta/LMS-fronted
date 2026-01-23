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
import Profile from './Pages/profile.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="/course/description" element={<CourseDescription />} />

      {/* 🔐 protected route */}
      <Route element={<RequireAuth allowedRole={["admin"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
      </Route>

      <Route element={<Profile allowedRole={["admin",'user']} />}>
        <Route path="/user/profile" element={<CreateCourse />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
