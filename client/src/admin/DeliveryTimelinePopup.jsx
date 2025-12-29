import axios from "axios";
import { useEffect, useState } from "react";

export default function DeliveryTimelinePopup({close}) {
  const [list,setList] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/delivery").then(r=>setList(r.data));
  },[]);

  return(
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white w-[900px] h-[90vh] p-6 overflow-auto rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Delivery Timeline</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>Order</th><th>Cylinder</th><th>Driver</th>
              <th>Assigned</th><th>Delivered</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map(d=>(
              <tr key={d._id}>
                <td>{d.orderId}</td>
                <td>{d.cylinderId}</td>
                <td>{d.driverName}</td>
                <td>{new Date(d.createdAt).toLocaleString()}</td>
                <td>{d.deliveredAt ? new Date(d.deliveredAt).toLocaleString() : "-"}</td>
                <td>{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={close} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  )
}
