  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import './App.css';
 import Homemain from './components/Homemain';
  
  function App() {
    return (
      <>
    
        <Routes>
          <Route path='/home' element={<Homemain />} />
        </Routes>
      
      
      </>
    );
  }
  
  export default App;
  
