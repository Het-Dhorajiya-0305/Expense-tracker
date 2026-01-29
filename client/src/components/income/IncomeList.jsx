import React from 'react'
import { FiDownload } from "react-icons/fi";
import TransactionInfoCard from '../TransactionInfoCard';
import moment from 'moment';


function IncomeList({ transaction, onDelete, onDownload }) {
    return (
        <div className='main-container'>
            <div className="flex items-center justify-between">
                <h4 className='text-lg'>Income Sources</h4>
                <button className='card-btn' onClick={onDownload}>
                    <FiDownload className='text-sm' /> Download
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {
                    transaction?.map((income) => (
                        <TransactionInfoCard
                            key={income._id}
                            title={income.source}
                            date={moment(income.date).format("Do MMM YYYY")}
                            amount={income.amount}
                            type="income"
                            onDelete={()=>onDelete(income._id)}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default IncomeList