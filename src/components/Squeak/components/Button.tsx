import { child, container } from 'components/CallToAction'
import Spinner from 'components/Spinner'
import React, { ButtonHTMLAttributes } from 'react'

export default function Button({
    className = '',
    children,
    width,
    buttonType,
    size,
    loading,
    ...other
}: {
    className?: string
    children: React.ReactNode
    buttonType?: string
    width?: string
    size?: string
    loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={`${container(buttonType, size, width)} ${className}`} {...other}>
            <span className={`${child(buttonType, width, undefined, size)}`}>
                {loading ? <Spinner className="mx-auto text-white !w-6 !h-6" /> : children}
            </span>
        </button>
    )
}
