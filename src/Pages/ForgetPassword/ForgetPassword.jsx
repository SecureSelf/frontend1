import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ForgetPassword.css';
import { StoreContext } from "../../store/storeContext";

const ForgetPassword = () => {
  const {url} = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Send OTP to the user's email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    const newUrl = url + '/user/send-otp';
    try {
      const response = await axios.post(newUrl, { email });
      console.log("OTP sent:", response.data);
      setIsOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Verify the OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const email = FormData.email;
    const newUrl = url + '/user/verify-email'
    try {
      const response = await axios.post(newUrl, { email, otp });
      console.log("OTP verified:", response.data);
      setEmail("");
      setOtp("");
      navigate(`/reset-password/${response.data.user}`);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="forget-password-wrapper background-gray">
      <div className="mt-5">
        <h2 className="mb-4">Forgot Password</h2>
        <form>

          {/* Email input field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              disabled={isOtpSent} // Disable email input after OTP is sent
            />
          </div>

          {/* Send OTP button */}
          {!isOtpSent && (
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
                  className="form-control"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter the OTP"
                  required
                />
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

export default ForgetPassword;

