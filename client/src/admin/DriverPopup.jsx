import axios from "axios";
import { useEffect, useState } from "react";

export default function DriverPopup({ close }) {

  const [driver, setDriver] = useState({
    name: "",
    vehicleNo: "",
    phone: ""
  });

  const [drivers, setDrivers] = useState([]);

  const loadDrivers = async () => {
    const res = await axios.get("http://localhost:5000/api/drivers");
    setDrivers(res.data);
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const saveDriver = async () => {
    if (!driver.name || !driver.vehicleNo || !driver.phone) {
      alert("Fill all fields");
      return;
    }
    await axios.post("http://localhost:5000/api/drivers/add", driver);
    setDriver({ name: "", vehicleNo: "", phone: "" });
    loadDrivers();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white w-[850px] h-[90vh] p-6 overflow-auto rounded-xl">

        <h2 className="text-2xl font-bold mb-4">Driver Module</h2>

        <div className="grid grid-cols-3 gap-3">
          <input value={driver.name} onChange={e=>setDriver({...driver,name:e.target.value})} placeholder="Driver Name" className="border p-2 rounded"/>
          <input value={driver.vehicleNo} onChange={e=>setDriver({...driver,vehicleNo:e.target.value})} placeholder="Vehicle No" className="border p-2 rounded"/>
          <input value={driver.phone} onChange={e=>setDriver({...driver,phone:e.target.value})} placeholder="Phone" className="border p-2 rounded"/>
        </div>

        <button onClick={saveDriver} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mt-4">
          Add Driver
        </button>

        <h3 className="mt-6 text-lg font-bold">Driver List</h3>

        <table className="w-full border mt-2">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Vehicle No</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(d=>(
              <tr key={d._id}>
                <td className="border p-2">{d.name}</td>
                <td className="border p-2">{d.vehicleNo}</td>
                <td className="border p-2">{d.phone}</td>
                <td className="border p-2 text-center">
                  <button onClick={async()=>{
                    if(window.confirm("Delete this driver?")){
                      await axios.delete("http://localhost:5000/api/drivers/"+d._id);
                      loadDrivers();
                    }
                  }} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={close} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  );
}
