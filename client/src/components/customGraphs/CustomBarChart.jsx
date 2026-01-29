import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatBalance } from '../../context/helper'


const CustomBarShape = (props) => {
    const { x, y, width, height, index } = props
    const fill = index % 2 === 0 ? "#372AAC" : "#66a8f5"

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={10}
            ry={10}
            fill={fill}
        />
    )
}



function CustomBarChart({ data }) {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {

            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className="text-xs font-semibold text-indigo-800 mb-1">{payload[0].payload.source ? payload[0].payload.source : payload[0].payload.category}</p>
                    <p className='text-sm text-gray-600'>
                        Amount : <span className='text-sm font-medium text-gray-800'>{formatBalance(payload[0].payload.amount)}</span>
                    </p>
                </div>
            )
        }

        return null
    }
    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />

                    <XAxis dataKey={data[0]?.source ? "month" : "category"} tick={{ fontSize: 12, fill: '#555' }} stroke='none' />
                    <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke='none' />

                    <Tooltip content={CustomTooltip} />

                    <Bar dataKey="amount" shape={CustomBarShape} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart