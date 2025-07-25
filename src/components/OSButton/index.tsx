import React from 'react'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import Link from 'components/Link'
import ZoomHover from 'components/ZoomHover'
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
    iconClassName?: string
    tooltip?: string
    label?: string
    className?: string
    active?: boolean
    disabled?: boolean
    align?: 'left' | 'center'
    width?: 'auto' | 'full'
    asLink?: boolean
    external?: boolean
    to?: string
    iconPosition?: 'left' | 'right'
    onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void
    state?: any
    zoomHover?: boolean | 'xs' | 'sm' | 'md' | 'lg'
}

export default function OSButton({
    children,
    variant = 'default',
    size = 'md',
    icon,
    iconClassName,
    tooltip,
    label,
    className = '',
    active = false,
    disabled = false,
    align = 'center',
    width = 'auto',
    asLink = false,
    external = false,
    to,
    iconPosition = 'left',
    onClick,
    state = {},
    zoomHover,
    ...props
}: OSButtonProps) {
    const baseClasses =
        'relative inline-flex items-center rounded border text-primary transition-colors transition-[font-size,line-height,padding] transition-50 hover:transition-none disabled:text-muted disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:text-muted disabled:hover:border-transparent'

    const parentSizeClasses = {
        xs: 'border-px top-[1px] rounded-[5px]',
        sm: 'border-[1.5px] top-[3px] rounded-[5px]',
        md: 'border-[1.5px] top-[3px] rounded-[6px]',
        lg: 'border-[1.5px] top-[2px] rounded-[6px]',
        xl: 'border-[1.5px] top-[2px] rounded-[6px]',
    }

    const childSizeClasses = {
        xs: 'px-1 py-1 text-xs gap-1 rounded-[5px] translate-y-[-1px] hover:translate-y-[-2px] active:-translate-y-px border-[1.5px] -mx-px group-disabled:hover:!translate-y-[-2px]',
        sm: 'px-1.5 py-1 text-[13px] gap-1 rounded-[5px] translate-y-[-2px] hover:translate-y-[-3px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-3px]',
        md: 'px-1.5 py-1 gap-1 rounded-[6px] text-sm translate-y-[-2px] hover:translate-y-[-3px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px]',
        lg: 'px-6 py-3 text-base gap-1.5 rounded-[6px] translate-y-[-2px] hover:translate-y-[-4px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px]',
        xl: 'px-2.5 py-1 @md:px-3 @md:py-1.5 @md:text-[15px] @lg:px-4 @lg:py-2 text-base gap-2 rounded-[6px] translate-y-[-2px] hover:translate-y-[-4px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px]',
    }

    const iconSizeClasses = {
        xs: 'size-3',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
        xl: 'size-8',
    }

    const variantClasses = {
        default: 'bg-black border-black text-white hover:bg-black/90 active:bg-black/80',
        primary: {
            parent: 'bg-button-shadow dark:bg-button-shadow-dark w-auto text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed',
            child: 'flex items-center justify-center w-auto bg-orange text-black hover:text-black dark:text-black dark:hover:text-black no-underline border-button dark:border-button-dark dark:bg-orange font-bold block active:transition-all active:duration-100 select-none',
        },
        secondary: {
            parent: 'bg-orange dark:bg-button-secondary-shadow-dark dark:border-button-secondary-dark w-auto text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed',
            child: 'flex items-center justify-center w-auto bg-white text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark no-underline border-button dark:border-orange dark:bg-dark font-bold block active:transition-all active:duration-100 select-none',
        },
        underline: 'hover:underline border-transparent',
        ghost: `bg-transparent border-transparent skin-classic:border-b-3 rounded ${
            active
                ? 'font-bold skin-modern:bg-accent skin-modern:hover:border-primary skin-classic:border-primary skin-classic:bg-primary'
                : 'hover:bg-accent hover:skin-classic:bg-primary skin-classic:hover:border-primary skin-classic:border-transparent'
        } active:bg-accent-2/80 focus:border-primary`,
    }

    const buttonContent = (
        <>
            {variant === 'primary' || variant === 'secondary' ? (
                <span className={`${variantClasses[variant].child} ${childSizeClasses[size]}`}>
                    {icon && iconPosition === 'left' && (
                        <span className={`${iconSizeClasses[size]} ${iconClassName}`}>{icon}</span>
                    )}
                    {children}
                    {label && <span className="text-sm opacity-75">{label}</span>}
                    {icon && iconPosition === 'right' && (
                        <span className={`${iconSizeClasses[size]} ${iconClassName}`}>{icon}</span>
                    )}
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
                    {icon && iconPosition === 'left' && (
                        <span className={`${iconSizeClasses[size]} ${iconClassName}`}>{icon}</span>
                    )}
                    {children}
                    {label && <span className="text-sm opacity-75">{label}</span>}
                    {icon && iconPosition === 'right' && (
                        <span className={`${iconSizeClasses[size]} ${iconClassName}`}>{icon}</span>
                    )}
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
        className: `${baseClasses} ${parentSizeClasses[size]} ${
            variant === 'primary' || variant === 'secondary'
                ? variantClasses[variant].parent
                : `${childSizeClasses[size]} ${variantClasses[variant]}`
        } ${align === 'center' ? 'justify-center' : 'justify-start text-left'} ${
            !children ? '' : width === 'full' ? 'w-full' : 'w-auto'
        } ${asLink ? '!no-underline' : ''} ${className}`,
        onClick,
        disabled,
        state,
        ...props,
    }

    return asLink ? (
        zoomHover ? (
            <ZoomHover size={zoomHover === true ? undefined : zoomHover}>
                <Link to={to || ''} {...commonProps} {...(external ? { externalNoIcon: true } : {})}>
                    {buttonContent}
                </Link>
            </ZoomHover>
        ) : (
            <Link to={to || ''} {...commonProps} {...(external ? { externalNoIcon: true } : {})}>
                {buttonContent}
            </Link>
        )
    ) : zoomHover ? (
        <ZoomHover size={zoomHover === true ? undefined : zoomHover} width={width}>
            <button {...commonProps}>{buttonContent}</button>
        </ZoomHover>
    ) : (
        <button {...commonProps}>{buttonContent}</button>
    )
}
