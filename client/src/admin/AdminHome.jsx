import React from 'react'
import { Routes, Route } from 'react-router-dom'
import logo from "../assets/logo.gif";
import Card from '../component/Card';
import cy1 from '../assets/cy1.png'
import cy2 from '../assets/cy2.png'
import cy3 from '../assets/cy3.png'
import cy4 from '../assets/cy4.png'
import cy5 from '../assets/cy5.png'
import cy6 from '../assets/cy6.png'
import { useState } from 'react';
import AdminOrdersPopup from "./AdminOrdersPopup";
import DashboardPopup from "./DashboardPopup";
import CylinderPopup from "./CylinderPopup";
import DriverPopup from "./DriverPopup";

import CylinderHistoryPopup from "./CylinderHistoryPopup";
import DeliveryTimelinePopup from "./DeliveryTimelinePopup";
import CylinderLiveMap from "./CylinderLiveMap";
import TrackingPopup from "./TrackingPopup";
import ReportPopup from "./ReportPopup";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
    
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [ordersOpen, setOrdersOpen] = useState(false);
    const [cylinderOpen,setCylinderOpen] = useState(false);
    const [driverOpen,setDriverOpen]=useState(false);

const [trackingOpen,setTrackingOpen] = useState(false);
const [historyOpen,setHistoryOpen] = useState(false);
const [timelineOpen,setTimelineOpen] = useState(false);
const [mapOpen,setMapOpen] = useState(false);
const [reportOpen,setReportOpen]=useState(false);
const navigate = useNavigate();



    
  return (
    <div className="w-screen h-screen flex bg-white-500">

  <div className="w-[150px] h-screen bg-red-600 rounded-t-full rounded-b-none 
                 left-0 top-0 flex flex-col items-center justify-center gap-6 text-white font-semibold z-50">


  <button 
  onClick={() => setDashboardOpen(true)} 
  className="hover:bg-red-800 w-full text-center py-2 rounded-md transition"
>
  Dashboard
</button>

  <button onClick={()=>setCylinderOpen(true)} className="hover:bg-red-800 w-full py-2">Cylinders</button>

  

  <button onClick={() => setOrdersOpen(true)} className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">
  Orders
</button>


  <button onClick={()=>setDriverOpen(true)} className="hover:bg-red-800 w-full py-2">Drivers</button>


  <button 
  onClick={()=>setTrackingOpen(true)} 
  className="hover:bg-red-800 w-full py-2">
  Tracking
</button>


  <button onClick={()=>setReportOpen(true)} className="hover:bg-red-800 w-full py-2">
Reports
</button>


  <button 
  onClick={() => {
    localStorage.removeItem("adminToken"); // optional future use
    navigate("/");
  }}
  className="hover:bg-red-800 w-full py-2"
>
  Logout
</button>


</div>


  {/* Main Content */}
  
<div className="flex-1 flex flex-col items-center justify-start text-white text-2xl gap-6 pt-16">
  <h2 className="text-red-600 text-4xl font-bold mb-4 underline">
    Admin Page
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
<div className="flex w flex-1 mt-6 ml-3 gap-8">

  <Card img={cy1} title="Efficient Issue Resolution" />
  <Card img={cy2} title="Improved Customer Satisfaction" />
  <Card img={cy3} title="Accurate Compensation Management" />
  <Card img={cy4} title="Integration for Efficiency" />
  <Card img={cy5} title="Real-time Tracking" />
  <Card img={cy6} title="Loss Prevention" />

</div>
</div>


<DashboardPopup 
   isOpen={dashboardOpen} 
   onClose={() => setDashboardOpen(false)} 
/>
{ordersOpen && <AdminOrdersPopup close={() => setOrdersOpen(false)} />}
  {cylinderOpen && <CylinderPopup close={()=>setCylinderOpen(false)} />}
    {driverOpen && <DriverPopup close={()=>setDriverOpen(false)} />}


{trackingOpen && (
  <TrackingPopup
    close={()=>setTrackingOpen(false)}
    openHistory={()=>{setTrackingOpen(false); setHistoryOpen(true)}}
    openTimeline={()=>{setTrackingOpen(false); setTimelineOpen(true)}}
    openMap={()=>{setTrackingOpen(false); setMapOpen(true)}}
  />
)}

{historyOpen && <CylinderHistoryPopup close={()=>setHistoryOpen(false)} />}
{timelineOpen && <DeliveryTimelinePopup close={()=>setTimelineOpen(false)} />}
{mapOpen && <CylinderLiveMap close={()=>setMapOpen(false)} />}
  {reportOpen && <ReportPopup close={()=>setReportOpen(false)} />}



</div>
  )
}
