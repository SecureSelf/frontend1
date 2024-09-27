import React, { useState } from "react";
import logo from "../../img/ima.webp";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [activeMenu,setActiveMenu] = useState("home");
  return (
    <header className="bg-gray-800 text-white p-4 w-full d-flex align-items-center justify-content-between">
      <div className="nav-left">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Website Logo" className="h-10 w-10" />
          <span className="text-xl font-bold ml-[50px] ">Secure-Self</span>
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
      <div className="nav-right d-flex">
        <ul className="d-flex align-items-center  gap-15 mb-0">
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
        </ul>
      </div>
    </header>
  );
}

export default Header;
