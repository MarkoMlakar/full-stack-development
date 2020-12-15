import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import FormInput from "../../formInput/formInput";
import FormValidate from "../formValidation";
import logo from "../../../assets/icons/logo.png";
import { AuthContext } from "../../contexts/authContext";
import { UserLogin } from "../../../api/authService";
import { UserData } from "../../../api/userService";
import UserModal from "../userModal/userModal";
import moment from "moment";
import Spinner from "../../spinner/spinner";
import "./loginModal.css";
import "../../formInput/formInput.css";
import "react-datepicker/dist/react-datepicker.css";

/* Login Modal Component 
Props:
  - showModal - bool  -- True if the modal is displayed
  - onClose - callback  -- Calback function that toggles the view in navigation.js

  * Listens for changes in the form fields and validates the input
  * On valid input a /POST request is sent to /api/v1/users/login
  * After successful login auth_token is stored into localstorage
  * SUCCESS view is displayed with OK and PROFILE button
  * OK button closes the modal, PROFILE button opens the userModal
*/

const LoginModal = ({ showModal, onClose }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const [isProfileClick, setIsProfileClick] = useState(false);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const err = FormValidate(values, "login");
    setErrors(err);

    if (Object.keys(err).length === 0) {
      const { email, password } = values;
      const response = await UserLogin(email, password);
      if (response.status === 400) {
        console.log(response.data.error);
        setErrors({
          email: "-" + response.data.error,
          password: "-" + response.data.error,
        });
      }
      if (response.status === 200) {
        localStorage.setItem("token", response.data.__act);
        console.log(response.data);
        await getUserInfo(response.data.__id);
      }
    }
    setIsLoading(false);
  };
  const getUserInfo = async (userId) => {
    // Get user first name and last name
    try {
      console.log(userId);
      const user = await UserData(userId);
      console.log(user.data.name);
      const { id, name, surname } = user.data;
      //   MOCKS
      // This is currently hardcoded since we don't get the DOB, EMAIL, SIGHTING values from /me endpoint
      // /me endpoint returns only the first_name and last_name
      // TODO: implement once the API returns the missing data
      const NUMBER_OF_SIGHTINGS = Math.floor(Math.random() * 101);
      const USER_EMAIL = (name + surname + "@gmail.com")
        .replace(/\s/g, "")
        .toLocaleLowerCase();
      const RANDOM_DATE = new Date(
        +new Date() - Math.floor(Math.random() * 10000000000)
      );
      const DOB = moment(RANDOM_DATE).format("MMMM DD, YYYY");
      const userObject = {
        first_name: name,
        last_name: surname,
        valid: true,
        id: id,
        dob: DOB,
        email: USER_EMAIL,
        sightings: NUMBER_OF_SIGHTINGS,
      };

      setUser(userObject);
      localStorage.setItem("user", JSON.stringify(userObject));
    } catch (err) {
      console.log(err);
    }
  };

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <React.Fragment>
      <>
        <div className="overlay" />
        <div className="modal-container">
          <div className="login-modal">
            {isLoading ? (
              <div className="login-spinner">
                {" "}
                <Spinner />{" "}
              </div>
            ) : (
              <>
                {!user.valid ? (
                  <>
                    <div className="login-container">
                      <div className="login-title">Welcome Back</div>
                      <form
                        className="login-form-container"
                        onSubmit={handleSubmit}
                      >
                        <div className="login-email">
                          <FormInput
                            type="email"
                            label="Email Address"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            error={errors.email}
                          />
                        </div>
                        <div className="login-password">
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
                          className="login-modal-button"
                          type="submit"
                          name="submit"
                        >
                          <div className="login-modal-label">
                            Login to your Account
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
                      <div className="close-text">I don’t want to Login</div>
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
                          You have successfully logged into
                          Full-Stack-Portfolio!
                        </div>
                        <div className="success-bottom">
                          <button
                            className="success-ok-button"
                            onClick={() => {
                              onClose();
                            }}
                          >
                            <div className="success-label">OK</div>
                          </button>
                          <button
                            className="success-profile-button"
                            onClick={() => {
                              setIsProfileClick(true);
                            }}
                          >
                            <div className="success-label">PROFILE</div>
                          </button>
                        </div>
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
              </>
            )}
          </div>
        </div>
      </>
      {!isProfileClick ? (
        <></>
      ) : (
        <UserModal
          showModal={true}
          onClose={() => {
            onClose();
            setIsProfileClick(false);
          }}
        />
      )}
    </React.Fragment>,
    document.querySelector("#modal")
  );
};

export default LoginModal;
