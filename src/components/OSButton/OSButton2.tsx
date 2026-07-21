import React from 'react'
import Link from 'components/Link'
import ZoomHover from 'components/ZoomHover'

interface OSButton2Props {
    children: React.ReactNode
    to: string
    state?: Record<string, unknown>
    width?: 'full' | 'auto'
    className?: string
}

export default function OSButton2({ children, to, state, width = 'full', className = '' }: OSButton2Props) {
    const isFullWidth = width === 'full'
    return (
        <ZoomHover width={isFullWidth ? 'full' : undefined}>
            <Link
                to={to}
                state={state}
                className={`${
                    isFullWidth ? 'flex' : 'inline-flex'
                } items-center justify-center gap-1.5 px-2 py-2 rounded border border-b-[3px] border-input hover:border-primary bg-primary text-primary text-sm font-semibold !no-underline outline-offset-4 ${className}`}
            >
                {children}
            </Link>
        </ZoomHover>
    )
}
