import axios from "axios";
import { useEffect, useState } from "react";

export default function UserTrackingPopup({customerId, close}) {
  const [list,setList] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/booking/track/"+email)
    .then(r=>setList(r.data));
  },[customerId]);

  return(
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white w-[800px] h-[80vh] p-6 rounded-xl overflow-auto">

        <h2 className="text-2xl font-bold mb-4">My Cylinder Tracking</h2>

        {list.map(o=>(
          <div key={o._id} className="border p-4 rounded mb-4">
            <b>Cylinder:</b> {o.cylinder.cylinderId}<br/>
            <b>Status:</b> {o.delivery.status}<br/>
            <b>Driver:</b> {o.delivery.driverName}<br/>
            <b>Location:</b> {o.cylinder.latitude},{o.cylinder.longitude}
          </div>
        ))}

        <button onClick={close} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  )
}
