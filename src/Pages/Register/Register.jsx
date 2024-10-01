import React, { useContext, useState } from "react";
import { StoreContext } from "../../store/storeContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineDomainVerification, MdOutlineMail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import bgforlogin from "../../img/bgforlogin.webp";
import Loader from "../../components/Loader"; // Loader component
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import "../Login/Login.css";

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
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setIsLoading(true);
    const newUrl = url + "/user/send-otp";
    try {
      const response = await axios.post(newUrl, { email: formData.email });
      toast.success("OTP sent to your email");
      setIsOtpSent(true);
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Verify the OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newUrl = url + "/user/verify-email";
    try {
      await axios.post(newUrl, { email: formData.email, otp });
      toast.success("OTP verified, account created successfully");
      navigate("/login");
    } catch (error) {
      setErrors({ otp: "Incorrect OTP" });
      toast.error("OTP verification failed");
    } finally {
      setIsLoading(false);
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
        "Password must be at least 8 characters long, include a letter, a number, and a special character.";
    }

    // If there are errors, set them to the state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const newUrl = url + "/user/register";
    try {
      await axios.post(newUrl, formData);
      setIsOtpSent(true);
      toast.success("Registered successfully, please verify OTP");
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-section bg-[#f3f4f6] bg-cover py-[30px]" style={{ backgroundImage: `url(${bgforlogin})` }}>
      <ToastContainer /> {/* Toastify container */}
      {isLoading && <Loader />} {/* Loader component */}
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
          <p className="text-[#777777]">Enter your credentials to register</p>
          <form onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="name" className="form-label text-start">Name</label>
              <div className="d-flex input-box">
                <LuUser2 className="fs-4" />
                <input type="text" className="form-control ps-2" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
              </div>
            </div>

            {/* Email field */}
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="email" className="form-label text-start">Email</label>
              <div className="d-flex input-box">
                <MdOutlineMail className="fs-4" />
                <input type="email" className="form-control ps-2" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
              </div>
            </div>

            {/* Password field with visibility toggle */}
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="password" className="form-label text-start">Password</label>
              <div className={`d-flex input-box ${errors.password ? "border border-danger" : ""}`}>
                <FiLock className="fs-4" />
                <input type={showPassword ? "text" : "password"} className="form-control ps-2" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                {showPassword ? <MdVisibilityOff onClick={() => setShowPassword(false)} className="fs-4 cursor-pointer" /> : <MdVisibility onClick={() => setShowPassword(true)} className="fs-4 cursor-pointer" />}
              </div>
            </div>

            {/* Confirm password field with visibility toggle */}
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="confirmPassword" className="form-label text-start">Confirm Password</label>
              <div className={`d-flex input-box ${errors.confirmPassword ? "border border-danger" : ""}`}>
                <FiLock className="fs-4" />
                <input type={showConfirmPassword ? "text" : "password"} className="form-control ps-2" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Enter your confirm password" />
                {showConfirmPassword ? <MdVisibilityOff onClick={() => setShowConfirmPassword(false)} className="fs-4 cursor-pointer" /> : <MdVisibility onClick={() => setShowConfirmPassword(true)} className="fs-4 cursor-pointer" />}
              </div>
            </div>

            {/* Submit button */}
            {!isOtpSent && <button type="submit" className="btn btn-primary">Register</button>}

            {/* Send OTP button */}
            {isOtpSent && <button onClick={handleSendOtp} className="btn btn-primary mb-3">Send OTP</button>}

            {/* OTP input and verify button */}
            {isOtpSent && (
              <>
                <div className="mb-3 d-flex flex-column">
                  <label htmlFor="otp" className="form-label text-start">OTP</label>
                  <div className={`d-flex input-box ${errors.otp ? "border border-danger" : ""}`}>
                    <MdOutlineDomainVerification className="fs-4" />
                    <input type="text" className="form-control ps-2" id="otp" name="otp" value={otp} onChange={handleOtpChange} placeholder="Enter your OTP" required />
                  </div>
                </div>
                <button onClick={handleVerifyOtp} className="btn">Verify OTP</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
