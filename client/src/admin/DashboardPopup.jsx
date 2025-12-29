import React, { useState } from "react";
import RegisterModal from "../component/RegisterModal";
import AllUsersPopup from "./AllUsersPopup";

export default function DashboardPopup({ isOpen, onClose }) {
  const [openRegister, setOpenRegister] = useState(false);
  const [openAllUsers, setOpenAllUsers] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">

        <div className="bg-white w-[400px] rounded-2xl shadow-2xl overflow-hidden">

          <div className="bg-red-600 text-white text-center py-4 text-xl font-bold">
            User Management
          </div>

          <div className="p-6 flex flex-col gap-4 text-red-600 font-semibold">

            <button 
              onClick={() => setOpenRegister(true)}
              className="hover:bg-red-100 p-2 rounded-lg"
            >
              ➕ Add User
            </button>

            <button 
            onClick={() => setOpenAllUsers(true)}
            className="hover:bg-red-100 p-2 rounded-lg"
            >
            👥 All Users
            </button>

            
            
            <button className="hover:bg-red-100 p-2 rounded-lg">🎭 Assign Role</button>
          </div>

          <div className="p-4 text-center">
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Register Popup */}
      <RegisterModal 
        isOpen={openRegister}
        onClose={() => setOpenRegister(false)}
        openLogin={() => {}}
      />
      <AllUsersPopup 
   isOpen={openAllUsers}
   onClose={() => setOpenAllUsers(false)} 
/>

    </>
  );
}
