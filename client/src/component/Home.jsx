import React from 'react'
import { Routes, Route } from 'react-router-dom'
import logo from "../assets/logo.gif";
import Card from './Card';
import cy1 from '../assets/cy1.png'
import cy2 from '../assets/cy2.png'
import cy3 from '../assets/cy3.png'
import cy4 from '../assets/cy4.png'
import cy5 from '../assets/cy5.png'
import cy6 from '../assets/cy6.png'
import { useState } from 'react';
import RegisterModal from './RegisterModal';
import LoginModal from './loginModel';
import Dashboard from "./Dashboard";
import AdminHome from '../admin/AdminHome';
import AdminLoginModal from "../admin/AdminLoginModal";
import { useNavigate } from "react-router-dom";



export default function Home() {
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [showDashboard, setShowDashboard] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);

    const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex bg-white-500">

  <div className="w-[150px] h-screen bg-red-600 rounded-t-full rounded-b-none 
                fixed left-0 top-0 flex flex-col items-center justify-center gap-6 text-white font-semibold z-50">


  <button className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">
    Home
  </button>

  <button onClick={()=>navigate("/about-system")} className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">
  About
</button>


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


  {/* Main Content */}
  
<div className="flex-1 flex flex-col items-center justify-start text-white text-2xl gap-6 pt-16">
  <h2 className="text-red-600 text-4xl font-bold mb-4 underline">
    User Page
  </h2>

  <img src={logo} alt="logo" className="w-40 h-40 rounded-full" />

  <h1 className="text-blue-500 text-3xl font-bold">
    Cylinder Tracking
  </h1>

  <div className="flex flex-col text-blue-500 text-xl font-semibold text-center max-w-xl">
    Optimize Cylinder Tracking, Minimize Losses

    <p className="text-base font-normal mt-2">
      Cylinders are an essential asset of the chemical-based industrial intermediates.
      Manual tracking of cylinders at every stage can lead to multiple errors like,
    </p>

   
  </div>
 {/* Bottom Full Height Left & Right Panels */}
<div className="flex w flex-1 mt-6 ml-35 gap-8">

  <Card img={cy1} title="Efficient Issue Resolution" />
  <Card img={cy2} title="Improved Customer Satisfaction" />
  <Card img={cy3} title="Accurate Compensation Management" />
  <Card img={cy4} title="Integration for Efficiency" />
  <Card img={cy5} title="Real-time Tracking" />
  <Card img={cy6} title="Loss Prevention" />

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
  )
}
