import { Link as RouterLink } from "react-router-dom";

import { Breadcrumbs as BC, Link, Typography } from "@mui/material";

const Breadcrumbs = ({ page, text, main }) => {
  return (
    <BC aria-label="breadcrumb" mb={2} fontSize="small">
      <Link
        component={RouterLink}
        underline="hover"
        color="inherit"
        to="/"
        fontWeight="bold"
      >
        Dashboard
      </Link>
      {(main === undefined || main === false) && (
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          fontWeight="bold"
          to={`/${page.toLowerCase()}`}
        >
          {page}
        </Link>
      )}
      <Typography fontWeight="bold" fontSize="small">
        {text}
      </Typography>
    </BC>
  );
};

export default Breadcrumbs;
