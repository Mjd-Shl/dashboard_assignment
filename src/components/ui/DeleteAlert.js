import React from "react";
import Swal from "sweetalert2";
import Button from "./Button";

const DeleteAlert = ({ onConfirm }) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "mx-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50",
      cancelButton:
        "mx-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50",
    },

    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        onConfirm();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
};

export default DeleteAlert;
