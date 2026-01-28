import React from 'react'

function InfoCard({ label, value, color,icon }) {
    return (
        <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-xl shadow-gray-200 border border-gray-200/50">
            <div className={`w-14 h-14 flex items-center justify-center text-2xl tetx-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div className="">
                <h4 className='text-sm text-gray-500 mb-1 capitalize'>{label}</h4>
                <span className='text-2xl font-medium'>{value}</span>
            </div>
        </div>
    )
}

export default InfoCard