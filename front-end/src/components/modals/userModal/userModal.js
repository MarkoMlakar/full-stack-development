import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ProfileImage from "../../../assets/icons/profile-image.png";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import "./userModal.css";
import { AuthContext } from "../../contexts/authContext";
import { UserLogout } from "../../../api/authService";

// In case we need to tech user data from /me endpoint ... but we call the API on login and save it to the useContext
// import { UserData } from "../../../api/userService";

/* User Modal Component 
Props:
  - showModal - bool  -- True if the modal is displayed
  - onClose - callback  -- Calback function that toggles the view in navigation.js

  * Sets the information from the useContext to the UI
  * The process of fetching the user information is done right after login so we don't need to fire an API call here
*/

const UserModal = ({ showModal, onClose }) => {
  const { user, setUser } = useContext(AuthContext);
  const [state, setState] = useState(user);

  useEffect(() => {
    setState(user);
    // eslint-disable-next-line
  }, [showModal]);

  const onLogout = async () => {
    localStorage.clear();
    setUser({
      first_name: "",
      last_name: "",
      valid: false,
      id: "",
      dob: "",
      sightings: 0,
      email: "",
    });
    await UserLogout();
    onClose();
  };

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay" />
      <div className="modal-container">
        <div className="user-modal">
          <div className="close-btn">
            <img
              src={CloseIcon}
              alt="Close"
              className="close-image"
              onClick={() => {
                onClose();
              }}
            ></img>
          </div>
          <div className="user-info-container">
            <div className="user-header">
              <img src={ProfileImage} alt="User" className="user-image"></img>
              <div className="user-header-name">
                <div className="user-name-title">
                  {state.first_name}&nbsp;{state.last_name}
                </div>
                <div className="user-sightings-title" data-testid="sightings">
                  {state.sightings} sightings
                </div>
              </div>
            </div>
            <div className="user-info">
              <div className="user-info-row">
                <div className="user-row-title">First Name</div>
                <div className="user-row-value" data-testid="first-name">
                  {state.first_name}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-row-title">Last Name</div>
                <div className="user-row-value" data-testid="last-name">
                  {state.last_name}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-row-title">Date of Birth</div>
                <div className="user-row-value" data-testid="dob">
                  {state.dob}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-row-title">Email</div>
                <div className="user-row-value" data-testid="email">
                  {state.email}
                </div>
              </div>
            </div>
          </div>
          <div className="user-logout">
            <button
              className="logout-button"
              onClick={() => {
                onLogout();
              }}
            >
              <div className="logout-label">Logout</div>
            </button>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#modal")
  );
};
export default UserModal;
