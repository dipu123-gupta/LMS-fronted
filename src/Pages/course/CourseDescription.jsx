// import button from "daisyui/components/button";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate=useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  useEffect(() => {
  console.log(state);
}, [state]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex items-center justify-center text-white">
        <div className="grid grid-cols-2 gap-12 py-12 px-12 rounded-2xl bg-gradient-to-br from-[#1A2238] to-[#0F172A] shadow-2xl border border-gray-700">
          {/* LEFT CARD */}
          <div className="space-y-6 bg-[#111827] p-6 rounded-xl shadow-lg border border-gray-700">
            <img
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
              className="w-full h-64 object-cover object-center rounded-xl border border-gray-600 transition-transform duration-300 hover:scale-105"
            />

            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center text-lg gap-2">
                <p className="font-semibold">
                  <span className="text-yellow-400">Total lectures:</span>{" "}
                  {state?.numberOfLectures}
                </p>

                <p className="font-semibold">
                  <span className="text-yellow-400">Instructor:</span>{" "}
                  {state?.createdBy}
                </p>
              </div>

              {role === "admin" || data?.subscription?.status === "active" ? (
                <button onClick={()=>navigate("/course/diplaylactures",{state:{...state}})} className="bg-yellow-500 text-lg rounded-lg font-bold px-5 py-3 w-full hover:bg-yellow-400 transition-all duration-300 shadow-md">
                  Watch lectures
                </button>
              ) : (
                <button onClick={()=>navigate('/checkout')} className="bg-yellow-500 text-lg rounded-lg font-bold px-5 py-3 w-full hover:bg-yellow-300 transition-all duration-300 shadow-md">
                  Subscribe now
                </button>
              )}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="space-y-4 bg-[#111827] p-8 rounded-xl shadow-lg border border-gray-700">
            <h1 className="text-4xl font-extrabold text-yellow-400 mb-4 text-center">
              {state?.title}
            </h1>

            <p className="text-yellow-400 font-semibold text-lg">
              Course Description
            </p>
            <p className="text-gray-300 leading-relaxed">
              {state?.description}
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
