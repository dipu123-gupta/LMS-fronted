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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route element={<RequireAuth allowedRole={["admin"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
