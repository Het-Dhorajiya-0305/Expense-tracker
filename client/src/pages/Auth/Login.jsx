import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/AuthLayout.jsx'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { isValidEmail } from '../../context/helper.js';
import axios from 'axios';
import { backend_url } from '../../App.jsx';
import { UserContext } from '../../context/userContext.jsx';
import { toast } from 'react-toastify';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("please enter a valid email");
      return;
    }
    if (!password) {
      setError("please enter a password");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setError("");

    try {
      const payload = {
        email,
        password
      }

      const response = await axios.post(`${backend_url}/api/auth/login`, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (response.data.success) {
        // localStorage.setItem("refreshToken",response.data.token);
        setUser(response.data.user);
        toast.success(response.data.message,{
          autoClose:500
        })
        navigate('/dashboard');
      }
      else {
        console.log("login failed:", response.data.message);
        toast.error(response.data.message,{autoClose:700})
      }
    } catch (error) {
      console.log("error in login:", error);
      toast.error(error.response.data.message,{autoClose:700})
    }
  }


  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className='text-2xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-2 mb-6'>
          please enter your details to login
        </p>
        <form className='flex flex-col gap-4 mb-3' onSubmit={handleSubmit}>

          <label className='text-sm'>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='example@gmail.com'
            className='border border-slate-300 rounded-md p-3 text-sm focus:outline-none focus:border-slate-500 bg-indigo-100'
          />
          <label className='text-sm'>Password</label>
          <div className="border border-slate-300 rounded-md py-3 pl-3 text-sm bg-indigo-100 flex items-center">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "type" : "password"}
              placeholder='min. 8 characters'
              className='w-[90%] focus:outline-none'
            />
            <span onClick={handleShowPassword} className='hover:cursor-pointer'>
              {showPassword ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
            </span>
          </div>
          <p className='text-sm text-red-500'>{error}</p>
          <button
            type="submit"
            className='bg-indigo-800 text-white rounded-md p-3 text-sm hover:bg-indigo-700 hover:cursor-pointer transition-colors uppercase font-medium'
          >
            Login
          </button>
        </form>
        <p className='text-sm'>Don't have an account? <span className='text-blue-700 underline hover:cursor-pointer' onClick={() => navigate('/signUp')}>SignUp </span> </p>
      </div>
    </AuthLayout>
  )
}

export default Login