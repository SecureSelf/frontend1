import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const url = "http://localhost:5100/api";
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false); 
  const [userDetails, setUserDetails] = useState({});

  const fetchUserData = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.get(url + '/user/get-user', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        withCredentials: true,
      });

      if (response.data) {
        // Set userDetails
        setUserDetails({
          name: response.data.name,
          email: response.data.email,
        });
        setIsLogin(true); 
      }
    } catch (error) {
      console.error("Failed to get the user data", error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    // console.log("Updated userDetails:", userDetails);
  }, [userDetails]); // Dependency array with userDetails
  

  useEffect(() => {
    const loadData = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken); // Set the token in state
        await fetchUserData(); // Fetch user data
      }
    };
    loadData();
  }, []);

  const ContextValue = {
    url,
    isLogin,
    setIsLogin,
    userDetails, 
    setToken, 
  };
  
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
