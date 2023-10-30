import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import PurchasedProductsModal from "../ReviewModal/ReveiwModal";
import { useModal } from "../../context/Modal";
import { clearCartThunk } from "../../store/cartitems";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { openModal } = useModal();

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
    dispatch(logout())
    .then(() => {
      dispatch(clearCartThunk())
    })
    history.push("/");
  };

  const handleOpenPurchasedProductsModal = () => {
    setShowMenu(false);
    openModal(<PurchasedProductsModal />);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const arrowIcon = showMenu ? faChevronDown : faChevronUp;

  return (
    <>
      {user ? (
        <div className="profile-button-wrapper">
          <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
            <FontAwesomeIcon icon={arrowIcon} className={`arrow-icon ${showMenu ? "arrow-down" : "arrow-up"}`} />
          </button>
          <ul className={ulClassName} ref={ulRef}>
            <li>Hello, {user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleOpenPurchasedProductsModal}>Leave a Review</button>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>

          </ul>
        </div>
      ) : (
        <div className="sign-in-button">
          <OpenModalButton buttonText="Sign in" modalComponent={<LoginFormModal />} />
        </div>
      )}
    </>
  );
}

export default ProfileButton;
