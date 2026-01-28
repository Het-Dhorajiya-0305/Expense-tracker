import React, { useContext, useEffect } from 'react'
import {  useNavigate, } from 'react-router-dom'
import { UserContext } from '../context/userContext.jsx'
import axios from 'axios';
import { backend_url } from '../App.jsx';
import { LuHandCoins, LuLayoutDashboard, LuLogOut, LuWalletMinimal } from 'react-icons/lu';
import Avatar from 'react-avatar'



function SideMenu({ activeMenu }) {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();


    const menuItems = [
        {
            id: "1",
            label: "Dashboard",
            icon: LuLayoutDashboard,
            path: '/dashboard'
        },
        {
            id: "3",
            label: "Income",
            icon: LuWalletMinimal,
            path: '/income'
        },
        {
            id: "5",
            label: "Expense",
            icon: LuHandCoins,
            path: '/expense'
        },
        {
            id: "7",
            label: "Logout",
            icon: LuLogOut,
            path: 'logout'
        }
    ]


    const handleLogout = async () => {
        try {
            const response = await axios.post(`${backend_url}/api/auth/logout`, {}, {
                withCredentials: true
            });

            if (response.data.success) {
                setUser(null)
                navigate('/login');
                // localStorage.removeItem("refreshToken");
            }
        }
        catch (error) {

        }
    }



    return (
        <div className='w-64 h-[cal(100vh-61px)] bg-white border-gray-200/50 p-4 sticky top-15 z-20'>
            <div className="flex flex-col items-center justify-center mt-3 gap-3 mb-7">
                {
                    user?.profileImage ? (
                        <img
                            src={user?.profileImage || ""}
                            alt="Profile Image"
                            className='w-20 h-20 rounded-full bg-slate-400'
                        />
                    ) : (
                        <Avatar
                            name={user?.fullName}
                            size="80"
                            className='rounded-full'
                        />
                    )
                }

                <h3 className='text-gray-800 font-medium leading-6'>
                    {user?.fullName || ""}
                </h3>
            </div>
            {
                menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`w-full flex items-center gap-4 text-[16px] ${activeMenu == item.label ? "text-white bg-indigo-800" : ""} py-3 px-7 rounded-lg mb-3 hover:cursor-pointer`}
                        onClick={() => {
                            if (item.label == "Logout") {
                                handleLogout();
                            }
                            else {
                                navigate(item.path)
                            }
                        }}
                    >
                        <item.icon className='text-xl' />
                        {item.label}

                    </button>
                ))
            }
        </div>
    )
}

export default SideMenu