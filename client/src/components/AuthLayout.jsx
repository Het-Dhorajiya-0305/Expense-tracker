import React from 'react'
import landingImage from '../assets/images/landing_page.png'
import { LuTrendingUpDown } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs"

function AuthLayout({ children }) {
  return (
    <div className='flex h-screen'>
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className='text-4xl font-semibold text-black '>Expenso</h2>
        <p className='text-sm text-gray-600'>expense tracker</p>
        {children}
      </div>
      <div className="hidden md:block w-[50vw] bg-indigo-100 bg-cover bg-center bg-no-repeat overflow-hidden p-7 relative">
        <div className="w-48 h-48 bg-indigo-800 rounded-full absolute -top-10 -left-5 "></div>
        <div className="w-48 h-60 border-20 rounded-[40px] border-teal-500 absolute top-40 -right-10"></div>
        <div className="w-48 h-48 bg-indigo-800 rounded-4xl absolute -bottom-10 -left-4 "></div>

        <div className="w-[90%] h-20 bg-white absolute rounded-l-full rounded-r-2xl flex items-center p-5 gap-6">
          <div className=" w-12 h-12 p-3 rounded-full bg-indigo-800 flex items-center justify-center">
            <LuTrendingUpDown className='text-3xl text-white' />
          </div>
          <div className="text-start">
            <p className='text-gray-500 capitalize text-xs mb-1 font-semibold'>track your income & expense</p>
            <h2 className='flex items-center text-xl font-semibold'>
              <BsCurrencyDollar className='font-semibold' /><span>390,000</span>
            </h2>
          </div>
        </div>
        <img src={landingImage} alt="" className='w-[90%] rounded-2xl absolute bottom-10 shadow-lg ' />
      </div>
    </div>
  )
}

export default AuthLayout