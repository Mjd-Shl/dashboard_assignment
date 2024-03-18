import React from "react";
import LoopIcon from "@mui/icons-material/Loop";

const disabledButtonStyles = {
  opacity: 0.6,
  cursor: "not-allowed",
};

const Button = ({ children, loading, disable, ...rest }) => {
  const classes = rest.className;

  return (
    <button
      {...rest}
      disabled={loading || disable}
      className={`${classes} ${
        loading || disable ? "disabled" : "shine-button"
      } mt-2 mx-auto w-fit py-2 px-8 text-center text-[var(--btn-text-color)] bg-[var(--bg-btn)]
        hover:bg-[var(--bg-hover-btn)] font-semibold rounded-[2rem] border-0 cursor-pointer`}
      style={loading || disable ? disabledButtonStyles : {}}
    >
      {loading ? <LoopIcon className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
