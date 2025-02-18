import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContextProvider from './Context/ContextProvider';



createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <UserContextProvider>
    <App />
  </UserContextProvider>
  // </StrictMode>
)
