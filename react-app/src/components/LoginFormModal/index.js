import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal/index";

function LoginFormModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, openModal } = useModal();

  //Demo User Button Config
  const demoUserButton = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
    closeModal();
    history.push('/');
  } ;

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
        validationErrors.email = "The provided credentials were invalid.";
    }

    // Check if email and password fields are not empty
    if (!email) {
        validationErrors.email = "The provided credentials were invalid.";
    }

    // Username Length - we are not using the username in login, only email
		// if (username.length < 4) {
		// 	validationErrors.username = "Username should be at least 4 characters.";
		// }

    if (!password) {
        validationErrors.password = "The provided credentials were invalid.";
    }

    // Password Strength
		if (password.length < 6) {
			validationErrors.password = "The provided credentials were invalid.";
		}

    // If frontend validation fails, display the errors
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const data = await dispatch(login(email, password));

      if (Array.isArray(data)) {
        const errorObj = {};
        data.forEach(err => {
            const [key, value] = err.split(":");
            errorObj[key.trim()] = value.trim();
        });
        setErrors(errorObj);
    } else if (data && data.errors) {
        setErrors(data.errors);
    } else {
        closeModal();
    }
};

  // Open the signup modal
  const openSignupModal = () => {
    closeModal();
    openModal(<SignupFormModal />);
  };

  return (
    <>
      <div className="login-form-modal">
        <p>Sign in</p>

        <button className="register-button" onClick={openSignupModal}>
            Register
        </button>

        <form onSubmit={handleSubmit}>
        {errors.email && <div className="error-message">{errors.email}</div>}
        {errors.password && <div className="error-message">{errors.password}</div>}

          <label>
              Email address
              <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "input-error" : ""}
                  required
              />

          </label>
          <label>
              Password
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "input-error" : ""}
                  required
              />
          </label>
          <button className="login-button" type="submit" disabled={!email || password.length < 6}>Sign in</button>

          <div className="login-button-div">
              <button
                className="login-button"
                type="submit"
                onClick={demoUserButton}>
                Demo User
              </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
