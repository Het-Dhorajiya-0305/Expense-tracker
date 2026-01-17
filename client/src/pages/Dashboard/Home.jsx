import React from 'react'
import DashboardLayout from '../../components/DashboardLayout.jsx'
import useUserAuth from '../../hooks/userAuth.jsx'


function Home() {

  useUserAuth();

  return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="mx-auto my-50">
          Home
        </div>
      </DashboardLayout>
  )
}

export default Home