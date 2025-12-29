import axios from "axios";
import { useEffect, useState } from "react";

export default function CylinderLiveMap({close}) {
  const [list,setList] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/cylinders").then(r=>setList(r.data));
  },[]);

  return(
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white w-[900px] h-[90vh] p-6 rounded-xl overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Live Cylinder Locations</h2>

        {list.map(c=>(
          <div key={c._id} className="border p-2 mb-2 rounded">
            <b>{c.cylinderId}</b> – {c.latitude},{c.longitude}
          </div>
        ))}

        <button onClick={close} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  )
}
