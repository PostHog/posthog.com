import cntl from 'cntl'
import { CallToAction } from 'components/CallToAction/index.js' // TEMP fix because of duplicate files
import React from 'react'

const chip = (className = '') => cntl`
    select-none
    transition-colors
    flex
    space-x-1
    items-center
    ${className}
`

export default function Chip({ onClick, text, children, active, href, size = 'sm', icon = null, className = '' }) {
    return (
        <CallToAction
            size={size}
            onClick={onClick}
            href={href}
            type={active ? 'primary' : 'outline'}
            className={chip(className)}
        >
            {icon}
            <span>{text || children}</span>
        </CallToAction>
    )
}
