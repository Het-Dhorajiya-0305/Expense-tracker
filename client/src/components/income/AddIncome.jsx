import React, { useState } from 'react'
import { FaSortAmountDown } from 'react-icons/fa'
import Input from '../Input'

function AddIncome({ onAddIncome }) {

    const [income, setIncome] = useState({
        amount: "",
        date: "",
        source: ""
    })

    const handleChange = (key, value) => setIncome({ ...income, [key]: value })

    return (
        <div>
            <Input
                value={income.source}
                onChange={({target})=>handleChange("source",target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, etc."
                type="text"
            />
            <Input
                value={income.amount}
                onChange={({target})=>handleChange("amount",target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />
            <Input 
                value={income.date}
                onChange={({target})=>handleChange("date",target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                type='button'
                onClick={()=>onAddIncome(income)}
                className='add-btn add-btn-fill'
                >Add Income</button>
            </div>
        </div>
    )
}

export default AddIncome