import React from 'react'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'

interface InputProps {
    label: string
    type?: string
    direction?: 'row' | 'column'
    size?: 'sm' | 'md' | 'lg'
    width?: 'full' | 'auto' | 'fit'
    touched?: boolean
    error?: string
    description?: string
    tooltip?: string | React.ReactNode
    showLabel?: boolean
    labelWidth?: string
    required?: boolean
    dataScheme?: 'primary' | 'secondary' | 'tertiary'
    [key: string]: any
}

const Input = ({
    label,
    type = 'text',
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
    dataScheme,
    ...props
}: InputProps) => {
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

    const inputId = props.id || props.name || label?.toLowerCase().replace(/\s+/g, '-')

    return (
        <div
            className={`flex ${direction === 'column' ? 'flex-col space-y-1' : 'items-center space-x-2'}`}
            {...(dataScheme && { 'data-scheme': dataScheme })}
        >
            {showLabel && (
                <div className={`${direction === 'column' ? 'w-full' : labelWidth || 'w-[90px]'}`}>
                    <label htmlFor={inputId} className={`${labelSizeClasses[size]}`}>
                        <span>
                            {label}
                            {required && <span className="text-red dark:text-yellow ml-0.5">*</span>}
                        </span>
                        {tooltip && (
                            <span>
                                <Tooltip
                                    trigger={
                                        <IconInfo className="ml-1 relative -top-px inline-block size-4 text-secondary hover:text-primary" />
                                    }
                                    delay={0}
                                    sideOffset={-3}
                                >
                                    {tooltip}
                                </Tooltip>
                            </span>
                        )}
                    </label>
                    {description && <p className="text-sm text-secondary m-0 mt-0.5">{description}</p>}
                </div>
            )}
            <div className={`${direction === 'column' ? 'w-full' : 'flex-1'}`}>
                <input
                    className={`bg-primary border border-primary rounded ring-0 focus:ring-1 ${
                        touched && error ? 'border-red dark:border-yellow' : 'border-primary'
                    } ${sizeClasses[size]} ${widthClasses[width]}`}
                    type={type}
                    id={inputId}
                    placeholder={props.placeholder || label}
                    {...props}
                />
                {touched && error && <p className="text-sm text-red dark:text-yellow m-0 mt-1">{error}</p>}
            </div>
        </div>
    )
}

export default Input
