import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";
import logo from "../../assets/icons/logo.png";
import hamburger from "../../assets/icons/mobile-hamburger.svg";
import closeIcon from "../../assets/icons/close-icon.svg";
import SignUpModal from "../modals/signUpModal/signUpModal";
import LoginModal from "../modals/loginModal/loginModal";
import UserModal from "../modals/userModal/userModal";
import { AuthContext } from "../contexts/authContext";
import ProfileImage from "../../assets/icons/profile-image.png";

const Navigation = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isSignUpOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Disable scrolling when in mobile navigation or when a modal is active
  useEffect(() => {
    if (mobileMenu || isSignUpOpen || isLoginOpen || isUserOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenu, isSignUpOpen, isLoginOpen, isUserOpen]);

  // Functions
  const toggleMobile = () => {
    setMobileMenu(!mobileMenu);
    if (isSignUpOpen) setIsModalOpen(false);
    if (isLoginOpen) setIsLoginOpen(false);
    if (isUserOpen) setIsUserOpen(false);
  };

  const toggleModal = () => setIsModalOpen(!isSignUpOpen);
  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);
  const toggleUserModal = () => setIsUserOpen(!isUserOpen);
  const hideMobileMenu = () => setMobileMenu(false);

  const onHomeClick = () => {
    if (isSignUpOpen) setIsModalOpen(false);
    if (isLoginOpen) setIsLoginOpen(false);
    if (isUserOpen) setIsUserOpen(false);
    if (mobileMenu) setMobileMenu(false);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <NavLink to="/" onClick={onHomeClick}>
          <img className="nav-logo" src={logo} alt="logo"></img>
          <div className="nav-title">Full-Stack-Portfolio</div>
        </NavLink>
      </div>
      <div onClick={toggleMobile} className="mobile-header">
        {!mobileMenu ? (
          <React.Fragment>
            <img
              src={hamburger}
              className="hamburger-icon"
              alt="hamburger-menu"
            ></img>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img src={closeIcon} className="close-icon" alt="close-icon"></img>
          </React.Fragment>
        )}
      </div>
      <div
        className={mobileMenu ? "group-container" : "group-container disable"}
      >
        <ul className={mobileMenu ? "nav-menu active" : "nav-menu"}>
          {user.valid ? (
            <li>
              <NavLink to="/favorites" onClick={hideMobileMenu}>
                Favorites
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink to="/popular" onClick={hideMobileMenu}>
              Popular
            </NavLink>
          </li>
          {user.valid ? (
            <React.Fragment>
              <li className="user-container">
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p className="user-name" onClick={() => setIsUserOpen(true)}>
                    {user.first_name}&nbsp;
                    {user.last_name}
                  </p>
                  <img
                    className="profile-image"
                    src={ProfileImage}
                    alt="user"
                    onClick={() => setIsUserOpen(true)}
                  ></img>
                </div>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <div>
                  <div
                    className="login-button"
                    onClick={() => {
                      toggleLogin();
                      hideMobileMenu();
                    }}
                  >
                    Login
                  </div>
                </div>
              </li>
              <li className="register-button-container">
                <div onClick={hideMobileMenu} style={{ cursor: "pointer" }}>
                  <div className="register-button" onClick={toggleModal}>
                    <div className="button-text">New Account</div>
                  </div>
                </div>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
      <LoginModal showModal={isLoginOpen} onClose={toggleLogin}></LoginModal>
      <SignUpModal showModal={isSignUpOpen} onClose={toggleModal}></SignUpModal>
      <UserModal showModal={isUserOpen} onClose={toggleUserModal}></UserModal>
    </div>
  );
};

export default Navigation;
