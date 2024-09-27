import { createContext, useEffect, useState } from "react";
import axios from 'axios'


export const StoreContext = createContext();

const StoreContextProvider = (props) => {     
  
  const url = "http://localhost:5100/api"
  const [token,setToken] = useState("");
  const [ registerFormData,setRegisterFormData ] = useState({
     name:'',
     password:'',
     email:'',
     phone:'',
     confirmPassword:''
  });  

  useEffect(()=>{
    async function loadData(){
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
     }
    }
    loadData();
  },[])

  const ContextValue = {
    url,
    registerFormData,
    setRegisterFormData
  };
  
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;