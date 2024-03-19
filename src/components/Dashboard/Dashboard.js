//containing the chart and other stuff we can think of later
import React from "react";
import DashboardPieChart from "./DashboardPieChart";
import { useSelector } from "react-redux";
import DashboardLineChart from "./DashboardLineChart";
import DashboardPaper from "../ui/DashboardPaper";

//icons
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LayersIcon from "@mui/icons-material/Layers";

const Dashboard = () => {
  const usersList = useSelector((state) => state.users.usersList);
  // Count the number of users in each department
  const departmentCounts = {};
  usersList.forEach((user) => {
    const { department } = user;
    departmentCounts[department] = (departmentCounts[department] || 0) + 1;
  });

  // Prepare data for the department pie chart
  const departmentData = Object.entries(departmentCounts).map(
    ([department, count]) => ({
      name: department,
      y: count,
    })
  );

  // Count the number of users in each department
  const positionCounts = {};
  usersList.forEach((user) => {
    const { position } = user;
    positionCounts[position] = (positionCounts[position] || 0) + 1;
  });

  // Prepare data for the pie chart
  const positionData = Object.entries(positionCounts).map(
    ([position, count]) => ({
      name: position,
      y: count,
    })
  );

  // Get Users Total Salary
  const totalSalary = usersList.reduce((sum, user) => sum + user.salary, 0);

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
        <DashboardPaper
          icon={PeopleOutlineIcon}
          paper_title={"Total Users"}
          paper_value={usersList?.length ?? 0}
        />
        <DashboardPaper
          icon={MonetizationOnOutlinedIcon}
          paper_title={"Total Salary"}
          paper_value={totalSalary + "$"}
        />
        <DashboardPaper
          icon={ApartmentOutlinedIcon}
          paper_title={"Departments"}
          paper_value={4}
        />
        <DashboardPaper
          icon={LayersIcon}
          paper_title={"Positions"}
          paper_value={10}
        />
      </div>
      <div className="grid grid-cols-5 gap-4 mt-8">
        <div className="col-span-5 sm:col-span-3">
          <div>
            <DashboardLineChart />
          </div>
        </div>
        <div className="flex flex-col gap-4 col-span-5 sm:col-span-2">
          <DashboardPieChart
            title={"Number of Users in Each Department"}
            data={departmentData}
          />
          <DashboardPieChart
            title={"Number of Users in Each Position"}
            data={positionData}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
