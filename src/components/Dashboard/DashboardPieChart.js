import React from "react";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

import Paper from "@mui/material/Paper";

const DashboardPieChart = ({ title, data }) => {
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: title,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Users",
        colorByPoint: true,
        data: data,
      },
    ],
  };

  return (
    <div className="w-full sm:w-[40%] transform hover:scale-[1.05] transition duration-300 ease-in-out cursor-pointer">
      <Paper elevation={3}>
        {data?.length > 0 ? (
          <PieChart highcharts={Highcharts} options={options} />
        ) : (
          <div className=" min-h-40 flex items-center justify-center">
            <h2 className="font-semibold text-slate-500 px-2">
              No Data Available
            </h2>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default DashboardPieChart;
