
// export default App;
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HelpMain from "./pages/HelpMain";
import NoteFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ServiceProviderList from "./components/ServiceProviderList";
import SeekerForm from "./components/SeekerForm";
import ProviderForm from "./components/ProviderForm";
import ProviderDashboard from "./pages/ProviderDashboard"

import SeekerDashboard from "./pages/SeekerDashboard";
import AdminDashboard from "./pages/AdminDashboard"
// import ProviderList from "./components/ProviderList";
import ProviderFilter from "./components/ProviderFilter";
import SearchResults from "./pages/SearchResults";

// import MapTracker from "./pages/MapTracker";
// import ProviderTracker from "./pages/ProviderTracker";
import Tracking from "./pages/Tracking";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />; // Redirect to Home instead of Login
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ensure Home is the default */}
        <Route path="/service-providers" element={<ServiceProviderList />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        {/* Other Pages */}
        <Route path="/helpmain" element={<HelpMain />} />
        <Route path="/SeekerForm" element={<SeekerForm />} />
        <Route path="/ProviderForm" element={<ProviderForm />} />
        <Route path="/ProviderDashboard" element={<ProviderDashboard />} />
        <Route path="/SeekerDashboard" element={<SeekerDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/providers" element={<ProviderFilter  />} />

        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/Tracking/:username" element={<Tracking />} />
        <Route path="*" element={<NoteFound />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
