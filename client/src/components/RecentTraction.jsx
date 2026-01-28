import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import TransactionInfoCard from './TransactionInfoCard.jsx';
import moment from "moment"


function RecentTraction({ transactions, onSeeMore }) {
  return (
    <div className='bg-white p-5 rounded-2xl shadow-md shadow-gray-100 border border-gray-300/50'>
      <div className="flex items-center justify-between">
        <h4 className='text-lg capitalize'>Recent Transactions</h4>

        <button className='flex items-center justify-center gap-2 font-medium text-sm text-gray-700 hover:text-indigo-800 bg-gray-50 hover:bg-indigo-50 px-4 py-2 rounded-lg border-gray-200/50 cursor-pointer' onClick={onSeeMore}>See All <MdOutlineKeyboardArrowRight className='text-xl' /> </button>
      </div>

      <div className="mt-6">
        {
          transactions?.slice(0,5)?.map((item)=>(
            <TransactionInfoCard
              key={item._id}
              title={item.type=="expense"?item.category:item.source}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        }
      </div>
    </div>
  )
}

export default RecentTraction