import React from 'react'
import { formatBalance } from '../context/helper'
import CustomPieChart from './PieChart'

function FinanceDashboard({ totalBalance, totalIncome, totalExpense }) {

    const COLORS = ["#372aac", "#FA2C37", "#FF6900"]

    const userBalanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Income", amount: totalIncome },
        { name: "Total Expense", amount: totalExpense }
    ]
    return (
        <div className='bg-white p-5 rounded-2xl shadow-md shadow-gray-100 border border-gray-300/50'>
            <div className="flex items-center justify-between">
                <h4 className='text-lg'>Financial Overview</h4>
            </div>

            <CustomPieChart
                data={userBalanceData}
                label="Total Balance"
                totalAmount={formatBalance(totalBalance)}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceDashboard