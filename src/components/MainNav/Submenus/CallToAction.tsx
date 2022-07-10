import React from 'react'
import { CallToAction as CTA } from 'components/CallToAction'

export default function CallToAction({
    children,
    to,
    className = '',
}: {
    children: React.ReactNode
    to: string
    className: string
}) {
    return (
        <CTA
            to={to}
            type="outline"
            size="sm"
            className={`!bg-transparent hover:border-orange hover:border-opacity-100 !transition-all ${className}`}
        >
            {children}
        </CTA>
    )
}
