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
    children: React.ReactNode
    variant?: 'default' | 'primary' | 'ghost'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    icon?: React.ReactNode
    tooltip?: string
    label?: string
    className?: string
    active?: boolean
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
    ...props
}: OSButtonProps) {
    const baseClasses = 'inline-flex items-center justify-center rounded transition-colors'

    const sizeClasses = {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    }

    const variantClasses = {
        default: 'bg-black text-white hover:bg-black/90 active:bg-black/80',
        primary:
            'bg-accent text-primary hover:bg-accent-dark active:bg-accent/80 dark:bg-accent-dark dark:hover:bg-accent dark:active:bg-accent-dark/80',
        ghost: `bg-transparent ${
            active ? '!bg-accent dark:!bg-accent-dark' : 'hover:bg-accent dark:hover:bg-accent-dark'
        } active:bg-accent/80 dark:active:bg-accent-dark/80`,
    }

    const buttonContent = (
        <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
            {label && <span className="ml-2 text-sm opacity-75">{label}</span>}
            {tooltip && (
                <span className="ml-2">
                    <Tooltip content={tooltip}>
                        <IconInfo className="w-4 h-4 opacity-50 hover:opacity-100" />
                    </Tooltip>
                </span>
            )}
        </>
    )

    return (
        <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
            {buttonContent}
        </button>
    )
}
