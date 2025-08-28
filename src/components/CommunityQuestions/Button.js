import React from 'react'

export default function Button({ children, disabled, loading, ...other }) {
    return (
        <button
            disabled={disabled || loading}
            {...other}
            className={`text-base font-bold py-2 px-5 border-2 rounded-md ${
                disabled ? 'border-primary text-gray' : 'bg-red text-white border-red'
            }`}
        >
            {loading ? 'Updating...' : children}
        </button>
    )
}
