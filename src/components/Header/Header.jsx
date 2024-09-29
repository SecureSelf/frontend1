import React, { useContext, useState } from "react";
import logo from "../../img/ima.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import "./Header.css";
import { StoreContext } from "../../store/storeContext";
import Avatar from 'react-avatar';

function Header() {
  const [activeMenu,setActiveMenu] = useState("home");
  const {url,setIsLogin,isLogin,userDetails} = useContext(StoreContext);
  const navigate = useNavigate();
  const handleLogout = async() =>{
    const newUrl = url + '/user/logout';

    axios.get(newUrl,{
      withCredentials: true,
    })
    .then((response) => {
      localStorage.removeItem("token");
      console.log(response);
      setIsLogin(false);
      console.log(isLogin)
      navigate("/");
    })
    .catch((error) => {
      console.log("An error occurred. Please try again.");
    });

  }
  return (
    <header className="bg-gray-800 text-white p-2 w-full d-flex align-items-center justify-content-between">
      <div className="nav-left">
        <div className="d-flex align-items-center">
          <img src="./src/img/website logo.png" alt="Website Logo" className="website-logo" />
          <span className="text-xl font-bold ">Secure-Self</span>
        </div>
      </div>
      <div className="nav-middle ml-[-30vw]">
        <ul className="d-flex align-items-center gap-15 mb-0">
          <li  className={activeMenu == "home" ?"active-menu" : ""}>
            <Link to='/' onClick={()=>setActiveMenu("home")}>Home</Link>
          </li>
           <li  className={activeMenu == "document" ?"active-menu" : ""}>
            <Link to='/document' onClick={()=>setActiveMenu("document")}>Document</Link>
          </li>
           <li className={activeMenu == "notes" ?"active-menu" : ""}>
            <Link to='/notes' onClick={()=>setActiveMenu("notes")}>Notes</Link>
          </li>
           <li className={activeMenu == "strikes" ?"active-menu" : ""}>
            <Link to='/strikes' onClick={()=>setActiveMenu("strikes")}>Strikes</Link>
          </li>
           <li className={activeMenu == "contact" ?"active-menu" : ""}>
            <Link to='/contact' onClick={()=>setActiveMenu("contact")}>Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right d-flex mr-[30px]">
        {isLogin == false ? <ul className="d-flex align-items-center  gap-15 mb-0">
          <li>
             <Link to='/login'>
                 Login
             </Link>
          </li>
          <li>
             <Link to='/register'>
                 Register
             </Link>
          </li>
        </ul> :  <ul className="d-flex align-items-center  gap-15 mb-0">
        <li className="profile-logo">
          {/* Generate avatar based on the user's name */}
          <Avatar 
            name={userDetails.name} 
            size="30" 
            round={true} 
          />
        </li>
          <li>
             <Link onClick={handleLogout}>
                 Logout
             </Link>
          </li>
        </ul>}
        
       
      </div>
    </header>
  );
}

export default Header;
