import logo from "../../assets/icons/logo.png";
import "./spinner.css";
import React from "react";

const Spinner = () => {
  return (
    <>
      <img src={logo} className="rotate" alt="Loading..." />
    </>
  );
};
export default Spinner;
