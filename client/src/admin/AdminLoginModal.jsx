import React, { useState } from "react";
import axios from "axios";

export default function AdminLoginModal({ isOpen, onClose, onAdminSuccess }) {
  if (!isOpen) return null;

  const [admin, setAdmin] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/login", admin);
      alert("Admin Login Successful");
      onAdminSuccess();
      onClose();
    } catch (err) {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-2xl p-6">

        <h2 className="text-red-600 text-2xl font-bold text-center mb-4">Admin Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input name="username" placeholder="Admin Username" onChange={handleChange} className="border p-2 rounded"/>
          <input name="password" placeholder="Admin Password" onChange={handleChange} className="border p-2 rounded"/>
          <button className="bg-red-600 text-white py-2 rounded">Login</button>
        </form>

        <button onClick={onClose} className="mt-3 text-red-500 w-full">Close</button>
      </div>
    </div>
  );
}
