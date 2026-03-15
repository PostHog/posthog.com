import React from 'react'
import { IconSidebarOpen, IconSidebarClose } from '@posthog/icons'

interface CodeHeaderProps {
    sidebarOpen: boolean
    onToggleSidebar: () => void
    title?: string
}

export default function CodeHeader({ sidebarOpen, onToggleSidebar, title }: CodeHeaderProps) {
    return (
        <div className="flex items-center border-b border-input" style={{ height: '36px', minHeight: '36px' }}>
            <div
                className="flex items-center justify-between px-2 pr-3 h-full border-r border-input shrink-0 bg-accent"
                style={{ width: sidebarOpen ? '260px' : '48px' }}
            >
                {sidebarOpen && (
                    <span className="text-sm font-code text-muted font-medium select-none">PostHog Code</span>
                )}
                <button
                    onClick={onToggleSidebar}
                    className="text-muted hover:text-primary transition-colors p-0.5"
                    aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                >
                    {sidebarOpen ? <IconSidebarClose className="size-4" /> : <IconSidebarOpen className="size-4" />}
                </button>
            </div>
            <div className="flex-1 flex items-center px-3 h-full overflow-hidden">
                {title && <span className="text-sm font-code text-secondary font-medium truncate">{title}</span>}
            </div>
        </div>
    )
}
