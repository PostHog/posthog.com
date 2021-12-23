import React from 'react'

export default function Button({ children, disabled, loading, ...other }) {
    return (
        <button
            {...other}
            className={`w-full my-3 text-base font-bold py-2 px-5 border-2 rounded-full ${
                disabled ? 'border-gray-accent-light text-gray' : 'bg-red text-white border-red'
            }`}
        >
            {loading ? 'Submitting...' : children}
        </button>
    )
}
