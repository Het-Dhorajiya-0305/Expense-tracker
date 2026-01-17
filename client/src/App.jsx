import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/Auth/Login';
import SingUp from './pages/Auth/SingUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/userContext';


const Root = () => {

  const isAuthenticated = localStorage.getItem('token') ? true : false;

  return isAuthenticated ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />)
}

export const backend_url = import.meta.env.VITE_BACKEND_URL;

console.log("backend_url:", backend_url);

function App() {


  return (
    <UserProvider>
      <div className="">
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

