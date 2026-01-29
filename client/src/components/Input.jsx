import React from 'react'

function Input({ label, value, placeholder, type, onChange }) {
    return (
        <div>
            <label className='text-sm text-slate-800'>{label}</label>
            <div className="input-box">

                <input
                    value={value}
                    onChange={(e) =>onChange(e) }
                    type={type}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none'
                />
            </div>
        </div>
    )
}

export default Input