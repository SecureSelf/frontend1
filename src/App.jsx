  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import './App.css';
  import Homemain from './components/Homemain';
  import Loginmain from './components/Loginmain';
  import Uploadcard from './components/Uploadcard';
  import Otherupload from './components/Otherupload';
  import Other_doc from './components/Other_doc';
  import Layout from './Components/Layout';
  import Login from './Pages/Login/Login'
  import Register from './Pages/Register/Register'
  import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
  import ResetPassword from './Pages/ResetPassword/ResetPassword';

  function App() {
    return (
      <>
    
        <Routes>

         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path="/reset-password/:id" element={<ResetPassword />} />
         <Route path="/forget-password" element={<ForgetPassword />} />

       <Route path='/' element={<Layout />}>

          <Route index element={<Homemain />} /> {/* Home page */}
          <Route path='/main' element={<Loginmain />} />
          <Route path='/upload/:category' element={<Uploadcard />} />
          <Route path='/other' element={<Otherupload />} />
          <Route path='/other-doc' element={<Other_doc />} />

       </Route>

        </Routes>
      </>
    );
  }
  
  export default App;
  
