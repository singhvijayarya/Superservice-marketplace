// 📁 components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return <button className="py-0.5 px-1.5 border-2 border-r-4" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
