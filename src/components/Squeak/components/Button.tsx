import React, { ButtonHTMLAttributes } from 'react'

export default function Button({
    className = '',
    children,
    ...other
}: { className?: string; children: React.ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={`border-[1.5px] rounded-sm px-4 py-2.5 text-[15px] ${className}`} {...other}>
            {children}
        </button>
    )
}
