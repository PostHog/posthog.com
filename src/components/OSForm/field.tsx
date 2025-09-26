import React from 'react'
import { IconInfo } from '@posthog/icons'

interface FieldProps {
    label: string
    direction?: 'row' | 'column'
    size?: 'sm' | 'md' | 'lg'
    description?: string
    tooltip?: string
    required?: boolean
    children: React.ReactNode
    error?: string
    touched?: boolean
}

const Field = ({
    label,
    direction = 'row',
    size = 'md',
    description,
    tooltip,
    required = false,
    children,
    error,
    touched = false,
}: FieldProps) => {
    const labelSizeClasses = {
        sm: 'text-sm',
        md: 'text-[15px]',
        lg: 'text-base',
    }

    return (
        <div className={`flex ${direction === 'column' ? 'flex-col space-y-1' : 'items-center space-x-2'}`}>
            <div className={`${direction === 'column' ? 'w-full' : 'w-[90px]'}`}>
                <label className={`${labelSizeClasses[size]}`}>
                    <span>
                        {label}
                        {required && <span className="text-red dark:text-yellow ml-0.5">*</span>}
                    </span>
                    {tooltip && (
                        <span className="group relative inline-flex ml-1">
                            <IconInfo className="w-3.5 h-3.5 opacity-60 hover:opacity-100 cursor-help" />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-primary shadow-lg">
                                {tooltip}
                            </span>
                        </span>
                    )}
                </label>
                {description && <p className="text-sm text-secondary m-0 mt-0.5">{description}</p>}
            </div>
            <div className={`${direction === 'column' ? 'w-full' : 'flex-1'}`}>
                {children}
                {touched && error && <p className="text-sm text-red dark:text-yellow m-0 mt-1">{error}</p>}
            </div>
        </div>
    )
}

export default Field
