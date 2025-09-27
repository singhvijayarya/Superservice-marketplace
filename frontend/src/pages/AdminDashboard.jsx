import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const AdminDashboard = () => {
  const [providers, setProviders] = useState([]);
  const [seekers, setSeekers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        if (!token) {
          setError("Authorization token is missing.");
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:8001/api/admin/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Admin Data Response ✅:", res.data);

        setProviders(res.data.providers || []);
        setSeekers(res.data.seekers || []);
      } catch (err) {
        console.error("❌ Admin Data Fetch Failed:", err.response?.data || err.message);
        setError("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Show loading state until data is fetched
  if (loading) {
    return <div className="text-center mt-6">Loading data...</div>;
  }

  // Show error message if there was an error during data fetch
  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">👑 Admin Dashboard</h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">📦 All Providers</h3>
        {providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {providers.map((p, idx) => (
              <div key={idx} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">
                  <img
                    src={`http://localhost:8001${p.profile_picture}`}
                    alt={p.username}
                    className="w-32 h-32 object-cover rounded-full border-2 border-blue-500"
                  />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{p.username}</p>
                  <p className="text-sm text-gray-500">{p.role}</p>
                  <p className="text-gray-700 mt-2"><strong>Phone:</strong> {p.phone}</p>
                  <p className="text-gray-700"><strong>Address:</strong> {p.address}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No providers found.</p>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">🧍‍♂️ All Seekers</h3>
        {seekers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {seekers.map((s, idx) => (
              <div key={idx} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">
                  <img
                    src={`http://localhost:8001${s.profile_picture}`}
                    alt={s.username}
                    className="w-32 h-32 object-cover rounded-full border-2 border-blue-500"
                  />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{s.username}</p>
                  <p className="text-sm text-gray-500">{s.email}</p>
                  <p className="text-gray-700 mt-2"><strong>Phone:</strong> {s.phone}</p>
                  <p className="text-gray-700"><strong>Address:</strong> {s.address}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No seekers found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
