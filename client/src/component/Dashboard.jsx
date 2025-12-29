
import logo from "../assets/logo.gif";
import Card from './Card';
import cy1 from '../assets/cy1.png'
import cy2 from '../assets/cy2.png'
import cy3 from '../assets/cy3.png'
import cy4 from '../assets/cy4.png'
import cy5 from '../assets/cy5.png'
import cy6 from '../assets/cy6.png'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BookingModal from "./BookingModal";
import { useState } from "react";
import UserTrackingPopup from "./UserTrackingPopup";




export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [openBooking, setOpenBooking] = useState(false);
    const [trackOpen,setTrackOpen]=useState(false);
 



const handleLogout = () => {
  navigate("/");   // redirect to Home page
};

const userName = location.state?.userName;
const email = location.state?.email;

    
  return (
    <div className="w-screen h-screen flex bg-white-500">

        <div className="w-[150px] h-screen bg-red-600 rounded-t-full rounded-b-none 
                fixed left-0 top-0 flex flex-col items-center justify-center gap-6 text-white font-semibold z-50">

  <button className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">
    Home
  </button>

  <button onClick={() => setOpenBooking(true)} className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">
  Booking
</button>


  <button onClick={()=>setTrackOpen(true)} className="hover:bg-red-800 w-full py-2">
Track 
</button>


  <button onClick={handleLogout} className="hover:bg-red-800 w-full text-center py-2 rounded-md transition">
    Log out
  </button>

</div>


  {/* Main Content */}
<div className="flex-1 flex flex-col items-center justify-start text-white text-2xl gap-6 pt-16">
  <img src={logo} alt="logo" className="w-40 h-40 rounded-full" />

  <h1 className="text-blue-500 text-3xl font-bold">
  {userName ? `Welcome, ${userName}` : "Cylinder Tracking"}
</h1>

    
  <div className="flex flex-col text-blue-500 text-xl font-semibold text-center max-w-xl">
    Optimize Cylinder Tracking, Minimize Losses

    <p className="text-base font-normal mt-2">
      Cylinders are an essential asset of the chemical-based industrial intermediates.
      Manual tracking of cylinders at every stage can lead to multiple errors like,
    </p>

   
  </div>
 {/* Bottom Full Height Left & Right Panels */}
<div className="flex w- flex-1 mt-6 ml-35 gap-8">

  <Card img={cy1} title="Efficient Issue Resolution" />
  <Card img={cy2} title="Improved Customer Satisfaction" />
  <Card img={cy3} title="Accurate Compensation Management" />
  <Card img={cy4} title="Integration for Efficiency" />
  <Card img={cy5} title="Real-time Tracking" />
  <Card img={cy6} title="Loss Prevention" />

</div>
</div>
{openBooking && <BookingModal close={() => setOpenBooking(false)} />}
 {trackOpen && <UserTrackingPopup email={email} close={()=>setTrackOpen(false)} />}


</div>
  )
}
