import React, { useEffect, useState } from 'react'
import { lineChartData } from '../../context/helper';
import { FiPlus } from 'react-icons/fi';
import CustomLineChart from '../customGraphs/CustomLineChart';

function ExpenseOverview({ transaction, onAddExpense }) {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = lineChartData(transaction)
        setChartData(result)
    }, [transaction]

    )
    return (
        <div className='main-container'>
            <div className="flex items-center justify-between">
                <div className="">
                    <h4 className='text-lg'>Expense Overview</h4>
                    <p className='text-xs text-gray-400 mt-0.5'>Track your spending trends over time and gain insights into where your money goes. </p>
                </div>

                <button className='add-btn' onClick={onAddExpense}>
                    <FiPlus className='text-lg' /> Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart transaction={chartData} />
            </div>

        </div>
    )
}

export default ExpenseOverview