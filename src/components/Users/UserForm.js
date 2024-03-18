import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Breadcrumbs from "../ui/Breadcrumbs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { randomId } from "@mui/x-data-grid-generator";
import { addUser } from "../../redux/reducers/userReducer";
import Button from "../ui/Button";
import * as Yup from "yup";
// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  department: Yup.string().required("Department is required"),
  position: Yup.string().required("Department is required"),
  salary: Yup.number().required("Salary is required"),
});

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Dropdown options
  const departmentOptions = ["Market", "Finance", "Development"];
  const positionOptions = [
    "Front-end",
    "Backend",
    "Sales Manager",
    "Accountant",
  ];

  const initialValues = {
    name: "",
    email: "",
    department: "",
    position: "",
    salary: "",
  };

  const handleSubmit = (values) => {
    const newItem = {
      id: randomId(),
      name: values.name,
      email: values.email,
      department: values.department,
      position: values.position,
      salary: values.salary,
      created_at: new Date(),
    };
    dispatch(addUser(newItem));
    navigate("/users");
  };

  return (
    <Box className={"h-full sm:flex sm:flex-col justify-center items-center"}>
      <Breadcrumbs page={"Users"} main={false} text={"Create new"} />
      <Box boxShadow={4} borderRadius={4} p={4} width="100%" maxWidth={400}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          {/* Title */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            alignSelf={{ xs: "start", sm: "center" }}
          >
            <IconButton
              component={RouterLink}
              to={`/users`}
              aria-label="arrow-back"
              sx={{ border: "2px solid", borderRadius: "50%" }}
              disableRipple
              size="small"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" mr={1}>
              Create New
            </Typography>
          </Stack>
        </Stack>

        {/* Body */}
        <Paper elevation={0} mt={2}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                {/* Name Field */}
                <Field
                  name="name"
                  as={TextField}
                  variant="outlined"
                  label="Name"
                  type="text"
                  error={errors.name && touched.name}
                  helperText={<ErrorMessage name="name" />}
                  fullWidth
                  className={"!rounded"}
                  autoComplete={"new-email"}
                />
                {/* Email Field */}
                <Field
                  name="email"
                  as={TextField}
                  variant="outlined"
                  label="Email"
                  type="email"
                  error={errors.email && touched.email}
                  helperText={<ErrorMessage name="email" />}
                  fullWidth
                  className={"!rounded"}
                  autoComplete={"new-email"}
                />
                {/* Department Field */}
                <Field
                  name="department"
                  as={TextField}
                  variant="outlined"
                  label="Department"
                  select
                  fullWidth
                  error={errors.department && touched.department}
                  helperText={<ErrorMessage name="department" />}
                >
                  {departmentOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
                {/* Position Field */}
                <Field
                  name="position"
                  as={TextField}
                  variant="outlined"
                  label="Position"
                  select
                  fullWidth
                  error={errors.position && touched.position}
                  helperText={<ErrorMessage name="position" />}
                >
                  {positionOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
                {/* Salary Field */}
                <Field
                  name="salary"
                  as={TextField}
                  variant="outlined"
                  label="Salary"
                  type={"number"}
                  error={errors.salary && touched.salary}
                  helperText={<ErrorMessage name="salary" />}
                  fullWidth
                />
                {/* Submit Button */}
                <div className="w-full flex">
                  <Button type="submit">Add User</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserForm;
