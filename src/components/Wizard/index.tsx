import React from 'react'

interface WizardProps {
    // template: 'generic' | 'product' | 'feature'
    children?: React.ReactNode
    navigationPosition?: 'top' | 'bottom'
    leftNavigation?: React.ReactNode
    rightNavigation?: React.ReactNode
}

export default function Wizard({
    children,
    leftNavigation,
    rightNavigation,
    navigationPosition = 'bottom',
}: WizardProps) {
    return (
        <div data-scheme="primary" className="w-full h-full bg-primary flex flex-col text-primary">
            {navigationPosition === 'top' && (
                <div className="border-b border-primary w-full flex items-center justify-between px-3 py-2 bg-accent gap-2">
                    <span>{leftNavigation}</span>
                    <span>{rightNavigation}</span>
                </div>
            )}
            {children}
            {(leftNavigation || rightNavigation) && navigationPosition === 'bottom' && (
                <div className="border-t border-primary w-full flex items-center justify-between px-3 py-2 bg-accent gap-2">
                    <span>{leftNavigation}</span>
                    <span>{rightNavigation}</span>
                </div>
            )}
        </div>
    )
}
