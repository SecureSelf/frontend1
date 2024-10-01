import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar'; // Import calendar library
import 'react-calendar/dist/Calendar.css'; // Optional: import pre-built styles
import axios from 'axios'; // Assuming you use axios to fetch data


import bgforlogin from '../img/bgforlogin.webp'

import { StoreContext } from '../store/storeContext';



const Strike = () => {
  const {userDetails} = useContext(StoreContext);

  const [loginDates, setLoginDates] = useState([]);

  const [highlightedDates, setHighlightedDates] = useState([]);
  
  // setLoginDates(userDetails.logins);
  // Fetch user login details
  // useEffect(() => {
  //   const fetchLoginData = async () => {
  //     try {
  //       // // Fetch login dates from the backend API
  //       // const response = await axios.get('/api/user-logins'); 
  //       setLoginDates(userDetails.logins);
  //       // Highlight login dates in the calendar
  //       const highlighted = response.data.map(login => new Date(login.loginDate));
  //       setHighlightedDates(highlighted);
  //     } catch (error) {
  //       console.error('Error fetching login data:', error);
  //     }
  //   };
  //   fetchLoginData();
  // }, []);

  useEffect(() => {
    const fetchLoginData = async () => {
      if (userDetails && userDetails.logins) {
        const highlighted = userDetails.logins.map(login => new Date(login.loginDate));
        setHighlightedDates(highlighted);
      }
    };
    fetchLoginData();
  }, [userDetails]); // Adding userDetails as a dependency
  

  // Highlight the dates on the calendar
  const tileContent = ({ date, view }) => {
    if (highlightedDates.find(d => d.getTime() === date.getTime())) {
      return <div className="bg-teal-300 rounded-full w-3 h-3 mx-auto"></div>; // Highlight circle on login date
    }
    return null;
  };

  return (
    <div className='bg-cover'  style={{ backgroundImage: `url(${bgforlogin})` }}>
    <div>
    <h1 className="text-3xl text-center pt-10 font-semibold text-[#d1b930] mb-10 ">User Login Calendar</h1>
    </div>
    <div className="flex flex-col items-center justify-center  pb-10">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <Calendar
          tileContent={tileContent} // Highlight login dates
          className="react-calendar p-4"
        />
      </div>
    </div>
    </div>
  );
};

export default Strike;
