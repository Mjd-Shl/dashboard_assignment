// Private route for the user
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage";

// Define your PrivateRoute component
const PrivateRoute = ({ isAuthenticated }) => (
  <div>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</div>
);

export default PrivateRoute;
