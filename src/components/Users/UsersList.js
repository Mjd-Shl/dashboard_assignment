import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { setSweet } from "../../redux/reducers/alertReducer";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  removeUser,
  updateUser,
} from "../../redux/reducers/userReducer";
import DeleteAlert from "../ui/DeleteAlert";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    const newRow = { id, name: "", email: "", isNew: true }; // Create a new row
    setRows((oldRows) => [...oldRows, newRow]); // Add the new row to the state
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button className={"ml-auto mr-0"} onClick={handleClick}>
        <AddIcon />
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

//Format the current Date
function DateFormat() {
  const currentDate = new Date();
  // Get the date
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Get the time components
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Format the date string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

const UsersList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users.usersList);
  const { sweet } = useSelector((state) => state.alerts);
  console.log(usersList);
  const [rows, setRows] = useState(usersList);
  const [rowModesModel, setRowModesModel] = useState({});
  const [userId, setUserId] = useState(null);
  const [openSweet, setOpenSweet] = useState(false);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const updatedRow = rows.find((row) => row.id === id);
    const existingRow = usersList.find((row) => row.id === id);
    if (!existingRow) {
      updatedRow.created_at = DateFormat();
      dispatch(addUser(updatedRow));
    }
  };

  const handleDeleteClick = (id) => {
    dispatch(setSweet());
    setUserId(id);
  };

  const handleDeleteUser = () => {
    setRows(rows.filter((row) => row.id !== userId));
    dispatch(removeUser(userId));
    dispatch(setSweet());
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    // Check if row exists in the user list
    const existingRow = usersList.find((row) => row.id === newRow.id);
    if (existingRow) {
      // Update the existing user
      dispatch(updateUser(updatedRow));
    } else {
      // Add the new user
      updatedRow.created_at = DateFormat();
      dispatch(addUser(updatedRow));
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 220,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "position",
      headerName: "Position",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Front-end", "Backend", "Sales Manager", "Accountant"],
    },
    {
      field: "salary",
      headerName: "Salary",
      width: 220,
      editable: true,
      type: "number",
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon className="text-red-500" />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon className="text-red-500" />}
            label="Delete"
            onClick={() => {
              handleDeleteClick(id);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];
  console.log("sweet: ", sweet);
  return (
    <>
      {sweet && (
        <DeleteAlert title={"Delete User"} onConfirm={handleDeleteUser} />
      )}
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          checkboxSelection
          className="rounded-lg shadow-md p-4 bg-white"
        />
      </Box>
    </>
  );
};

export default UsersList;
