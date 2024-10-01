import React, { useContext, useState } from "react";
import { StoreContext } from "../../store/storeContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import "../Login/Login.css";
import { MdOutlineDomainVerification, MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import bgforlogin from "../../img/bgforlogin.webp";
import { LuUser2 } from "react-icons/lu";

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
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Send OTP to the user's email
  const handleSendOtp = async (e) => {
    e.preventDefault();

    const newUrl = url + "/user/send-otp";
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

    const newUrl = url + "/user/verify-email";
    try {
      const response = await axios.post(newUrl, { email: formData.email, otp });
      console.log("OTP verified:", response.data);
      setOtp("");
      navigate("/login");
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
    <div
      className="login-section bg-[#f3f4f6] bg-cover py-[30px] "
      style={{ backgroundImage: `url(${bgforlogin})` }}
    >
      <div className="login-upper-part ">
        <div className=" mb-[-30px]">
          <img
            className="login-logo"
            src="./src/img/website logo.png"
            alt="logo"
          />
        </div>
        <h1 className="text-white">SecureSelf</h1>
        <h4>Secure your digital identity</h4>
      </div>
      <div className="login-wrapper">
        <div className="mt-3 border">
          <h2 className="mb-4">Register</h2>
          <p className="text-[#777777]">
            Enter your credential to register
          </p>
          <form onSubmit={handleSubmit}>

            {/* Name field */}
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="email" className="form-label text-start">
                Name
              </label>
              <div className="d-flex input-box">
                <LuUser2 className="fs-4" />
                <input
                  type="name"
                  className={`form-control ps-2`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="email" className="form-label text-start">
                Email
              </label>
              <div className="d-flex input-box">
                <MdOutlineMail className="fs-4" />
                <input
                  type="email"
                  className={`form-control ps-2 ${
                  errors.password ? "is-invalid" : ""
                }`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="password" className="form-label text-start">
                Password
              </label>
              <div className={`d-flex input-box ${errors.password ? "border border-danger" : ""}`}>
                <FiLock className="fs-4" />
                <input
                  type="password"
                  className={`form-control ps-2 `}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            {errors.password && (
                <div className="error-handling text-start mb-2 display-flex flex-wrap">{errors.password}</div>
              )}

            {/* Confirm password field */}
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="password" className="form-label text-start">
                Confirm Password
              </label>
              <div className={`d-flex input-box ${errors.confirmPassword ? "border border-danger" : ""}`}>
                <FiLock className="fs-4" />
                <input
                  type="password"
                  className={`form-control ps-2 
                }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter your confirm password"
                />
              </div>
            </div>
            {errors.confirmPassword && (
                <div className="error-handling text-start mb-2">{errors.confirmPassword}</div>
              )}

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
                <div className="mb-3 d-flex flex-column">
                  <label htmlFor="otp" className="form-label text-start">
                    OTP
                  </label>
                  <div className="d-flex input-box">
                    <MdOutlineDomainVerification className="fs-4" />
                    <input
                      type="text"
                      className={`form-control ps-2 ${
                      errors.otp ? "is-invalid" : ""
                    }`}
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter your OTP"
                      required
                    />
                    {errors.otp && (
                        <div className="invalid-feedback">{errors.otp}</div>
                      )}
                  </div>
                </div>

                {/* Verify OTP button */}
                <button onClick={handleVerifyOtp} className="btn">
                  Verify OTP
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      <div className="login-lower-part">
        <h5 className="text-white">
         Already have an account? <Link to="/login">Sign in</Link>
        </h5>
      </div>
    </div>
  );
};

export default Register;
