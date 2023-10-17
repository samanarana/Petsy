import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal/index";

function LoginFormModal() {
  const history = useHistory();
  const dispatch = useDispatch();
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
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
        validationErrors.email = "Please enter a valid email address.";
    }

    // Check if email and password fields are not empty
    if (!email) {
        validationErrors.email = "Email address is required.";
    }

    if (!password) {
        validationErrors.password = "Password is required.";
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
          <label>
              Email address
              <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "input-error" : ""}
                  required
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
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
              {errors.password && <div className="error-message">{errors.password}</div>}
          </label>
          <button className="login-button" type="submit" disabled={!email || !password}>Sign in</button>

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
