import React, { useContext, useState } from "react";
import { StoreContext } from "../../store/storeContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

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

    axios.post(newUrl, formData)
      .then((response) => {

        // Clear form after successful login
        setFormData({
          email: "",
          password: "",
        });

        // If the login is successful, store the token and navigate to the homepage
        localStorage.setItem("token", response.data.data.token);
        navigate("/");
      })
      .catch((error) => {
        // Handle failure: set the error message
        setIsError(true);

        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="login-wrapper background-gray">
      <div className="mt-5">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Password field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          {isError && <div className="error-handling">{error}</div>}

          {/* Forget Password Link */}
          <div className="my-3">
            <Link to="/forget-password">Forgot your password?</Link>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
