import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllUsersPopup({ isOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (isOpen) fetchUsers();
  }, [isOpen]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/user/all");
    setUsers(res.data);
  };

  const deleteUser = async () => {
    await axios.delete(`http://localhost:5000/api/user/delete/${selected._id}`);
    alert("User Deleted");
    setSelected(null);
    fetchUsers(); // refresh list
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white w-[900px] h-[600px] rounded-2xl p-6 overflow-auto">

        <h2 className="text-red-600 text-2xl font-bold mb-4 text-center">
          All Registered Users
        </h2>

        <table className="w-full border">
          <thead className="bg-red-600 text-white">
            <tr>
              <th>Name</th><th>Email</th><th>Address</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                onClick={() => setSelected(u)}
                className={`text-center border-b cursor-pointer 
                  ${selected?._id === u._id ? "bg-red-100" : "hover:bg-red-50"}`}
              >
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete Panel */}
        {selected && (
          <div className="mt-4 bg-red-50 p-4 rounded-lg text-center">
            <p className="mb-3 text-red-600 font-semibold">
              Delete user <b>{selected.name}</b>?
            </p>
            <button
              onClick={deleteUser}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Delete User
            </button>
          </div>
        )}

        <div className="text-center mt-4">
          <button onClick={onClose} className="bg-red-600 text-white px-6 py-2 rounded-lg">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}