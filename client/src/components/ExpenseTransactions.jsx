import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

function ExpenseTransactions({transactions,onSeeMore}) {
  return (
    <div className='main-container'>
        <div className="flex items-center justify-between">
            <h4 className='text-lg'>Expenses</h4>
            <button className='flex items-center justify-center gap-2 font-medium text-sm text-gray-700 hover:text-indigo-800 bg-gray-50 hover:bg-indigo-50 px-4 py-2 rounded-lg border-gray-200/50 cursor-pointer' onClick={onSeeMore}>See All <MdOutlineKeyboardArrowRight className='text-xl' /> </button>
        </div>
        <div className="mt-5">
            {
                transactions?.slice(0,5)?.map((expense)=>(
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn
                    />
                ))
            }
        </div>
    </div>
  )
}

export default ExpenseTransactions