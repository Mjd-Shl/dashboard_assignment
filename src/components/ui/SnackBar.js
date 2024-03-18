import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../../redux/reducers/alertReducer";

const SnackBar = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.alerts);

  const handleClose = () => {
    dispatch(set({ open: false, msg: "", severity: "" }));
  };

  return (
    <Snackbar
      sx={{ minWidth: 300, marginTop: "6vh" }}
      anchorOrigin={{
        vertical: `${value?.v ?? "top"}`,
        horizontal: `${value?.h ?? "center"}`,
      }}
      open={value?.open}
      autoHideDuration={value?.time ?? 2000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={value?.severity ?? "success"}
        sx={{ width: "100%" }}
      >
        {value?.msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
