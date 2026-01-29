import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import CustomTooltip from './CustomTooltip'



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


    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />

                    <XAxis dataKey="month" tick={{fontSize:12,fill:'#555'}} stroke='none'/>
                    <YAxis tick={{fontSize:12,fill:'#555'}} stroke='none' />

                    <Tooltip content={<CustomTooltip />} />

                    <Bar dataKey="amount" shape={CustomBarShape} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart