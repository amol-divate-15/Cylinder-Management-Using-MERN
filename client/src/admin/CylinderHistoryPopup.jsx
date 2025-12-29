import axios from "axios";
import { useEffect, useState } from "react";

export default function CylinderHistoryPopup({close}) {
  const [list,setList] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/history").then(r=>setList(r.data));
  },[]);

  return(
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white w-[900px] h-[90vh] p-6 overflow-auto rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Cylinder Movement History</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>Cylinder</th><th>From</th><th>To</th><th>Driver</th><th>Action</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {list.map(h=>(
              <tr key={h._id}>
                <td>{h.cylinderId}</td>
                <td>{h.fromOwner}</td>
                <td>{h.toOwner}</td>
                <td>{h.driverName}</td>
                <td>{h.action}</td>
                <td>{new Date(h.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={close} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  )
}
