import React, { Children, useContext } from 'react'
import { UserContext } from '../context/userContext.jsx'
import Navbar from './Navbar.jsx';
import SideMenu from './SideMenu.jsx';

function DashboardLayout({activeMenu,Children}) {

    const {user}=useContext(UserContext);
  return (
    <div>
        <Navbar activeMenu={activeMenu} />

        {
            user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden ">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">{Children}</div>
                </div>
            )
        }
    </div>
  )
}

export default DashboardLayout