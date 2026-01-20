import React, { useContext, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import Login from './pages/Auth/Login';
import SingUp from './pages/Auth/SingUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider, { UserContext } from './context/userContext';
import { ToastContainer } from 'react-toastify'
import axios from 'axios';



const Root = () => {

  const checkAuth = async () => {
    try {
      const response = await axios.get(backend_url + "api/auth/", {
        withCredentials: true
      })

      if ((await response).data.success) {
        return true;
      }
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const isAuthenticated = checkAuth();

  return isAuthenticated ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />)
}

export const backend_url = import.meta.env.VITE_BACKEND_URL;


function App() {

  return (
    <UserProvider>
      <div className="">
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SingUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  )
}

export default App;

