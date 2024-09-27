  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import './App.css';
  import Homemain from './components/Homemain';
  import Loginmain from './components/Loginmain';
  import Uploadcard from './components/Uploadcard';
  import Otherupload from './components/Otherupload';
  import Other_doc from './components/Other_doc';
  function App() {
    return (
      <>
    
        <Routes>
          
          <Route path='/home' element={<Homemain />} />
          <Route path='/main' element={<Loginmain/>} />
          <Route path="/upload/:category"  element={<Uploadcard/>} />
          <Route path="/other"  element={<Otherupload/>}/>
          <Route path="/other-doc"  element={<Other_doc/>}/>
          
        </Routes>
      
      
      </>
    );
  }
  
  export default App;
  
