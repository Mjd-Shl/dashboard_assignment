//pretty loader while adding/editing/deleting or entering the page
import React from "react";
import { CircleLoader, GridLoader } from "react-spinners";

const Loader = ({ isGrid }) => {
  return isGrid ? (
    <GridLoader color="#5900f9" />
  ) : (
    <CircleLoader color="#36d7b7" />
  );
};

export default Loader;
