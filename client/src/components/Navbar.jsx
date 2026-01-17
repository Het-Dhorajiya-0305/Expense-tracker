import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';


function Navbar({ activeMenu }) {

    const [openSideMenu, setOpenSideMenu] = useState(true);


    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-6 py-4 sticky top-0 left-0 z-20' >
            <button className='block lg:hidden text-black' onClick={() => setOpenSideMenu(!openSideMenu)}>
                {openSideMenu ? (
                    <HiOutlineX className='text-3xl' />
                ) : (
                    <HiOutlineMenu className='text-3xl' />
                )}
            </button>

            <h2 className='text-2xl font-medium text-black'>Expenso</h2>
                
            {
                openSideMenu && (
                    <div className="fixed top-15 -ml-4 bg-white">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                )
            }
        </div>
    )
}

export default Navbar