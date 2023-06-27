import { child, container } from 'components/CallToAction'
import React, { ButtonHTMLAttributes } from 'react'

export default function Button({
    className = '',
    children,
    width,
    buttonType,
    ...other
}: {
    className?: string
    children: React.ReactNode
    buttonType?: string
    width?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={`${container(buttonType, undefined, width)} ${className}`} {...other}>
            <span className={`${child(buttonType, width)}`}>{children}</span>
        </button>
    )
}
