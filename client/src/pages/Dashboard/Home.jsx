import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout.jsx'
import axios from 'axios'
import { backend_url } from '../../App.jsx'
import { UserContext } from '../../context/userContext.jsx'
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { formatBalance } from '../../context/helper.js'
import InfoCard from '../../components/InfoCard.jsx'
import { IoMdCard } from 'react-icons/io'
import RecentTraction from '../../components/RecentTraction.jsx'
import { useNavigate } from 'react-router-dom'
import FinanceDashboard from '../../components/FinanceDashboard.jsx'

function Home() {

  const { userData, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const fetchUserData = async () => {

    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(backend_url + "/api/dashboard/", {
        withCredentials: true
      })

      if (response.data.success) {
        setUserData(response.data.info);
      }
    } catch (error) {
      console.error("error in fetching User balance data ", error)
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchUserData();
  }, [])


  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="mx-auto my-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard className='text-white' />}
            value={formatBalance(userData?.totalBalance)}
            color="bg-indigo-700"
            label="Total Balance"
          />
          <InfoCard
            icon={<LuWalletMinimal className='text-white' />}
            value={formatBalance(userData?.totalIncome)}
            color="bg-green-700"
            label="Total Income"
          />
          <InfoCard
            icon={<LuHandCoins className='text-white' />}
            value={formatBalance(userData?.totalExpense)}
            color="bg-red-700"
            label="Total Expense"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTraction
            transactions={userData?.recentTransactions}
            onSeeMore={()=>navigate("/expense")}
          />

          <FinanceDashboard
            totalBalance={userData?.totalBalance||0}
            totalIncome={userData?.totalIncome||0}
            totalExpense={userData?.totalExpense||0}

          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home