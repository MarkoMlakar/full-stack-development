import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import FormInput from "../../formInput/formInput";
import FormValidate from "../formValidation";
import { UserRegister } from "../../../api/authService";
import LoginModal from "../loginModal/loginModal";
import logo from "../../../assets/icons/logo.png";
import "./signUpModal.css";
import "../../formInput/formInput.css";
import "react-datepicker/dist/react-datepicker.css";

/* SignUp Modal Component 
Props:
  - showModal - bool  -- True if the modal is displayed
  - onClose - callback  -- Calback function that toggles the view in navigation.js

  * Listens for changes in the form fields and validates the input
  * On valid input a /POST request is sent to /api/v1/users/register
  * After successful register the SUCCESS view is displayed with OK button
  * On OK click the Login Modal is displayed
*/

const SignUpModal = ({ showModal, onClose }) => {
  const initialState = {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
  };
  const [startDate, setStartDate] = useState();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    clearState();
    // eslint-disable-next-line
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const clearState = () => {
    setValues({
      ...initialState,
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = FormValidate(values, "signup");
    setErrors(err);

    if (Object.keys(err).length === 0) {
      const { firstName, lastName, dob, email, password } = values;
      const response = await UserRegister(
        firstName,
        lastName,
        dob,
        email,
        password
      );
      if (response.status === 400) {
        console.log(response.data.result.detail);
        setErrors({
          email: "-" + response.data.error,
        });
      }
      if (response.status === 200) {
        setSignUpSuccess(true);
      }
    }
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleSignUp = () => {
    setSignUpSuccess(!signUpSuccess);
  };

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <React.Fragment>
      {!showLogin ? (
        <>
          <div className="overlay" />
          <div className="modal-container">
            <div className="sign-up-modal">
              {!signUpSuccess ? (
                <>
                  <div className="sign-up-form">
                    <div className="title">Create an Account</div>
                    <form className="form-container" onSubmit={handleSubmit}>
                      <div className="first-row">
                        <div className="first-name">
                          <FormInput
                            name="firstName"
                            error={errors.firstName}
                            type="text"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="last-name">
                          <FormInput
                            type="text"
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                          />
                        </div>
                      </div>
                      <div className="date-of-birth">
                        <div className="dob-container">
                          <div className="field-container">
                            <div
                              className={errors.dob ? "label-error" : "label"}
                            >
                              {"Date of Birth"}
                              {errors.dob}
                            </div>
                            <DatePicker
                              selected={startDate}
                              dateFormat="MMMM dd, yyyy"
                              showYearDropdown
                              onChange={(date) => {
                                setStartDate(date);
                                // Think this over... hacky solution
                                handleChange({
                                  target: {
                                    name: "dob",
                                    value: moment(date).format("MMMM DD, YYYY"),
                                  },
                                });
                              }}
                              value={values.dob}
                              customInput={
                                <input
                                  type="text"
                                  className="form-input"
                                ></input>
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="email">
                        <FormInput
                          type="email"
                          label="Email Address"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          error={errors.email}
                        />
                      </div>
                      <div className="password">
                        <FormInput
                          type="password"
                          label="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          error={errors.password}
                        />
                      </div>
                      <button
                        className="create-account-button"
                        type="submit"
                        name="submit"
                      >
                        <div className="create-account-label">
                          Create Account
                        </div>
                      </button>
                    </form>
                  </div>
                  <div
                    className="close-button"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <div className="close-text">I don’t want to Register</div>
                  </div>
                </>
              ) : (
                <div>
                  <>
                    <div className="success-form">
                      <img
                        src={logo}
                        className="fullStack-logo"
                        alt="fullStack Logo "
                      />
                      <div className="success-title">Congratulations!</div>
                      <div className="sub-text">
                        You have successfully signed up for
                        Full-Stack-Portfolio!
                      </div>
                      <button
                        className="success-button"
                        onClick={() => {
                          toggleLogin();
                          toggleSignUp();
                        }}
                      >
                        <div className="success-label">OK</div>
                      </button>
                    </div>
                    <div
                      className="close-button"
                      onClick={() => {
                        onClose();
                      }}
                    ></div>
                  </>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <LoginModal
          showModal={showLogin}
          onClose={() => {
            onClose();
            toggleLogin();
          }}
        />
      )}
    </React.Fragment>,
    document.querySelector("#modal")
  );
};

export default SignUpModal;
