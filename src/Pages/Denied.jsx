import React from "react";
import { useNavigate } from "react-router";

const Denied = () => {
  const navigate = useNavigate();
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-semibold text-white tracking-wide">403</h1>
      <div className="absolute -translate-y-5 bg-black text-white px-3 py-1 text-sm rounded-md rotate-12">
        Access Denied
      </div>

      <button onClick={() => navigate(-1)} className="mt-2">
        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current hover:bg-yellow-500 duration-300">
          Go back
        </span>
      </button>
    </main>
  );
};

export default Denied;
