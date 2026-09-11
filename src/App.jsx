import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Destinations from "./pages/Destinations";
import Dashboard from "./pages/Dashboard";
import Trip from "./pages/trips/Trip";
import AddTrip from "./pages/trips/AddTrip";
import EditTrip from "./pages/trips/EditTrip";
import Tripdetails from "./pages/trips/Tripdetails";

import useAuth from "./hooks/useAuth";

const ProtectedRoutes = () => {
  const { token, onLogout } = useAuth();

  try {
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.userId;

    // Check whether the token is expired
    if (decodedToken?.exp) {
      const currentTime = Date.now() / 1000;

      if (currentTime >= decodedToken.exp) {
        onLogout();
        return <Navigate to="/login" replace />;
      }
    }

    // Token exists but does not contain userId
    if (!userId) {
      onLogout();
      return <Navigate to="/login" replace />;
    }

    // User is authenticated
    return <Outlet />;
  } catch (error) {
    console.error("Authentication error:", error);

    onLogout();
    return <Navigate to="/login" replace />;
  }
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/destinations" element={<Destinations />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<Trip />} />
          <Route path="/trips/add" element={<AddTrip />} />
          <Route path="/trips/:tripId" element={<Tripdetails />} />
          <Route path="/trips/:tripId/edit" element={<EditTrip />} />
        </Route>

        {/* Unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;