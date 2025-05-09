import React from 'react'

interface WizardProps {
    // template: 'generic' | 'product' | 'feature'
    children?: React.ReactNode
    leftNavigation?: React.ReactNode
    rightNavigation?: React.ReactNode
}

export default function Wizard({ children, leftNavigation, rightNavigation }: WizardProps) {
    return (
        <div data-scheme="primary" className="w-full h-full bg-primary flex flex-col">
            {children}
            <div className="w-full flex justify-between px-3 py-2 bg-accent gap-2">
                <span>{leftNavigation}</span>
                <span>{rightNavigation}</span>
            </div>
        </div>
    )
}
