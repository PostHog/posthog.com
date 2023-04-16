import React, { ButtonHTMLAttributes } from 'react'

export default function Button({
    className = '',
    children,
    ...other
}: { className?: string; children: React.ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={`border rounded-md px-4 py-2 font-bold ${className}`} {...other}>
            {children}
        </button>
    )
}
