import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {user ? (
        <div className="profile-button-wrapper">
          <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
            <div className="arrow"></div>
          </button>
          <ul className={ulClassName} ref={ulRef}>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="sign-in-button">
          <OpenModalButton
            buttonText="Sign in"
            modalComponent={<LoginFormModal />}
          />
      </div>
      )}
    </>
  );
}

export default ProfileButton;
