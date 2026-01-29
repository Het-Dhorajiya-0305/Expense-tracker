import React from 'react'
import { FiDownload } from 'react-icons/fi'
import TransactionInfoCard from '../TransactionInfoCard'
import moment from 'moment'

function ExpenseList({ transaction, onDelete, onDownload }) {
    return (
        <div className='main-container'>
            <div className="flex items-center justify-between">
                <h4 className='text-lg'>All Expense</h4>
                <button className='card-btn' onClick={onDownload}>
                    <FiDownload className='text-sm' /> Download
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {
                    transaction?.map((expense) => (
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            date={moment(expense.date).format("Do MMM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense._id)}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ExpenseList