import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { Paper } from "@mui/material";

const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-10">Dashboard</h2>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
