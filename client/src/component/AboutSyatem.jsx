import React from "react";
import logo from "../assets/logo.gif";
import { useState } from 'react';
import RegisterModal from './RegisterModal';
import LoginModal from './loginModel';
import Dashboard from "./Dashboard";
import AdminHome from '../admin/AdminHome';
import AdminLoginModal from "../admin/AdminLoginModal";
import { useNavigate } from "react-router-dom";


export default function AboutSystem() {
  const [open, setOpen] = useState(false);
      const [loginOpen, setLoginOpen] = useState(false);
      const [userName, setUserName] = useState("");
      const [showDashboard, setShowDashboard] = useState(false);
      const [adminOpen, setAdminOpen] = useState(false);
   const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex bg-white-500">

      {/* LEFT BAR */}
      <div className="w-[150px] h-screen bg-red-600 rounded-t-full rounded-b-none 
        fixed left-0 top-0 flex flex-col items-center justify-center gap-6 text-white font-semibold z-50">

        <button className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">Home</button>
        <button className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">About</button>
        <button onClick={() => setOpen(true)} className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">
    Register
  </button>
        <button  onClick={() => setLoginOpen(true)} className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">
    Login
  </button>
        <button
  onClick={() => setAdminOpen(true)}
  className="hover:bg-red-800 w-full text-center py-2 rounded-md transition"
>
  Admin
</button>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col items-center text-blue-600 text-xl pt-16 ml-40 gap-6">

        <h2 className="text-red-600 text-4xl font-bold underline">Cylinder Tracking Management</h2>
        <img src={logo} className="w-36 h-36 rounded-full"/>

        <div className="max-w-4xl text-center leading-8">
          A Cylinder Tracking Management System is a digital platform used to monitor the life cycle of gas cylinders
          from warehouse to customer and back again. It reduces losses, prevents misuse, and improves safety compliance.
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6 w-full max-w-5xl">

          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="font-bold text-red-600">Cylinder Registration</h3>
            Each cylinder is registered with unique ID and ownership history.
          </div>

          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="font-bold text-red-600">Booking System</h3>
            Customers can book refills online.
          </div>

          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="font-bold text-red-600">Driver Assignment</h3>
            Orders are auto or manually assigned to drivers.
          </div>

          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="font-bold text-red-600">Live Delivery Tracking</h3>
            Monitor cylinder movement in real time.
          </div>

          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="font-bold text-red-600">Cylinder History</h3>
            Track warehouse → customer → warehouse movement.
          </div>

          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h3 className="font-bold text-red-600">Loss Prevention</h3>
            Detect missing cylinders and misuse.
          </div>

        </div>
      </div>
      <RegisterModal isOpen={open} onClose={() => setOpen(false)} openLogin={() => setLoginOpen(true)}/>
        <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={(name) => { setUserName(name); setShowDashboard(true);}}/>
          <AdminLoginModal 
            isOpen={adminOpen}
            onClose={() => setAdminOpen(false)}
            onAdminSuccess={() => navigate("/admin")}
          />
    </div>
  );
}