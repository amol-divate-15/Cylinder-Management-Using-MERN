import axios from "axios";
import { useEffect, useState } from "react";

export default function CylinderPopup({ close }) {

  const [form, setForm] = useState({
  cylinderId:"", qrCode:"", gasType:"", category:"", capacity:"",
  status:"", currentLocation:"", owner:""
});

  const [list, setList] = useState([]);

  useEffect(() => { load(); }, []);
  const load = async()=> {
    const res = await axios.get("http://localhost:5000/api/cylinders");
    setList(res.data);
  }

  const save = async () => {
  if(!form.category){
    alert("Select category");
    return;
  }
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
        <select
  onChange={e=>setForm({...form, category:e.target.value})}
  className="border p-2 mb-3"
>
  <option value="">Select Category</option>
  <option value="Domestic">Domestic</option>
  <option value="Commercial">Commercial</option>
  <option value="Medical">Medical</option>
  <option value="Industrial">Industrial</option>
</select>

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
  <thead className="bg-gray-200">
    <tr>
      <th>ID</th>
      <th>QR</th>
      <th>Gas</th>
      <th>Category</th>
      <th>Capacity</th>
      <th>Status</th>
      <th>Location</th>
      <th>Owner</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {list.map(c=>(
      <tr key={c._id}>
        <td>{c.cylinderId}</td>
        <td>{c.qrCode}</td>
        <td>{c.gasType}</td>
        <td className="font-bold text-blue-700">{c.category}</td>
        <td>{c.capacity}</td>
        <td>{c.status}</td>
        <td>{c.currentLocation}</td>
        <td>{c.owner}</td>
        <td>
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