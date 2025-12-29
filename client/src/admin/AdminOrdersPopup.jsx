import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrdersPopup({ close }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/booking/admin-orders")
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-h-[80vh] overflow-y-auto rounded-xl p-6 text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">All Bookings</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Customer ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Driver</th>
<th className="border p-2">Delivery Status</th>
<th className="border p-2">Action</th>
<th className="border p-2">Mark Delivered</th>



            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td className="border p-2">{o.customerId}</td>
                <td className="border p-2">{o.name}</td>
                <td className="border p-2">{o.phone}</td>
                <td className="border p-2">{o.email}</td>
                <td className="border p-2">{o.address}</td>
                <td className="border p-2">₹{o.price}</td>
                <td className="border p-2">
  {o.delivery?.driverName || "Not Assigned"}
</td>

<td className="border p-2">
  {o.delivery?.status || "Pending"}
</td>

                <td className="border p-2">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2 text-center">
  <button
    onClick={async()=>{
      if(window.confirm("Delete this booking?")){
        await axios.delete("http://localhost:5000/api/booking/delete/"+o._id);
        window.location.reload();
      }
    }}
    className="text-red-600 hover:underline"
  >
    Delete
  </button>
</td>
<td className="border p-2 text-center">
  {o.delivery && o.delivery.status !== "Delivered" ? (
    <button
      onClick={async()=>{
        await axios.put("http://localhost:5000/api/drivers/deliver/"+o.delivery._id,{
          proof:"Delivered"
        });
        window.location.reload();
      }}
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Delivered
    </button>
  ) : (
    <span className="text-green-700 font-bold">Delivered</span>
  )}
</td>


              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={close} className="mt-4 bg-red-600 text-white px-6 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
