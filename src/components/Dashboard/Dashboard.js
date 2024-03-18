//containing the chart and other stuff we can think of later
import React from "react";
import DashboardPieChart from "./DashboardPieChart";
import { useSelector } from "react-redux";
import DashboardLineChart from "./DashboardLineChart";

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

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
        <DashboardPieChart
          title={"Number of users in each department"}
          data={departmentData}
        />
        <DashboardPieChart
          title={"Number of users in each position"}
          data={positionData}
        />
      </div>
      <div className="mt-5 sm:mt-20">
        <DashboardLineChart />
      </div>
    </>
  );
};

export default Dashboard;
