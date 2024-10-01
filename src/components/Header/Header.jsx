import React, { useContext, useEffect, useState } from "react";
import logo from "../../img/ima.webp";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "./Header.css";
import { StoreContext } from "../../store/storeContext";
import Avatar from 'react-avatar';

function Header() {
  const [activeMenu, setActiveMenu] = useState("home");
  const { url, setIsLogin, isLogin, userDetails } = useContext(StoreContext);
  const navigate = useNavigate();
  const { id } = useParams();  // Using useParams to extract parameters
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    const newUrl = url + '/user/logout';

    try {
      await axios.get(newUrl, {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      setIsLogin(false);
      navigate("/");  // Use navigate to redirect after logout
    } catch (error) {
      console.log("An error occurred. Please try again.");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Optional: useParams in action, in case you want to utilize route params
  useEffect(() => {
    if (id) {
      console.log("Current ID:", id);  // Log the extracted route param for debugging
    }
  }, [id]);

  return (
    <header className="bg-gray-800 text-white p-2 w-full d-flex align-items-center justify-content-between">
      <div className="nav-left d-flex align-items-center">
        <img src={logo} alt="Website Logo" className="website-logo" />
        <span className="text-xl font-bold ml-2">Secure-Self</span>
        {/* Mobile Menu Toggle */}
        <span className="mobile-menu-toggle d-lg-none ml-auto" onClick={toggleMobileMenu}>
          &#9776;
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="nav-middle ml-[-30vw] d-none d-lg-block">
        <ul className="d-flex align-items-center gap-15 mb-0">
          <li className={activeMenu === "home" ? "active-menu" : ""}>
            <Link to="/" onClick={() => setActiveMenu("home")}>Home</Link>
          </li>
          <li className={activeMenu === "document" ? "active-menu" : ""}>
            <Link to="/document" onClick={() => setActiveMenu("document")}>Document</Link>
          </li>
          <li className={activeMenu === "notes" ? "active-menu" : ""}>
            <Link to="/notes" onClick={() => setActiveMenu("notes")}>Notes</Link>
          </li>
          <li className={activeMenu === "strikes" ? "active-menu" : ""}>
            <Link to="/strikes" onClick={() => setActiveMenu("strikes")}>Strikes</Link>
          </li>
          <li className={activeMenu === "contact" ? "active-menu" : ""}>
            <Link to="/contact" onClick={() => setActiveMenu("contact")}>Contact Us</Link>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="nav-right d-flex align-items-center mr-[30px]">
        {isLogin === false ? (
          <ul className="d-flex align-items-center gap-15 mb-0">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        ) : (
          <ul className="d-flex align-items-center gap-15 mb-0">
            <li className="profile-logo">
              <Avatar name={userDetails.name} size="30" round={true} />
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu d-lg-none ${mobileMenuOpen ? 'active' : ''}`}>
        <ul>
          <li className={activeMenu === "home" ? "active-menu" : ""}>
            <Link to="/" onClick={() => setActiveMenu("home")}>Home</Link>
          </li>
          <li className={activeMenu === "document" ? "active-menu" : ""}>
            <Link to="/document" onClick={() => setActiveMenu("document")}>Document</Link>
          </li>
          <li className={activeMenu === "notes" ? "active-menu" : ""}>
            <Link to="/notes" onClick={() => setActiveMenu("notes")}>Notes</Link>
          </li>
          <li className={activeMenu === "strikes" ? "active-menu" : ""}>
            <Link to="/strikes" onClick={() => setActiveMenu("strikes")}>Strikes</Link>
          </li>
          <li className={activeMenu === "contact" ? "active-menu" : ""}>
            <Link to="/contact" onClick={() => setActiveMenu("contact")}>Contact Us</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
