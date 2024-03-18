import React, { useEffect } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import Button from "../ui/Button";
import { set } from "../../redux/reducers/alertReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/reducers/authReducers";
import axios from "axios";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  //Auth State
  const { isAuthenticated } = useSelector((state) => state.auth);

  //Tooltip Text
  const tooltipText = "Email: john@mail.com <br> password: changeme";

  const dispatch = useDispatch();
  // Initial values for email and password
  const initialValues = {
    email: "",
    password: "",
  };

  // Toggle password visibility
  const [showPassword, setShowPassword] = React.useState(false);

  //Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email: values.email,
          password: values.password,
          // expiresInMins: 60, // optional
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(
          set({
            open: true,
            msg: "Logged In Successfully",
            severity: "success",
          })
        );
        dispatch(
          login({
            email: values.email,
            token: response?.data?.access_token,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch(
          set({
            open: true,
            msg: "Failed to login Please Check Yuor Credential",
            severity: "error",
          })
        );
      });

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
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
            InputProps={{
              endAdornment: (
                <Tooltip
                  title={
                    <span dangerouslySetInnerHTML={{ __html: tooltipText }} />
                  }
                  placement="left-start"
                >
                  <InfoIcon className="cursor-pointer absolute right-2 text-[#99baff]" />
                </Tooltip>
              ),
            }}
          />

          {/* Password Field */}
          <Field
            name="password"
            as={TextField}
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            error={errors.password && touched.password}
            helperText={<ErrorMessage name="password" />}
            fullWidth
            InputProps={{
              endAdornment: showPassword ? (
                <Visibility
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-2 text-[#99baff]"
                />
              ) : (
                <VisibilityOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-2 text-[#99baff]"
                />
              ),
            }}
            autoComplete={"new-password"}
          />

          {/* Submit Button */}
          <div className="w-full flex">
            <Button
              // disable={!isLoggedIn}
              type="submit"
              // loading={isAddingAddress}
              className="!px-16"
            >
              Login
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
