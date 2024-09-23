import React from 'react';
import logo from '../img/ai image.webp';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <div className="w-full  flex justify-between items-center">
        {/* Left Section: Logo and Website Name */}
        <div className="flex items-center ml-[5%]">
          <img src={logo} alt="Website Logo" className="h-10 w-10 mr-3" />
          <span className="text-xl font-bold ml-[50px]">Secure-Self</span>
        </div>

        {/* Right Section: Links */}
        <nav>
          <ul className="flex space-x-6 mr-10">
            <li>
              <a href="/login" className="hover:text-gray-300">Login</a>
            </li>
            <li>
              <a href="/signup" className="hover:text-gray-300">Signup</a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-300">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
