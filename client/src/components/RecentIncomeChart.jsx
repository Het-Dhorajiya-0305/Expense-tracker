import React, { useEffect, useState } from 'react'
import CustomPieChart from './customGraphs/PieChart'
import { formatBalance } from '../context/helper'


const COLORS=['#875cf5','#fa2c37','#ff6900','#4f39f6']

function RecentIncomeChart({ data, totalIncome }) {


    const [chartData, setChartData] = useState([]);

    const prepareData = () => {
        const arr = data.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }))

        setChartData(arr);
    }

    useEffect(()=>{
        prepareData();
    },[data])


    return (
        <div className='main-container'>
            <div className="flex items-center justify-center">
                <h4 className='text-lg'>Last 50 Days Income</h4>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={formatBalance(totalIncome)}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomeChart