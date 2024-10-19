import React, { useContext, useEffect, useState } from "react";
import logo from "../../img/Secure-Self__2_-removebg-preview.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import { StoreContext } from "../../store/storeContext";
import Avatar from "react-avatar";
import { MdOutlineMenu } from "react-icons/md";

function Header() {
  const [activeMenu, setActiveMenu] = useState("home");
  const { url, setIsLogin, isLogin, userDetails } = useContext(StoreContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();
    console.log(windowSize.width);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    const newUrl = url + "/user/logout";

    try {
      await axios.get(newUrl, {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      setIsLogin(false);
      navigate("/");
    } catch (error) {
      console.log("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (location.pathname) {
      const params = location.pathname;
      if (params === "/") {
        setActiveMenu("home");
      } else if (params === "/notes") {
        setActiveMenu("notes");
      } else if (params === "/document") {
        setActiveMenu("document");
      } else if (params === "/contact") {
        setActiveMenu("contact");
      } else if (params === "/strikes") {
        setActiveMenu("strikes");
      }
    }
  }, [location]);
 

  return (
    <>
      {windowSize.width >= 770 ? <header className="bg-gray-800 text-white p-0 w-full d-flex align-items-center justify-content-between">

       <div className="nav-left d-flex align-items-center">
         <img src={logo} alt="Website Logo" className="website-logo" />
         <span className="text-xl font-bold ml-2">Secure-Self</span>
       </div>
       
       <div className="nav-middle  lg:ml-[-30vw] ">
         <ul className="d-flex align-items-center gap-15 mb-0">
           <li className={activeMenu === "home" ? "active-menu" : ""}>
             <Link to="/" >Home</Link>
           </li>
           <li className={activeMenu === "document" ? "active-menu" : ""}>
             <Link to="/document" >Document</Link>
           </li>
           <li className={activeMenu === "notes" ? "active-menu" : ""}>
             <Link to="/notes" >Notes</Link>
           </li>
           <li className={activeMenu === "strikes" ? "active-menu" : ""}>
             <Link to="/strikes" >Strikes</Link>
           </li>
           <li className={activeMenu === "contact" ? "active-menu" : ""}>
             <Link to="/contact">Contact Us</Link>
           </li>
         </ul>
       </div>

       
       <div className="nav-right align-items-center mr-[30px]">
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
           <ul className={`align-items-center gap-15 mb-0 ${mobileMenuOpen ? "d-none":"d-flex"}`}>
             <li className="profile-logo">
               <Avatar name={userDetails.name} size="30" round={true} />
             </li>
             <li>
               <Link onClick={handleLogout}>Logout</Link>
             </li>
           </ul>
         )}
       </div>
     </header>:<></>}

      {windowSize.width <770 ? <header className="bg-gray-800 text-white px-2 w-full d-flex flex-column justify-content-center">
        <div className="d-flex flex-row w-100 justify-content-between p-0">
          <div className="d-flex flex-row justify-content-center">
            <img
              src={logo}
              alt="Website Logo"
              className="website-logo"
              width={100}
            />
            {/* <span className="text-xl font-bold ml-2">Secure-Self</span> */}
          </div>
          <div className="hamburger" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>
            <MdOutlineMenu />
          </div>
        </div>

        {mobileMenuOpen && <div className="d-flex flex-column align-items-start w-100">
          <ul className="d-flex flex-column align-items-start mt-3 p-2">
            <li className={activeMenu === "home" ? "active-menu" : ""}>
              <Link to="/" onClick={() => setActiveMenu("home")}>
                Home
              </Link>
            </li>
            <li className={activeMenu === "document" ? "active-menu" : ""}>
              <Link to="/document" onClick={() => setActiveMenu("document")}>
                Document
              </Link>
            </li>
            <li className={activeMenu === "notes" ? "active-menu" : ""}>
              <Link to="/notes" onClick={() => setActiveMenu("notes")}>
                Notes
              </Link>
            </li>
            <li className={activeMenu === "strikes" ? "active-menu" : ""}>
              <Link to="/strikes" onClick={() => setActiveMenu("strikes")}>
                Strikes
              </Link>
            </li>
            <li className={activeMenu === "contact" ? "active-menu" : ""}>
              <Link to="/contact" onClick={() => setActiveMenu("contact")}>
                Contact Us
              </Link>
            </li>
            {isLogin === true?(
              <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
            ):(
              <>
              <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            </>
            )}
          </ul>
        </div>}
      </header>:<></>}
    </>
  );
}

export default Header;
