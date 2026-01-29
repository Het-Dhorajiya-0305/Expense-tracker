import React from 'react'
import { formatBalance } from '../../context/helper'

function CustomTooltip({ active, payload }) {

    if (active && payload && payload.length) {

        return (
            <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                <p className="text-xs font-semibold text-indigo-800 mb-1">{payload[0].name}</p>
                <p className='text-sm text-gray-600'>
                    Amount : <span className='text-sm font-medium text-gray-800'>{formatBalance(payload[0].value)}</span>
                </p>
            </div>
        )
    }
}

export default CustomTooltip