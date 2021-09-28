import React from 'react'
import cntl from 'cntl'
import { CallToAction } from 'components/CallToAction/index.js' // TEMP fix because of duplicate files

const chip = (className = '') => cntl`
    select-none
    transition-colors
    flex
    space-x-1
    items-center
    ${className}
`

export default function Chip({ onClick, text, children, active, href, size = 'sm', icon, className = '' }) {
    return (
        <CallToAction
            size={size}
            onClick={onClick}
            href={href}
            type={active ? 'primary' : 'outline'}
            className={chip(className)}
        >
            {icon && (
                <svg className="w-5 h-5">
                    <use xlinkHref={`#${icon}`}></use>
                </svg>
            )}
            <span>{text || children}</span>
        </CallToAction>
    )
}
