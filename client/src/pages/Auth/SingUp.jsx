import React, { use, useState } from 'react'
import AuthLayout from '../../components/AuthLayout.jsx'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import ProfilePicSelector from '../../components/ProfilePicSelector.jsx';
import { isValidEmail } from '../../context/helper.js';
import axios from 'axios';
import { backend_url } from '../../App.jsx';


function SignUp() {

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("please enter your full name");
      return;
    }
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

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profileImage', profileImage);

      const response = await axios.post(`${backend_url}/api/auth/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.data.success) {
        navigate('/login');
        console.log(response.data.user);
      }
      else {
        console.log("error in signup:", response.data.message);
      }
    } catch (error) {
      console.log("error in signup:", error);
    }
    setError("");
  }


  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className='text-2xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-2 mb-6'>
          Join us today by entering your details below
        </p>
        <form className='flex flex-col gap-4 mb-3' onSubmit={handleSubmit}>
          <ProfilePicSelector image={profileImage} setImage={setProfileImage} />
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col w-full gap-3">
              <label className='text-sm'>Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder='John Doe'
                className='w-full border border-slate-300 rounded-md p-3 text-sm focus:outline-none focus:border-slate-500 bg-indigo-100'
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <label className='text-sm'>Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder='example@gmail.com'
                className='w-full border border-slate-300 rounded-md p-3 text-sm focus:outline-none focus:border-slate-500 bg-indigo-100'
              />
            </div>
          </div>

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
            className='bg-indigo-800 text-white rounded-md p-3 text-sm  hover:bg-indigo-700 hover:cursor-pointer transition-colors uppercase font-medium'
          >
            sign UP
          </button>
        </form>
        <p className='text-sm'>Already have an account? <span className='text-blue-700 underline hover:cursor-pointer' onClick={() => navigate('/login')}>Login </span> </p>
      </div>
    </AuthLayout>
  )
}

export default SignUp