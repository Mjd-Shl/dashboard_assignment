import React from "react";
import { Paper } from "@mui/material";

const DashboardPaper = ({
  icon: Icon,
  paper_title,
  paper_value,
  className,
}) => {
  return (
    <div className="w-full sm:w-1/4 h-36 transform transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105">
      <Paper
        elevation={3}
        className={`${className} flex items-center justify-center gap-4 p-8 
       `}
      >
        <Icon
          className="text-2xl text-[var(--dashboard-paper-icon)]"
          style={{ fontSize: "3rem" }}
        />
        <div className="flex flex-col justify-center items-center">
          <span className="text-[var(--dashboard-paper-text)] font-semibold text-xl mb-2 text-center">
            {paper_title}
          </span>
          <span className="text-[var(--dashboard-paper-value)] font-bold text-xl">
            {paper_value}
          </span>
        </div>
      </Paper>
    </div>
  );
};

export default DashboardPaper;
