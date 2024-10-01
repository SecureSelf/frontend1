import React, { useContext, useState } from "react";
import { StoreContext } from "../../store/storeContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import visibility icons
import bgforlogin from "../../img/bgforlogin.webp";
import { toast } from "react-toastify"; // Import Toastify for notifications

const Login = () => {
  const { url, setIsLogin } = useContext(StoreContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [showPassword, setShowPassword] = useState(false); // Password visibility state

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUrl = url + "/user/login";
    setIsLoading(true); // Start loader

    axios
      .post(newUrl, formData, {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false); // Stop loader
        // Clear form after successful login
        setFormData({
          email: "",
          password: "",
        });
        // If the login is successful, store the token and navigate to the homepage
        localStorage.setItem("token", response.data.data.token);
        setIsLogin(true);
        toast.success("Login successful!"); // Show success toast
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false); // Stop loader
        // Handle failure: set the error message
        setIsError(true);

        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
        toast.error(error.response ? error.response.data.message : "An error occurred."); // Show error toast
      });
  };

  return (
    <>
      <div
        className="login-section bg-[#f3f4f6] bg-cover pt-[30px]"
        style={{ backgroundImage: `url(${bgforlogin})` }}
      >
        <div className="login-upper-part ">
          <div className="mb-[-30px]">
            <img
              className="login-logo"
              src="./src/img/website logo.png"
              alt="logo"
            />
          </div>
          <h1 className="text-white">SecureSelf</h1>
          <h4>Secure your digital identity</h4>
        </div>
        <div className="login-wrapper ">
          <div className="mt-3 border">
            <h2 className="mb-4">Login</h2>
            <p className="text-[#777777]">
              Enter your credentials to access your account
            </p>
            <form onSubmit={handleSubmit}>
              {/* Email field */}
              <div className="mb-3 d-flex flex-column">
                <label htmlFor="email" className="form-label text-start">
                  Email
                </label>
                <div className="d-flex input-box">
                  <MdOutlineMail className="fs-4" />
                  <input
                    type="email"
                    className={`form-control ps-2`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required // Ensure email is required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="mb-3 d-flex flex-column">
                <label htmlFor="password" className="form-label text-start">
                  Password
                </label>
                <div className="d-flex input-box">
                  <FiLock className="fs-4" />
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    className={`form-control ps-2`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required // Ensure password is required
                  />
                  {showPassword ? (
                    <MdVisibilityOff
                      onClick={() => setShowPassword(false)}
                      className="fs-4 cursor-pointer"
                    />
                  ) : (
                    <MdVisibility
                      onClick={() => setShowPassword(true)}
                      className="fs-4 cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {isError && <div className="error-handling">{error}</div>}

              {/* Forget Password Link */}
              <div className="my-3">
                <Link to="/forget-password">Forgot your password?</Link>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
        <div className="login-lower-part">
          <h5 className="text-white">
            Don't have an account? <Link to="/register">Sign up</Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Login;
