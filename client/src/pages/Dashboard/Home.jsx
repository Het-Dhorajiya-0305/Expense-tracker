import React, { useContext, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout.jsx'
import axios from 'axios'
import { backend_url } from '../../App.jsx'
import { UserContext } from '../../context/userContext.jsx'
import { useLocation } from 'react-router-dom'

function Home() {

  const {userData,setUserData}=useContext(UserContext);

  const fetchUserData=async () => {
    try {
      const response=await axios.get(backend_url+"/api/dashboard/",{
        withCredentials:true
      })

      if(response.data.success)
      {
        setUserData(response.data.info);
      }
    } catch (error) {
      console.error("error in fetching User balance data ",error)
    }
  }

  useEffect(()=>{
    fetchUserData();
  },[])
  
 
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="mx-auto my-50">
        Home
      </div>
    </DashboardLayout>
  )
}

export default Home