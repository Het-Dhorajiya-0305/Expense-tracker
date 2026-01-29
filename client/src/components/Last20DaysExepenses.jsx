import React, { useEffect, useState } from 'react'
import { expenseBarChartData } from '../context/helper';
import CustomBarChart from './customGraphs/CustomBarChart';

function Last20DaysExepenses({ data }) {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = expenseBarChartData(data)
        setChartData(result);
    }, [data])

    return (
        <div className='main-container col-span-1'>
            <div className="flex items-center justify-between">
                <h4 className='text-lg'>Last 20 Days Expenses</h4>
            </div>
            <CustomBarChart data={chartData} />
        </div>
    )
}

export default Last20DaysExepenses