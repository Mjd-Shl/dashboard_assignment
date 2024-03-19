import React from "react";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

import Paper from "@mui/material/Paper";
import { useMediaQuery } from "@mui/material";

const DashboardPieChart = ({ title, data }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const options = {
    chart: {
      type: "pie",
      height: isMobile ? 300 : 250,
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
    legend: !isMobile
      ? {
          align: "right", // or 'left'
          verticalAlign: "middle",
          layout: "vertical",
          itemMarginTop: 10,
          itemMarginBottom: 10,
        }
      : {},
    series: [
      {
        name: "Users",
        colorByPoint: true,
        data: data.map((item, index) => ({
          name: item.name,
          y: item.y,
          colors: Highcharts.map(
            Highcharts.getOptions().colors,
            function (color) {
              return {
                radialGradient: {
                  cx: 0.5,
                  cy: 0.3,
                  r: 0.7,
                },
                stops: [
                  [0, color],
                  [1, Highcharts.color(color).brighten(-0.3).get("rgb")],
                ],
              };
            }
          ),
        })),
      },
    ],
  };

  return (
    <div className="w-full  h-full transform hover:scale-[1.05] transition duration-300 ease-in-out cursor-pointer">
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
