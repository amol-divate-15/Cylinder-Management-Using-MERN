import React from "react";
import logo from "../assets/logo.gif";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const handleChange = (e) => {
  setLogin({ ...login, [e.target.name]: e.target.value });
};

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/user/login", login);
    onLoginSuccess(res.data.user.name);   // send name to Home
    onClose(); 
    navigate("/dashboard", {
  state: { userName: res.data.user.name }
});

    alert("Welcome " + res.data.user.name);
    console.log(res.data);
  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-[1000px] h-[900px] rounded-2xl shadow-2xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-600 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl text-blue-600 font-bold text-center mb-4">
          Login User
        </h2>

        <div className="flex-1 flex flex-col items-center justify-start text-white text-2xl gap-6 pt-16">
          <img src={logo} alt="logo" className="w-40 h-40 rounded-full" />
          <h1 className="text-blue-500 text-3xl font-bold">
            Cylinder Tracking
          </h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">

          {/* Email */}
          <input
            onChange={handleChange}
            name="email"
            placeholder="Email"
            className="border p-2 rounded-full w-[400px] outline-blue-400 mt-9 ml-70"
          />

          {/* Password */}
          <input
            onChange={handleChange}
            name="password"
            placeholder="Password"
            className="border p-2 rounded-full w-[400px] outline-blue-400 mt-9 ml-70"
          />

          <button type="submit" className="bg-red-600 h-[100px] w-[300px] hover:bg-red-700 text-blue-300 font-bold py-2 rounded-full mt-3 ml-80">
            Login
          </button>
          

        </form>
        <button
  onClick={() => navigate("/update-password")}
  className="bg-red-500 text-white px-4 py-2 rounded-full mt-4">
  Forgot Password
</button>

      </div>
    </div>
  );
}
