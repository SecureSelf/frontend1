import React from 'react';
import Header from './Header';
import exampleImage from '../img/first.jpg';  // Make sure to replace with the actual image path
import { styles } from '../styles';
function Homemain() {
  return (
    <div>
      <Header />
      
      {/* Main Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-[90px] px-8 py-12">
        
        {/* Left Section: Text, Title, Description, Buttons */}
        <div className="ml-[3%] md:w-1/2 mb-8 md:mb-0 ">
          <h1 className="text-[90px] font-bold mb-[-20px] ">Welcome To</h1>
          <h1 className={`${styles.heroHeadText} text-white mt-[20px]`}>
          
          <span className=" animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">SECURE SELF</span></h1>
          <br/>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed tracking-wide">
  <span className="font-semibold ">Store your important documents</span> with peace of mind.
  <br />
  <span className="font-medium">Our platform offers top-tier security and encryption</span>
  <br />
  to keep your data <span className="font-bold">safe and accessible</span> anytime.
</p>


          <br/>
         

          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-20 py-4 rounded hover:bg-blue-600">
              Get Started
            </button>
            <button className="bg-gray-700 text-white px-20 py-4 rounded hover:bg-gray-800">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2">
          <img src={exampleImage} alt="Secure Self" className="w-full h-[550px]" />
        </div>
      </div>
    </div>
  );
}

export default Homemain;
