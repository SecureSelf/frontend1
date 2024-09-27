import React, { useContext, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { StoreContext } from "../../store/storeContext";

const ResetPassword = () => {
  const { id } = useParams();
  const { url } = useContext(StoreContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Password strength validation
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();

    let newErrors = {};
   
    // Validate password strength
    if (!validatePassword(password)) {
      newErrors.password =
        "Password is weak. It must be at least 8 characters long, include a letter, a number, and a special character.";
    }
    // password is not matching
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // If there are errors, set them to the state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUrl = url + `/user/reset-password/${id}`;

    try {
      const response = await axios.put(newUrl, { password });
      console.log("Password reset successful:", response.data);
      navigate("/login"); // Navigate to login page after successful password reset
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="reset-password-wrapper background-gray">
      <div className="mt-5">
        <h2 className="mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          {/* Password input field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your new password"
              required
            />

            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Confirm Password input field */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your new password"
              required
            />

            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          {/* Reset Password button */}
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
