import React from "react";
import logo from "../assets/logo.gif";
import { useState } from "react";
import axios from "axios";

export default function RegisterModal({ isOpen, onClose, openLogin }) {
  if (!isOpen) return null;
  const [form, setForm]=useState({
    name:"",
    email:"",
    password:"",
    address:""
  });

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try {
            const res=await axios.post("http://localhost:5000/api/user/register",form);
      alert("Registered Successfully");
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));


      onClose();      // close Register popup
    openLogin();    // open Login popup
    console.log(res.data);
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed");
        }
    }

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
          Register User
        </h2>

        <div className="flex-1 flex flex-col items-center justify-start text-white text-2xl gap-6 pt-16">
        
          <img src={logo} alt="logo" className="w-40 h-40 rounded-full" />
        
          <h1 className="text-blue-500 text-3xl font-bold">
            Cylinder Tracking
          </h1>
        </div>
            
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input name="name" onChange={handleChange} placeholder="Full Name"
            className="border p-2 rounded-full w-[400px] outline-blue-400 mt-9 ml-70"/>

          <input name="email" onChange={handleChange} placeholder="Email"
            className="border p-2 rounded-full w-[400px] outline-blue-400 mt-9 ml-70"/>

          <input name="password" onChange={handleChange} placeholder="Password"
            className="border p-2 rounded-full w-[400px] outline-blue-400 mt-9 ml-70"/>

            <input name="address" onChange={handleChange} placeholder="Address"
            className="border p-2 rounded-full w-[400px] outline-blue-400 mt-9 ml-70"/>

          <button type="submit" className="bg-red-600 h-[100px] w-[300px] hover:bg-red-700 text-blue-300 font-bold py-2 rounded-full mt-3 ml-80">
            Register
          </button>

        </form>
       
      </div>
    </div>
  );
}