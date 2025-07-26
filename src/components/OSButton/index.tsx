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
    variant?: 'default' | 'primary' | 'secondary' | 'underline' | 'underlineOnHover'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    icon?: React.ReactNode
    iconClassName?: string
    tooltip?: string
    label?: string
    chip?: string
    chipColor?: string
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
    hover?: 'border' | 'background'
}

export default function OSButton({
    children,
    variant = 'default',
    size = 'lg',
    icon,
    iconClassName,
    tooltip,
    label,
    chip,
    chipColor,
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
    hover = 'border',
    ...props
}: OSButtonProps) {
    const baseClasses =
        'relative items-center rounded border text-primary transition-colors font-medium transition-[font-size,line-height,padding] transition-50 hover:transition-none disabled:text-muted disabled:cursor-not-allowed'

    const parentSizeClasses = {
        xs: 'border-px top-[1px] rounded-[5px]',
        sm: 'border-[1.5px] top-[3px] rounded-[5px]',
        md: 'border-[1.5px] top-[3px] rounded-[6px]',
        lg: 'border-[1.5px] top-[2px] rounded-[6px]',
        xl: 'border-[1.5px] top-[2px] rounded-[6px]',
    }

    const childSizeClasses = {
        xs: 'px-1.5 py-0.5 text-[11px] gap-0.5 rounded-[5px] translate-y-[-1px] hover:translate-y-[-2px] active:-translate-y-px border-[1.5px] -mx-px group-disabled:hover:!translate-y-[-1px]',
        sm: 'px-2 py-0.5 text-xs gap-1 rounded-[5px] translate-y-[-2px] hover:translate-y-[-3px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px]',
        md: 'px-2.5 py-1 gap-1 rounded-[6px] text-[13px] translate-y-[-2px] hover:translate-y-[-3px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px]',
        lg: 'px-3 py-1.5 text-[15px] gap-1 rounded-[6px] translate-y-[-2px] hover:translate-y-[-4px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px]',
        xl: 'px-4 py-2 text-base gap-1.5 rounded-[6px] translate-y-[-2px] hover:translate-y-[-4px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px]',
    }

    // Extra adjustments for full-width primary/secondary buttons
    const fullWidthChildClasses = {
        xs: 'w-[calc(100%+2px)]',
        sm: 'w-[calc(100%+3px)]',
        md: 'w-[calc(100%+3px)]',
        lg: 'w-[calc(100%+3px)]',
        xl: 'w-[calc(100%+3px)]',
    }

    // Size classes for non-primary/secondary buttons (without the translate effects and negative margins)
    const simpleSizeClasses = {
        xs: 'px-1 py-0.5 text-xs gap-0.5 rounded-[5px]',
        sm: 'px-1 py-0.5 text-[13px] gap-1 rounded-[5px]',
        md: 'px-1.5 py-1 gap-1 rounded-[6px] text-sm',
        lg: 'px-2 py-1.5 text-[15px] gap-1 rounded-[6px]',
        xl: 'px-2.5 py-2 text-base gap-1.5 rounded-[6px]',
    }

    const iconSizeClasses = {
        xs: 'size-3.5',
        sm: 'size-4',
        md: 'size-4',
        lg: 'size-5',
        xl: 'size-6',
    }

    // Label and chip sizes relative to button text
    const labelSizeClasses = {
        xs: 'text-[10px]',
        sm: 'text-[11px]',
        md: 'text-xs',
        lg: 'text-sm',
        xl: 'text-[15px]',
    }

    const variantClasses = {
        default: `bg-transparent border-transparent skin-classic:border-b-3 rounded ${
            active
                ? 'font-bold skin-modern:bg-accent/50 dark:skin-modern:bg-accent skin-modern:hover:border-primary skin-classic:border-primary skin-classic:bg-primary'
                : hover === 'border'
                ? 'hover:border-primary skin-classic:hover:border-primary skin-classic:border-transparent disabled:hover:bg-transparent disabled:hover:border-transparent'
                : 'hover:bg-accent dark:hover:bg-accent disabled:hover:bg-transparent disabled:hover:border-transparent'
        } ${
            hover === 'border'
                ? 'active:bg-accent/50 dark:active:bg-accent/50'
                : 'active:bg-accent dark:active:bg-accent'
        } active:border-primary focus:border-primary`,
        primary: {
            parent: 'bg-button-shadow dark:bg-button-shadow-dark text-primary border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed inline-block',
            child: 'flex items-center justify-center bg-orange text-black hover:text-black dark:text-black dark:hover:text-black no-underline border-button dark:border-button-dark dark:bg-orange font-bold active:transition-all active:duration-100 select-none',
        },
        secondary: {
            parent: 'bg-orange dark:bg-button-secondary-shadow-dark dark:border-button-secondary-dark text-primary border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed inline-block',
            child: 'flex items-center justify-center bg-white text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark no-underline border-button dark:border-orange dark:bg-dark font-bold active:transition-all active:duration-100 select-none',
        },
        underline: 'underline border-transparent hover:no-underline disabled:hover:underline !p-0',
        underlineOnHover: 'hover:underline border-transparent disabled:hover:no-underline !p-0',
    }

    const buttonContent = (
        <>
            {variant === 'primary' || variant === 'secondary' ? (
                <span
                    className={`${variantClasses[variant].child} ${childSizeClasses[size]} ${
                        width === 'full' ? fullWidthChildClasses[size] : ''
                    }`}
                >
                    {icon && iconPosition === 'left' && (
                        <span className={`${iconSizeClasses[size]} ${iconClassName}`}>{icon}</span>
                    )}
                    {children}
                    {label && <span className={`${labelSizeClasses[size]} text-secondary`}>{label}</span>}
                    {chip && (
                        <span
                            className={`${labelSizeClasses[size]} border px-0.5 rounded-sm ${
                                chipColor ? `text-${chipColor} border-${chipColor}` : 'text-primary border-primary'
                            }`}
                        >
                            {chip}
                        </span>
                    )}
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
                    {label && <span className={`${labelSizeClasses[size]} text-secondary`}>{label}</span>}
                    {chip && (
                        <span
                            className={`${labelSizeClasses[size]} border px-0.5 rounded-sm ${
                                chipColor ? `text-${chipColor} border-${chipColor}` : 'text-primary border-primary'
                            }`}
                        >
                            {chip}
                        </span>
                    )}
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
        className: `${baseClasses} ${width === 'full' ? 'flex' : 'inline-flex'} ${
            variant === 'primary' || variant === 'secondary'
                ? `${parentSizeClasses[size]} ${variantClasses[variant].parent}`
                : `${simpleSizeClasses[size]} ${variantClasses[variant]} ${
                      disabled ? 'disabled:hover:bg-transparent' : ''
                  }`
        } ${align === 'center' ? 'justify-center' : 'justify-start text-left'} ${
            !children ? '' : width === 'full' ? 'w-full' : 'w-auto'
        } ${width === 'full' && (variant === 'primary' || variant === 'secondary') ? '!block' : ''} ${
            asLink ? '!no-underline' : ''
        } ${className}`,
        onClick,
        disabled,
        state,
        ...props,
    }

    // Apply ZoomHover to default variant automatically
    const shouldApplyZoomHover = zoomHover || (variant === 'default' && !disabled)
    const zoomHoverSize = typeof zoomHover === 'string' ? zoomHover : undefined

    return asLink ? (
        shouldApplyZoomHover ? (
            <ZoomHover size={zoomHoverSize} width={width} display={width === 'full' ? 'block' : undefined}>
                <Link to={to || ''} {...commonProps} {...(external ? { externalNoIcon: true } : {})}>
                    {buttonContent}
                </Link>
            </ZoomHover>
        ) : (
            <Link to={to || ''} {...commonProps} {...(external ? { externalNoIcon: true } : {})}>
                {buttonContent}
            </Link>
        )
    ) : shouldApplyZoomHover ? (
        <ZoomHover size={zoomHoverSize} width={width} display={width === 'full' ? 'block' : undefined}>
            <button {...commonProps}>{buttonContent}</button>
        </ZoomHover>
    ) : (
        <button {...commonProps}>{buttonContent}</button>
    )
}
