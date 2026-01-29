import React, { useEffect, useState } from 'react'
import { incomeBarChartData } from '../../context/helper';
import { FiPlus } from "react-icons/fi";
import CustomBarChart from '../CustomBarChart';


function IncomeOverview({transaction,onAddIncome}) {

    const [chartData,setChartData]=useState([]);

    useEffect(()=>{
        const incomeData=incomeBarChartData(transaction);
        setChartData(incomeData)
    },[transaction])


  return (
    <div className='main-container'>
        <div className="flex items-center justify-between">
            <div className="">
                <h4 className='text-lg'>Income Overview</h4>
                <p className='text-xs text-gray-400 mt-0.5'>Track your earning over time and analyze your income trends.</p>
            </div>

            <button className='add-btn' onClick={onAddIncome}>
                <FiPlus className='text-lg'/> Add Income
            </button>
        </div>
        <div className="mt-10">
            <CustomBarChart data={chartData}/>
        </div>

    </div>
  )
}

export default IncomeOverview