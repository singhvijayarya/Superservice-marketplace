import React, { useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const OnlineToggle = ({ username, initialStatus }) => {
  const [isOnline, setIsOnline] = useState(initialStatus === 'online');
  const [message, setMessage] = useState("");  // ✅ Success / error msg

  const toggleStatus = async () => {
    const newStatus = isOnline ? 'offline' : 'online';
    setIsOnline(!isOnline);
    setMessage(""); // clear previous

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);

      const res = await axios.post(
        `http://localhost:8001/api/provider/${username}/toggle-status/`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Show success message
      setMessage(res.data.message || `Status changed to ${newStatus}`);

    } catch (err) {
      console.error('❌ Error updating status:', err.response?.data || err.message);
      setMessage("❌ Failed to update status");
    }

    // ✅ Hide message after 3 sec
    setTimeout(() => setMessage(""), 3000);
  };



  return (
    <div className="flex items-center space-x-4 mt-6">
      <span
        className={`text-md font-bold transition-colors duration-300
          ${isOnline ? 'text-green-600' : 'text-red-600'}`}
      >
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </span>

      <div
        onClick={toggleStatus}
        className={`w-20 h-10 flex items-center cursor-pointer 
          border-4 rounded-full p-1 transition-all duration-500 ease-in-out
          ${isOnline ? 'bg-green-500 border-green-700 shadow-lg shadow-green-300/50' 
                     : 'bg-red-500 border-red-700 shadow-lg shadow-red-300/50'}
        `}
      >
        <div
          className={`bg-white w-8 h-8 rounded-full shadow-md transform 
            transition-transform duration-500 ease-in-out
            ${isOnline ? 'translate-x-10' : 'translate-x-0'}
          `}
        />
      </div>
      {/* ✅ Message show */}
    {message && (
      <p className="text-sm mt-2 font-medium text-blue-600">{message}</p>
    )}
    </div>
  );
};

export default OnlineToggle;
