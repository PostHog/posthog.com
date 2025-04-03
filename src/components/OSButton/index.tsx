import React from 'react'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'

// Basic usage
// <OSButton>Click me</OSButton>

// With icon and tooltip
// <OSButton
//   icon={<IconUser />}
//   tooltip="User information"
// >
//   Profile
// </OSButton>

// With label and different size
// <OSButton
//   size="lg"
//   label="New"
//   variant="primary"
// >
//   Create
// </OSButton>

// Ghost variant
// <OSButton variant="ghost">
//   Cancel
// </OSButton>

interface OSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
    variant?: 'default' | 'primary' | 'ghost'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    icon?: React.ReactNode
    tooltip?: string
    label?: string
    className?: string
    active?: boolean
    align?: 'left' | 'center'
    width?: 'auto' | 'full'
}

export default function OSButton({
    children,
    variant = 'default',
    size = 'md',
    icon,
    tooltip,
    label,
    className = '',
    active = false,
    align = 'center',
    width = 'auto',
    ...props
}: OSButtonProps) {
    const baseClasses = 'inline-flex items-center rounded transition-colors transition-50 hover:transition-none border'

    const sizeClasses = {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-1.5 text-[13px]',
        md: 'px-1.5 py-1 text-sm',
        lg: 'px-6 py-3 text-base',
    }

    const iconSizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    }

    const variantClasses = {
        default: 'bg-black border-black text-white hover:bg-black/90 active:bg-black/80',
        primary:
            'bg-accent border-accent dark:border-accent-dark text-primary hover:bg-accent-dark active:bg-accent/80 dark:bg-accent-dark dark:hover:bg-accent dark:active:bg-accent-dark/80',
        ghost: `bg-transparent border-transparent ${
            active
                ? '!bg-accent-2 dark:!bg-accent-dark hover:border-light dark:hover:border-dark'
                : 'hover:bg-accent-2 dark:hover:bg-accent-dark'
        } active:bg-accent-2/80 dark:active:bg-accent-dark/80 focus:border-light dark:focus:border-dark`,
    }

    const buttonContent = (
        <>
            {icon && <span className={`${iconSizeClasses[size]}`}>{icon}</span>}
            {children}
            {label && <span className="text-sm opacity-75">{label}</span>}
            {tooltip && (
                <span className="">
                    <Tooltip content={tooltip}>
                        <IconInfo className={`${iconSizeClasses[size]} opacity-50 hover:opacity-100`} />
                    </Tooltip>
                </span>
            )}
        </>
    )

    return (
        <button
            className={`flex gap-1 items-center ${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
                align === 'center' ? 'justify-center' : 'justify-start'
            } ${width === 'full' ? 'w-full' : 'w-auto'} ${className}`}
            {...props}
        >
            {buttonContent}
        </button>
    )
}
