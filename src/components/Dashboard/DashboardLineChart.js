import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { Paper } from "@mui/material";

const DashboardLineChart = () => {
  const { usersList } = useSelector((state) => state.users);
  const [userCounts, setUserCounts] = useState([]);

  useEffect(() => {
    // Create a map to store the cumulative counts of users
    const userCountMap = new Map();

    // Loop through users and update the count at each time point
    usersList.forEach((user) => {
      const userCreatedAt = new Date(user.created_at).getTime();
      // Increment the count for the user's creation time
      userCountMap.set(
        userCreatedAt,
        (userCountMap.get(userCreatedAt) || 0) + 1
      );
    });

    // Convert map to array of objects for Highcharts series data
    const userData = Array.from(userCountMap, ([x, y]) => ({ x, y }));

    // Sort user data by time
    userData.sort((a, b) => a.x - b.x);

    // Calculate cumulative count
    let cumulativeCount = 0;
    const cumulativeUserData = userData.map((point) => {
      cumulativeCount += point.y;
      return { x: point.x, y: cumulativeCount };
    });

    setUserCounts(cumulativeUserData);
  }, [usersList]);

  const options = {
    chart: {
      height: 515,
    },
    title: {
      text: "Cumulative Number of Users Created Over Time",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Time",
      },
    },
    yAxis: {
      title: {
        text: "Cumulative Number of Users",
      },
    },
    series: [
      {
        name: "Users",
        data: userCounts,
      },
    ],
  };

  return (
    <Paper elevation={3}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Paper>
  );
};

export default DashboardLineChart;
