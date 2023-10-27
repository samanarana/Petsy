import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let validationErrors = {};

		// Email Validation
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if (!emailRegex.test(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }

		// Password Strength
		if (password.length < 6) {
			validationErrors.password = "Password should be at least 6 characters.";
		}

		// Check Confirm Password
		if (password !== confirmPassword) {
			validationErrors.confirmPassword = "Confirm Password field must be the same as the Password field.";
		}

		// Username Length
		if (username.length < 4) {
			validationErrors.username = "Username should be at least 4 characters.";
		}

		if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

		const data = await dispatch(signUp(username, email, password));

        if (data && data.errors) {
            setErrors({ general: data.errors });
        } else {
            closeModal();
        }
    };

	return (
		<>
		<div className="signup-form-modal">
			<h3>Create your account</h3>
			<p>Registration is easy.</p>
			{errors.general && errors.general.map(error =>
                <div key={error} className="error-message">{error}</div>
            )}
				<form onSubmit={handleSubmit}>
					<label>
						Email *
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
						Username *
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className={errors.username ? "input-error" : ""}
							required
						/>
						{errors.username && <div className="error-message">{errors.username}</div>}
					</label>
					<label>
						Password *
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={errors.password ? "input-error" : ""}
							required
						/>
						{errors.password && <div className="error-message">{errors.password}</div>}
					</label>
					<label>
						Confirm Password *
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className={errors.confirmPassword ? "input-error" : ""}
							required
						/>
						{errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
					</label>
					<button
						className="signup-button"
						type="submit"
						disabled={!email.includes('@') || username.length < 4 || password.length < 6 || password !== confirmPassword}>
						Register
					</button>
				</form>
			</div>
		</>
	);
}
export default SignupFormModal;
