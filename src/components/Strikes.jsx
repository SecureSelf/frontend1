import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'; // Import calendar library
import 'react-calendar/dist/Calendar.css'; // Optional: import pre-built styles
import axios from 'axios'; // Assuming you use axios to fetch data

const Strike = () => {
  const [loginDates, setLoginDates] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);

  // Fetch user login details
  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        // Fetch login dates from the backend API
        const response = await axios.get('/api/user-logins'); 
        setLoginDates(response.data);
        // Highlight login dates in the calendar
        const highlighted = response.data.map(login => new Date(login.loginDate));
        setHighlightedDates(highlighted);
      } catch (error) {
        console.error('Error fetching login data:', error);
      }
    };
    fetchLoginData();
  }, []);

  // Highlight the dates on the calendar
  const tileContent = ({ date, view }) => {
    if (highlightedDates.find(d => d.getTime() === date.getTime())) {
      return <div className="bg-teal-300 rounded-full w-3 h-3 mx-auto"></div>; // Highlight circle on login date
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-teal-600 mb-8">User Login Calendar</h1>
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <Calendar
          tileContent={tileContent} // Highlight login dates
          className="react-calendar p-4"
        />
      </div>
    </div>
  );
};

export default Strike;
