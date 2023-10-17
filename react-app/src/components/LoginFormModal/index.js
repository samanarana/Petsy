import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal/index";
import { useHistory, Redirect } from "react-router-dom";

function LoginFormModal() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal, openModal } = useModal();


  //Demo User Button Config
  const demoUserButton = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      setTimeout(()=> { <Redirect to='/' />;}, 1000)
      closeModal()
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
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
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email address
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
