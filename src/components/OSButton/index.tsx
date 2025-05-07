import React from 'react'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import Link from 'components/Link'
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

interface OSButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    children?: React.ReactNode
    variant?: 'default' | 'primary' | 'secondary' | 'underline' | 'ghost'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    icon?: React.ReactNode
    tooltip?: string
    label?: string
    className?: string
    active?: boolean
    disabled?: boolean
    align?: 'left' | 'center'
    width?: 'auto' | 'full'
    asLink?: boolean
    to?: string
    iconPosition?: 'left' | 'right'
    onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void
    state?: any
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
    disabled = false,
    align = 'center',
    width = 'auto',
    asLink = false,
    to,
    iconPosition = 'left',
    onClick,
    state = {},
    ...props
}: OSButtonProps) {
    const baseClasses =
        'inline-flex items-center rounded border transition-colors transition-50 hover:transition-none transition-[font-size,line-height,padding] transition-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:text-secondary disabled:hover:border-transparent'

    const sizeClasses = {
        xs: 'px-2 py-1 text-xs gap-1',
        sm: 'px-2 py-1.5 text-[13px] gap-1',
        md: 'px-1.5 py-1 text-sm gap-1',
        lg: 'px-6 py-3 text-base gap-1.5',
        xl: 'px-2.5 py-1 text-sm @md:px-3 @md:py-1.5 @md:text-[15px] @lg:px-4 @lg:py-2 text-base gap-2',
    }

    const iconSizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
    }

    const variantClasses = {
        default: 'bg-black border-black text-white hover:bg-black/90 active:bg-black/80',
        primary: {
            parent: 'bg-button-shadow dark:bg-button-shadow-dark border-[1.5px] relative top-[2px] rounded-[6px] w-auto text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed',
            child: 'relative flex items-center justify-center w-auto bg-orange text-primary hover:text-primary dark:text-primary dark:hover:text-primary border-button dark:border-button-dark dark:bg-orange rounded-[6px] text-[14px] font-bold px-4 py-1.5 translate-y-[-2px] hover:translate-y-[-4px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px] block active:transition-all active:duration-100 select-none',
        },
        secondary: {
            parent: 'bg-orange dark:bg-button-secondary-shadow-dark dark:border-button-secondary-dark border-[1.5px] relative top-[2px] rounded-[6px] w-auto text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed',
            child: 'relative flex items-center justify-center w-auto bg-white text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark border-button dark:border-orange dark:bg-dark rounded-[6px] text-[14px] font-bold px-4 py-1.5 translate-y-[-2px] hover:translate-y-[-4px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px] block active:transition-all active:duration-100 select-none',
        },
        underline: 'hover:underline border-transparent',
        ghost: `bg-transparent border-transparent ${
            active
                ? 'font-bold !bg-accent-2 dark:!bg-accent-dark hover:border-light dark:hover:border-dark'
                : 'hover:bg-accent-2 dark:hover:bg-accent-dark'
        } active:bg-accent-2/80 dark:active:bg-accent-dark/80 focus:border-light dark:focus:border-dark`,
    }

    const buttonContent = (
        <>
            {variant === 'primary' || variant === 'secondary' ? (
                <span className={`${variantClasses[variant].child} ${sizeClasses[size]}`}>
                    {icon && iconPosition === 'left' && <span className={`${iconSizeClasses[size]}`}>{icon}</span>}
                    {children}
                    {label && <span className="text-sm opacity-75">{label}</span>}
                    {icon && iconPosition === 'right' && <span className={`${iconSizeClasses[size]}`}>{icon}</span>}
                    {tooltip && (
                        <span className="">
                            <Tooltip content={tooltip}>
                                <IconInfo className={`${iconSizeClasses[size]} opacity-50 hover:opacity-100`} />
                            </Tooltip>
                        </span>
                    )}
                </span>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className={`${iconSizeClasses[size]}`}>{icon}</span>}
                    {children}
                    {label && <span className="text-sm opacity-75">{label}</span>}
                    {icon && iconPosition === 'right' && <span className={`${iconSizeClasses[size]}`}>{icon}</span>}
                    {tooltip && (
                        <span className="">
                            <Tooltip content={tooltip}>
                                <IconInfo className={`${iconSizeClasses[size]} opacity-50 hover:opacity-100`} />
                            </Tooltip>
                        </span>
                    )}
                </>
            )}
        </>
    )

    const commonProps = {
        className: `${baseClasses} ${
            variant === 'primary' || variant === 'secondary'
                ? variantClasses[variant].parent
                : `${sizeClasses[size]} ${variantClasses[variant]}`
        } ${align === 'center' ? 'justify-center' : 'justify-start'} ${
            !children ? '' : width === 'full' ? 'w-full' : 'w-auto'
        } ${className}`,
        onClick,
        disabled,
        state,
        ...props,
    }

    return asLink ? (
        <Link to={to || ''} {...commonProps}>
            {buttonContent}
        </Link>
    ) : (
        <button {...commonProps}>{buttonContent}</button>
    )
}
