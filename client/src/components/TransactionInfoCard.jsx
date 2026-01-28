import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";
import { formatBalance } from '../context/helper';


function TransactionInfoCard({ title, date, amount, type, hideDeleteBtn }) {
  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-200'>
      <div className={`w-12 h-12 flex items-center justify-center text-xl text-gray-800 rounded-full ${type == "income" ? "bg-green-500" : "bg-red-500"}`}>
        {
          type == "income" ? (
            <LuTrendingUp />
          ) : (
            <LuTrendingDown />
          )
        }
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div className="">
          <p className='text-sm text-gray-800 mt font-medium capitalize'>
            {title}
          </p>
          <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>
        <div className="flex items-center gap-2">
          {
            !hideDeleteBtn && (
              <button
                className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                onClick={onDelete}
              >
                <FiTrash2 size={18} />
              </button>
            )
          }

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${type=="income"?"bg-green-50 text-green-500":"bg-red-50 text-red-500"}`}>
            <h5 className='text-md font-medium'>
              {type == "income" ? "+" : "-"} {formatBalance(amount)}
            </h5>
            {type == "income" ? <LuTrendingUp size={18}/> : <LuTrendingDown size={18}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard