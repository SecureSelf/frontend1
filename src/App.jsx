import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homemain from "./components/Homemain";
import Loginmain from "./components/Loginmain";
import Uploadcard from "./components/Uploadcard";
import Otherupload from "./components/Otherupload";
import Other_doc from "./components/Other_doc";
import Layout from "./Components/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { useContext } from "react";
import { StoreContext } from "./store/storeContext";
import { Navigate } from 'react-router-dom';
import Notes from "./Pages/Notes/Notes";
import Strike from "./components/Strikes";
import Documentupload from "./components/Documentupload";
import ExpertMain from "./components/ExpertMain";
function App() {

  // const { isLogin } = useContext(StoreContext);
  // const isLogin = false

  // const { isLogin } = useContext(StoreContext);
  const isLogin = true

  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/" element={<Layout />}>
          {isLogin ? (
            <>
              <Route index path="/" element={<Loginmain />} />
              <Route path="/upload/:category" element={<Uploadcard />} />
              <Route path="/other" element={<Otherupload />} />
              <Route path="/other-doc" element={<Other_doc />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/strikes" element={<Strike />} />
              <Route path="/document" element={<Documentupload />} />
              <Route path="/contact" element={<ExpertMain />} />
              
            </>
          ) : (
            // If logged out, redirect to home page for any other route
            <>
              <Route index path="/" element={<Homemain/>} />
            </>
          )}
        </Route>
      </Routes>
      </Router>
    </>
  );
}

export default App;
