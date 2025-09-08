import React from 'react'
import { IconInfo } from '@posthog/icons'

interface TextareaProps {
    label: string
    direction?: 'row' | 'column'
    size?: 'sm' | 'md' | 'lg'
    width?: 'full' | 'auto' | 'fit'
    touched?: boolean
    error?: string
    description?: string
    tooltip?: string
    showLabel?: boolean
    labelWidth?: string
    required?: boolean
    rows?: number
    [key: string]: any
}

const Textarea = ({
    label,
    direction = 'row',
    size = 'md',
    width = 'full',
    touched = false,
    error,
    description,
    tooltip,
    showLabel = true,
    labelWidth,
    required = false,
    rows = 4,
    ...props
}: TextareaProps) => {
    const sizeClasses = {
        sm: 'px-1.5 py-1 text-sm',
        md: 'px-2.5 py-2 text-[15px]',
        lg: 'px-3 py-2.5 text-base',
    }

    const labelSizeClasses = {
        sm: 'text-sm',
        md: 'text-[15px]',
        lg: 'text-base',
    }

    const widthClasses = {
        full: 'w-full',
        auto: 'w-auto',
        fit: 'w-fit',
    }

    const textareaId = props.id || props.name || label?.toLowerCase().replace(/\s+/g, '-')

    return (
        <div className={`flex ${direction === 'column' ? 'flex-col space-y-1' : 'items-start space-x-2'}`}>
            {showLabel && (
                <div className={`${direction === 'column' ? 'w-full' : labelWidth || 'w-[90px]'} pt-2`}>
                    <label htmlFor={textareaId} className={`font-medium ${labelSizeClasses[size]}`}>
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
            )}
            <div className={`${direction === 'column' ? 'w-full' : 'flex-1'}`}>
                <textarea
                    className={`bg-primary border border-primary rounded ring-0 focus:ring-1 resize-y ${
                        touched && error ? 'border-red dark:border-yellow' : 'border-primary'
                    } ${sizeClasses[size]} ${widthClasses[width]}`}
                    id={textareaId}
                    placeholder={props.placeholder || label}
                    rows={rows}
                    {...props}
                />
                {touched && error && <p className="text-sm text-red dark:text-yellow m-0 mt-1">{error}</p>}
            </div>
        </div>
    )
}

export default Textarea
