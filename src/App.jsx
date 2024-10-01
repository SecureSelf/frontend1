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
import Notes from "./Pages/Notes/Notes";
import Strike from "./components/Strikes";
import Documentupload from "./components/Documentupload";
import ExpertMain from "./components/ExpertMain";

function App() {
  const isLogin = true; // You can replace this with the context value: const { isLogin } = useContext(StoreContext);

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* Protected routes */}
          <Route path="/" element={<Layout />}>
            {isLogin ? (
              <>
                <Route index element={<Loginmain />} />
                <Route path="/upload/:category" element={<Uploadcard />} />
                <Route path="/other" element={<Otherupload />} />
                <Route path="/other-doc" element={<Other_doc />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/strikes" element={<Strike />} />
                <Route path="/document" element={<Documentupload />} />
                <Route path="/contact" element={<ExpertMain />} />
              </>
            ) : (
              // If not logged in, show the home page
              <Route index element={<Homemain />} />
            )}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
