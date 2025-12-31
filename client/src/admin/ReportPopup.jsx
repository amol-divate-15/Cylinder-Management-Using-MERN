import axios from "axios";
import { useEffect, useState } from "react";

export default function ReportPopup({ close }) {
  const [data,setData] = useState(null);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/reports")
    .then(res=>setData(res.data));
  },[]);

  if(!data) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[999]">
      <div className="bg-white w-[900px] h-[90vh] p-6 rounded-xl overflow-auto">

        <h2 className="text-2xl font-bold mb-4">Admin Reports</h2>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="border p-4 rounded">Total Cylinders<br/><b>{data.totalCylinders}</b></div>
          <div className="border p-4 rounded">Delivered Today<br/><b>{data.deliveredToday}</b></div>
          <div className="border p-4 rounded">Pending Deliveries<br/><b>{data.pending}</b></div>
          <div className="border p-4 rounded">Damaged Cylinders<br/><b>{data.damaged}</b></div>
        </div>

        <h3 className="mt-6 font-bold">Customer Wise Usage</h3>
        {data.customerUsage.map((c,i)=>(
          <div key={i} className="border p-2">{c._id || "Unknown"} → {c.total}</div>
        ))}

        <h3 className="mt-6 font-bold">Driver Performance</h3>
        {data.driverPerformance.map((d,i)=>(
          <div key={i} className="border p-2">{d._id || "Unknown"} → {d.deliveries} Deliveries</div>
        ))}

        <button onClick={close} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  );
}