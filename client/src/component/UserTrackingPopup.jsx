import axios from "axios";
import { useEffect, useState } from "react";

export default function UserTrackingPopup({ close }) {

  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const [list, setList] = useState([]);

  useEffect(() => {
    if(user?.email){
      axios.get("http://localhost:5000/api/booking/track/" + user.email)
        .then(res => setList(res.data));
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white w-[850px] h-[85vh] p-6 rounded-xl overflow-auto">

        <h2 className="text-2xl font-bold mb-4 text-center">My Cylinder Tracking</h2>

        {list.length === 0 && (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}

        {list.map(o => (
          <div key={o._id} className="border rounded-xl p-4 mb-4 bg-blue-50 shadow">

            <div className="grid grid-cols-2 gap-3 text-sm">
              <p><b>Order ID:</b> {o._id}</p>
              <p><b>Booking Date:</b> {new Date(o.createdAt).toLocaleString()}</p>

              <p><b>Cylinder ID:</b> {o.cylinder?.cylinderId}</p>
              <p><b>Gas Type:</b> {o.type}</p>
              <p><b>Category:</b> {o.category}</p>

              <p><b>Status:</b> <span className="text-green-700 font-bold">{o.delivery?.status}</span></p>

              <p><b>Driver Name:</b> {o.driver?.name}</p>
              <p><b>Vehicle No:</b> {o.driver?.vehicleNo}</p>
              <p><b>Driver Phone:</b> {o.driver?.phone}</p>

              <p className="col-span-2">
                <b>Live Location:</b> {o.cylinder?.latitude}, {o.cylinder?.longitude}
              </p>
            </div>

          </div>
        ))}

        <button onClick={close} className="mt-4 bg-red-600 text-white px-6 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
