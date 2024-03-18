import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import NotificationsIcon from "@mui/icons-material/Notifications";
import loginScreenImg from "../assets/images/login-screen.jpg";

export const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#99baff]">
      <div className="bg-white shadow-lg p-8 rounded-lg md:flex md:w-3/4 lg:w-3/4">
        {/* Image */}
        <div className="hidden md:block md:w-1/2 pr-8">
          <img
            src={loginScreenImg}
            alt="Login"
            className="object-cover w-full h-full rounded-md"
          />
        </div>

        {/* Form */}
        <div
          className="md:w-[40%]
        flex flex-col gap-4 items-center justify-center"
        >
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <h4 className="text-slate-500 text-sm font-semibold text-center ">
            To Keep connection with us, please login with your personal
            information by email address and password
            <NotificationsIcon className="text-yellow-400 mt-[-1px]" />
          </h4>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
