import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

const ServiceProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchProviders = async () => {
        if (!searchQuery) { 
            setLoading(false);
            return;
        }

        console.log("Search triggered for:", searchQuery);
        
        // ✅ Correct way to check token
         const token = localStorage.getItem(ACCESS_TOKEN);
        
        if (!token || token === "null") {  // Prevents using null/invalid token
            console.log("No valid token found, redirecting to login...");
            alert("Session expired! Please log in again.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.get(
                `http://127.0.0.1:8001/api/service-providers/?query=${searchQuery}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("API Response:", response.data);
            setProviders(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized request, logging out user...");
                alert("Session expired! Please log in again.");
                localStorage.removeItem("token"); // Remove invalid token
                navigate("/login");
            } else {
                console.error("Error fetching service providers:", error?.response?.data || error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    fetchProviders();
}, [searchQuery, navigate]);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Service Providers for "{searchQuery}"</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : providers.length > 0 ? (
        <ul className="list-disc">
          {providers.map((provider) => (
            <li key={provider.id} className="mb-2">
              <Link to={`/provider/${provider.id}`} className="text-blue-500 hover:underline">
                {provider.name} - {provider.service_field} ({provider.location})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500 font-bold">No service providers found.</p>
      )}
    </div>
  );
};

export default ServiceProviderList;
