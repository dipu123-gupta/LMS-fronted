import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Slices/AuthSlice.js";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    const res = await dispatch(changePassword(formData));

    if (res?.payload?.success) {
      toast.success(res.payload.message);
      navigate("/login"); // 👈 force re-login
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <form
          onSubmit={handleSubmit}
          className="w-96 p-6 bg-[#0f172a] rounded-xl shadow-lg space-y-4"
        >
          <h1 className="text-xl font-bold text-yellow-400 text-center">
            Change Password
          </h1>

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange}
            className="w-full px-3 py-2 bg-transparent border rounded"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            className="w-full px-3 py-2 bg-transparent border rounded"
          />

          <button className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-500">
            Update Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ChangePassword;
