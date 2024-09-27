import React, { useContext, useState } from "react";
import { StoreContext } from "../../store/storeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css'

const Register = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Password strength validation
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Send OTP to the user's email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    const newUrl = url + '/user/send-otp';
    try {
      const response = await axios.post(newUrl, { email: formData.email });
      console.log("OTP sent:", response.data);
      setIsOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Verify the OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const newUrl = url + '/user/verify-email';
    try {
      const response = await axios.post(newUrl, { email: formData.email, otp });
      console.log("OTP verified:", response.data);
      setOtp("");
      navigate('/login');
    } catch (error) {
      let newErrors = {};
      newErrors.otp = "Otp is incorrect";
      setErrors(newErrors);

      console.error("Error verifying OTP:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Validate password strength
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password is weak. It must be at least 8 characters long, include a letter, a number, and a special character.";
    }

    // If there are errors, set them to the state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with form submission
    const newUrl = url + "/user/register";
    try {
      const response = await axios.post(newUrl, formData);
      setIsOtpSent(true);
      console.log(response);
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className="register-wrapper background-gray">
      <div className="mt-5">
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Confirm password field */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          {/* Submit button */}
          {!isOtpSent && (
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          )}

          {/* Send OTP button */}
          {isOtpSent && (
            <button onClick={handleSendOtp} className="btn btn-primary mb-3">
              Send OTP
            </button>
          )}

          {/* OTP input field */}
          {isOtpSent && (
            <>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  OTP
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.otp ? "is-invalid" : ""}`}
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter the OTP"
                  required
                />
                {errors.otp && <div className="invalid-feedback">{errors.otp}</div>}
              </div>

              {/* Verify OTP button */}
              <button onClick={handleVerifyOtp} className="btn btn-primary">
                Verify OTP
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
