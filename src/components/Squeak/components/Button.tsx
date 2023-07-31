import { child, container } from 'components/CallToAction'
import React, { ButtonHTMLAttributes } from 'react'

export default function Button({
    className = '',
    children,
    width,
    buttonType,
    size,
    ...other
}: {
    className?: string
    children: React.ReactNode
    buttonType?: string
    width?: string
    size?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={`${container(buttonType, size, width)} ${className}`} {...other}>
            <span className={`${child(buttonType, width, undefined, size)}`}>{children}</span>
        </button>
    )
}
