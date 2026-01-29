import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

function RecentIncome({ data, onSeeMore }) {
    return (
        <div className='main-container'>
            <div className="flex items-center justify-between">
                <h4 className='text-lg capitalize'>Income</h4>

                <button className='flex items-center justify-center gap-2 font-medium text-sm text-gray-700 hover:text-indigo-800 bg-gray-50 hover:bg-indigo-50 px-4 py-2 rounded-lg border-gray-200/50 cursor-pointer' onClick={onSeeMore}>See All <MdOutlineKeyboardArrowRight className='text-xl' /> </button>
            </div>

            <div className="mt-6">
                {
                    data?.map((item) => (
                        <TransactionInfoCard
                            key={item._id}
                            title={item.source}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type="income"
                            hideDeleteBtn
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default RecentIncome