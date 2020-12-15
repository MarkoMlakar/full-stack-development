import React from "react";
import "./formInput.css";

const FormInput = ({ label, type, name, onChange, error }) => {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="field-container">
      <div className={error ? "label-error" : "label"}>
        {label}
        {error}
      </div>
      <input
        type={type}
        className="form-input"
        name={name}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default FormInput;
