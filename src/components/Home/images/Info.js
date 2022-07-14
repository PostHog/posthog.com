import React from 'react'

export default function Info({ className = '' }) {
    return (
        <svg fill="none" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="10" fill="#1D4AFF" fillOpacity=".15" />
            <path d="M9.048 15.507h2.371V8.53H9.05v6.977ZM9 6.362h2.5V4.088H9v2.274Z" fill="#1D4AFF" />
        </svg>
    )
}
