import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import React from "react";
import { Link } from "react-router-dom";

const CheckOutSuccess = () => {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white bg-gradient-to-br from-[#0f172a] to-[#020617]">
        <div className="w-96 h-[28rem] flex flex-col justify-center items-center  bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.7)]  rounded-2xl relative overflow-hidden">

          {/* Header */}
          <h1 className="bg-green-500 absolute top-0 w-full py-4 text-center  text-2xl font-bold tracking-wide">
            Payment Successfully
          </h1>

          {/* Content */}
          <div className="px-6 flex flex-col items-center justify-center gap-4 mt-10">
            <AiFillCheckCircle className="text-green-400 text-6xl drop-shadow-lg" />

            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-green-400">
                Welcome to the Pro Bundle
              </h2>
              <p className="text-gray-300 text-sm">
                Now you can enjoy all the courses without limits 🚀
              </p>
            </div>
          </div>

          {/* Button */}
          <Link
            to="/"
            className="absolute bottom-0 w-full text-center 
                       bg-green-500 hover:bg-green-600 
                       transition-all duration-300 
                       py-3 font-bold text-lg"
          >
            <button>Go to Dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckOutSuccess;
