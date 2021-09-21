import React, { MouseEventHandler } from 'react'
import cntl from 'cntl'
import { CallToAction } from 'components/CallToAction'

const chip = (className = '') => cntl`
    select-none
    transition-colors
    flex
    space-x-1
    items-center
    ${className}
`

interface ChipProps {
    onClick?: MouseEventHandler
    text?: string | React.ReactNode
    children?: React.ReactNode
    active?: boolean
    href?: string
    icon?: string
    className?: string
}

export default function Chip({ onClick, text, children, active, href, icon, className = '' }: ChipProps): JSX.Element {
    return (
        <CallToAction onClick={onClick} href={href} type={active ? 'primary' : 'custom'} className={chip(className)}>
            {icon && (
                <svg className="w-5 h-5">
                    <use xlinkHref={`#${icon}`}></use>
                </svg>
            )}
            <span>{text || children}</span>
        </CallToAction>
    )
}
