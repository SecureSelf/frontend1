import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './store/storeContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
    // <BrowserRouter>
    <StoreContextProvider>

      <App />
    </StoreContextProvider>
    // </BrowserRouter>
);
