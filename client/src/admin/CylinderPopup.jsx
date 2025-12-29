import axios from "axios";
import { useEffect, useState } from "react";

export default function CylinderPopup({ close }) {

  const [form, setForm] = useState({
    cylinderId:"", qrCode:"", gasType:"", capacity:"",
    status:"", currentLocation:"", owner:""
  });

  const [list, setList] = useState([]);

  useEffect(() => { load(); }, []);
  const load = async()=> {
    const res = await axios.get("http://localhost:5000/api/cylinders");
    setList(res.data);
  }

  const save = async () => {
    await axios.post("http://localhost:5000/api/cylinders/add", form);
    load();
  }

  const del = async (id)=>{
    await axios.delete("http://localhost:5000/api/cylinders/"+id);
    load();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white w-[900px] p-6 rounded-xl overflow-auto h-[90vh]">

        <h2 className="text-2xl font-bold mb-4">Cylinder Module</h2>

        <div className="grid grid-cols-3 gap-3">
          {Object.keys(form).map(key=>(
            <input key={key}
              placeholder={key}
              className="border p-2"
              onChange={e=>setForm({...form,[key]:e.target.value})}/>
          ))}
        </div>

        <button onClick={save} className="bg-red-600 text-white px-6 py-2 mt-4 rounded">Add Cylinder</button>

        <table className="w-full mt-6 border">
          <thead><tr>{Object.keys(form).map(h=><th key={h} className="border p-2">{h}</th>)}<th>Action</th></tr></thead>
          <tbody>
            {list.map(c=>(
              <tr key={c._id}>
                {Object.keys(form).map(k=><td key={k} className="border p-2">{c[k]}</td>)}
                <td className="border p-2">
                  <button onClick={()=>del(c._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={close} className="mt-4 bg-red-600 h-[40px] w-[90px] text-white px-6 py-2 mt-4 rounded">Close</button>
      </div>
    </div>
  )
}
