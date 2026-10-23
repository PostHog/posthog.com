import React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cn } from '../../../utils'
import Link from '../../Link'
import type { Props as LinkProps } from '../../Link'
import { focusRing, toneSolid } from '../styles'
import { mergeClassName } from '../utils'
import { Spinner } from '../Spinner'

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonIconPosition = 'start' | 'end'

type RaisedVariant = Exclude<ButtonVariant, 'default'>

type ButtonAppearance = {
    variant?: ButtonVariant
    size?: ButtonSize
}

export type ButtonProps = BaseButton.Props &
    ButtonAppearance & {
        icon?: React.ReactNode
        iconPosition?: ButtonIconPosition
        iconEnd?: React.ReactNode
        loading?: boolean
    }

export type IconButtonProps = Omit<BaseButton.Props, 'children'> &
    ButtonAppearance & {
        icon: React.ReactNode
        loading?: boolean
        'aria-label': string
    }

export type ButtonLinkProps = Pick<LinkProps, 'to' | 'state' | 'event' | 'contextMenu' | 'onClick'> &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href' | 'onClick'> &
    ButtonAppearance & {
        icon?: React.ReactNode
        iconPosition?: ButtonIconPosition
        iconEnd?: React.ReactNode
        external?: boolean
        className?: string
        children?: React.ReactNode
    }

export type ButtonGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> &
    ButtonAppearance & {
        className?: string
        disabled?: boolean
        children?: React.ReactNode
    }

const ButtonGroupContext = React.createContext<(Required<ButtonAppearance> & { disabled: boolean }) | null>(null)

const iconSizes: Record<ButtonSize, string> = { sm: 'size-3.5', md: 'size-4', lg: 'size-5' }

const busyCursor = '[&[data-disabled][aria-busy=true]]:cursor-progress'

const disabledFade = '[&[data-disabled]:not([aria-busy=true]):not([data-group-disabled])]:opacity-50'

const flatBase = `relative inline-flex items-center justify-center rounded border border-transparent bg-transparent text-primary transition-colors duration-150 ease-out hover:border-primary [&:not([data-disabled]):active]:border-primary [&:not([data-disabled]):active]:bg-[rgb(var(--text-primary)/0.1)] data-[pressed]:border-primary data-[pressed]:bg-[rgb(var(--text-primary)/0.1)] data-[popup-open]:border-primary data-[popup-open]:bg-[rgb(var(--text-primary)/0.1)] data-[disabled]:cursor-not-allowed [&[data-disabled]:not([aria-busy=true]):not([data-group-disabled])]:text-muted data-[disabled]:hover:border-transparent motion-reduce:transition-none skin-classic:border-b-3 ${busyCursor} ${focusRing}`

const flatPadding: Record<ButtonSize, string> = {
    sm: 'gap-1 px-2 py-1 text-xs leading-4',
    md: 'gap-1 px-2.5 py-1.5 text-[13px] leading-[22px]',
    lg: 'gap-1 rounded-[6px] px-3 py-2 text-[15px] leading-[26px]',
}

const flatSquarePadding: Record<ButtonSize, string> = { sm: 'p-[5px]', md: 'p-[9px]', lg: 'p-[11px]' }

const flatSegment =
    'rounded-none border-0 hover:bg-[rgb(var(--text-primary)/0.07)] data-[disabled]:hover:bg-transparent focus-visible:-outline-offset-2 skin-classic:border-b-0'

const flatSegmentPadding: Record<ButtonSize, string> = { sm: 'px-2', md: 'px-2.5', lg: 'px-3' }

const flatGroup =
    'inline-flex [&>[data-segment]~[data-segment]]:border-l [&>[data-segment]~[data-segment]]:border-primary data-[disabled]:opacity-50 overflow-hidden rounded border border-primary'

const raisedUnderside =
    "before:absolute before:inset-x-0 before:bottom-0 before:top-1/2 before:border-t-0 before:content-['']"

const raisedUndersideWidth: Record<ButtonSize, string> = {
    sm: 'p-px before:border',
    md: 'p-[1.5px] before:border-[1.5px]',
    lg: 'p-[1.5px] before:border-[1.5px]',
}

const raisedFrameBase = `relative inline-block text-center ${raisedUnderside} data-[disabled]:cursor-not-allowed ${disabledFade} ${busyCursor} ${focusRing}`

const raisedFrames: Record<RaisedVariant, string> = {
    danger: 'before:border-[color:color-mix(in_srgb,color-mix(in_srgb,theme(colors.salmon)_85%,theme(colors.red))_62%,black)] before:bg-[color:color-mix(in_srgb,color-mix(in_srgb,theme(colors.salmon)_85%,theme(colors.red))_76%,black)]',
    primary: 'before:border-button before:bg-button-shadow dark:before:bg-button-shadow-dark',
    secondary: 'before:border-gray before:bg-[rgb(var(--border))]',
}

const raisedRadius: Record<ButtonSize, string> = {
    sm: 'rounded-[4px]',
    md: 'rounded-[6px]',
    lg: 'rounded-[6px]',
}

const raisedUndersideRadius: Record<ButtonSize, string> = {
    sm: 'before:rounded-b-[4px]',
    md: 'before:rounded-b-[6px]',
    lg: 'before:rounded-b-[6px]',
}

const raisedFaceBase =
    'relative flex select-none items-center justify-center font-bold transition-[transform,background-color,border-color,color,box-shadow] duration-100 motion-reduce:transition-none'

const raisedFaces: Record<RaisedVariant, string> = {
    danger: `border-[color:color-mix(in_srgb,color-mix(in_srgb,theme(colors.salmon)_85%,theme(colors.red))_62%,black)] ${toneSolid.error} [[data-pressed]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.22),inset_0_0_0_999px_rgb(0_0_0/0.1)] [:not([data-disabled]):active>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.22),inset_0_0_0_999px_rgb(0_0_0/0.1)] [[data-popup-open]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.22),inset_0_0_0_999px_rgb(0_0_0/0.1)] dark:[[data-pressed]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.22),inset_0_0_0_999px_rgb(0_0_0/0.1)] dark:[:not([data-disabled]):active>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.22),inset_0_0_0_999px_rgb(0_0_0/0.1)] dark:[[data-popup-open]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.22),inset_0_0_0_999px_rgb(0_0_0/0.1)]`,
    primary:
        'border-button bg-orange text-black [[data-pressed]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.22),inset_0_0_0_999px_rgb(0_0_0/0.1)] [:not([data-disabled]):active>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.22),inset_0_0_0_999px_rgb(0_0_0/0.1)] [[data-popup-open]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.22),inset_0_0_0_999px_rgb(0_0_0/0.1)] dark:border-button-dark',
    secondary:
        'border-gray bg-white text-primary [[data-pressed]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.14),inset_0_0_0_999px_rgb(0_0_0/0.08)] [:not([data-disabled]):active>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.14),inset_0_0_0_999px_rgb(0_0_0/0.08)] [[data-popup-open]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.14),inset_0_0_0_999px_rgb(0_0_0/0.08)] dark:bg-dark dark:[[data-pressed]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.5),inset_0_0_0_999px_rgb(255_255_255/0.1)] dark:[:not([data-disabled]):active>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.5),inset_0_0_0_999px_rgb(255_255_255/0.1)] dark:[[data-popup-open]>&]:shadow-[inset_0_2px_3px_rgb(0_0_0/0.5),inset_0_0_0_999px_rgb(255_255_255/0.1)]',
}

const raisedFaceBorder: Record<ButtonSize, string> = {
    sm: 'border',
    md: 'border-[1.5px]',
    lg: 'border-[1.5px]',
}

const raisedFaceInset: Record<ButtonSize, string> = { sm: 'mx-[-1px]', md: 'mx-[-1.5px]', lg: 'mx-[-1.5px]' }

const raisedFaceMotion: Record<ButtonSize, string> = {
    sm: 'translate-y-[-1.5px] [:not([data-disabled]):not([data-pressed]):not([data-popup-open]):hover:not(:active)>&]:translate-y-[-2.5px] [:not([data-disabled]):active>&]:translate-y-[-0.5px] [[data-disabled]>&]:translate-y-[-1.5px] [[data-pressed]>&]:translate-y-[-0.5px] [[data-popup-open]>&]:translate-y-[-0.5px]',
    md: 'translate-y-[-2px] [:not([data-disabled]):not([data-pressed]):not([data-popup-open]):hover:not(:active)>&]:translate-y-[-3px] [:not([data-disabled]):active>&]:translate-y-[-0.5px] [[data-disabled]>&]:translate-y-[-2px] [[data-pressed]>&]:translate-y-[-0.5px] [[data-popup-open]>&]:translate-y-[-0.5px]',
    lg: 'translate-y-[-2px] [:not([data-disabled]):not([data-pressed]):not([data-popup-open]):hover:not(:active)>&]:translate-y-[-4px] [:not([data-disabled]):active>&]:translate-y-[-0.5px] [[data-disabled]>&]:translate-y-[-2px] [[data-pressed]>&]:translate-y-[-0.5px] [[data-popup-open]>&]:translate-y-[-0.5px]',
}

const raisedFacePadding: Record<ButtonSize, string> = {
    sm: 'gap-1 px-2 py-[3px] text-xs leading-4',
    md: 'gap-1 px-2.5 py-1 text-[13px] leading-[22px]',
    lg: 'gap-1 px-3 py-1.5 text-[15px] leading-[26px]',
}

const raisedFaceSquarePadding: Record<ButtonSize, string> = { sm: 'p-1', md: 'p-[7px]', lg: 'p-[9px]' }

const raisedGroupBase = `relative inline-flex data-[disabled]:opacity-50 ${raisedUnderside}`

const raisedSegment = `relative flex focus-visible:z-10 data-[disabled]:cursor-not-allowed ${busyCursor} ${focusRing}`

const raisedSegmentFace: Record<ButtonSize, string> = {
    sm: '-ml-px rounded-none [[data-segment]:not([data-segment]~[data-segment])>&]:rounded-l-[4px] [[data-segment]:not(:has(~[data-segment]))>&]:-mr-px [[data-segment]:not(:has(~[data-segment]))>&]:rounded-r-[4px]',
    md: '-ml-[1.5px] rounded-none [[data-segment]:not([data-segment]~[data-segment])>&]:rounded-l-[6px] [[data-segment]:not(:has(~[data-segment]))>&]:-mr-[1.5px] [[data-segment]:not(:has(~[data-segment]))>&]:rounded-r-[6px]',
    lg: '-ml-[1.5px] rounded-none [[data-segment]:not([data-segment]~[data-segment])>&]:rounded-l-[6px] [[data-segment]:not(:has(~[data-segment]))>&]:-mr-[1.5px] [[data-segment]:not(:has(~[data-segment]))>&]:rounded-r-[6px]',
}

type ButtonShape = Required<ButtonAppearance> & {
    square: boolean
    isSegment: boolean
}

function useButtonShape(ownVariant: ButtonVariant, ownSize: ButtonSize, square: boolean): ButtonShape {
    const group = React.useContext(ButtonGroupContext)
    return {
        variant: group?.variant ?? ownVariant,
        size: group?.size ?? ownSize,
        square,
        isSegment: group !== null,
    }
}

function frameClassName({ variant, size, square, isSegment }: ButtonShape): string {
    if (variant === 'default') {
        return cn(
            flatBase,
            square ? flatSquarePadding[size] : flatPadding[size],
            isSegment && flatSegment,
            isSegment && !square && flatSegmentPadding[size]
        )
    }
    return isSegment
        ? raisedSegment
        : cn(
              raisedFrameBase,
              raisedUndersideWidth[size],
              raisedFrames[variant],
              raisedRadius[size],
              raisedUndersideRadius[size]
          )
}

type ButtonContentProps = {
    shape: ButtonShape
    icon?: React.ReactNode
    iconPosition: ButtonIconPosition
    iconEnd?: React.ReactNode
    loading?: boolean
    children?: React.ReactNode
}

function ButtonContent({ shape, icon, iconPosition, iconEnd, loading, children }: ButtonContentProps): JSX.Element {
    const { variant, size, square, isSegment } = shape
    const iconSlot = cn('flex shrink-0 items-center justify-center [&>svg]:size-full', iconSizes[size])
    const leadingIcon = square || iconPosition === 'start' ? icon : null
    const trailingIcon = square || iconPosition === 'start' ? null : icon
    const spinnerReplacesIcon = loading && leadingIcon
    const spinnerCoversLabel = loading && !spinnerReplacesIcon

    const label = (
        <span
            className={cn(
                'flex items-center justify-center [gap:inherit]',
                spinnerCoversLabel && 'opacity-0',
                isSegment &&
                    variant !== 'default' &&
                    '[button[data-disabled]:not([aria-busy=true]):not([data-group-disabled])_&]:opacity-40'
            )}
        >
            {spinnerReplacesIcon ? (
                <Spinner size={size} />
            ) : (
                leadingIcon && (
                    <span aria-hidden className={iconSlot}>
                        {leadingIcon}
                    </span>
                )
            )}
            {children}
            {trailingIcon && (
                <span aria-hidden className={iconSlot}>
                    {trailingIcon}
                </span>
            )}
            {iconEnd && (
                <span aria-hidden className={iconSlot}>
                    {iconEnd}
                </span>
            )}
        </span>
    )

    const content = spinnerCoversLabel ? (
        <>
            {label}
            <span className="absolute inset-0 flex items-center justify-center">
                <Spinner size={size} />
            </span>
        </>
    ) : (
        label
    )

    if (variant === 'default') {
        return content
    }

    return (
        <span
            data-button-face=""
            className={cn(
                raisedFaceBase,
                raisedFaces[variant],
                raisedFaceBorder[size],
                raisedFaceMotion[size],
                square ? raisedFaceSquarePadding[size] : raisedFacePadding[size],
                isSegment ? raisedSegmentFace[size] : cn(raisedFaceInset[size], raisedRadius[size])
            )}
        >
            {content}
        </span>
    )
}

type ButtonRootProps = BaseButton.Props &
    ButtonAppearance & {
        icon?: React.ReactNode
        iconPosition?: ButtonIconPosition
        square?: boolean
        iconEnd?: React.ReactNode
        loading?: boolean
    }

const ButtonRoot = React.forwardRef<HTMLElement, ButtonRootProps>(function ButtonRoot(
    {
        variant = 'default',
        size = 'md',
        icon,
        iconPosition = 'start',
        iconEnd,
        loading,
        square = false,
        className,
        children,
        ...props
    },
    ref
) {
    const shape = useButtonShape(variant, size, square)
    const group = React.useContext(ButtonGroupContext)

    return (
        <BaseButton
            ref={ref}
            className={mergeClassName(frameClassName(shape), className)}
            {...props}
            data-segment={shape.isSegment ? '' : undefined}
            data-group-disabled={group?.disabled ? '' : undefined}
            disabled={group?.disabled || loading || props.disabled}
            focusableWhenDisabled={loading || props.focusableWhenDisabled}
            aria-busy={loading || props['aria-busy']}
        >
            <ButtonContent shape={shape} icon={icon} iconPosition={iconPosition} iconEnd={iconEnd} loading={loading}>
                {children}
            </ButtonContent>
        </BaseButton>
    )
})

export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
    return <ButtonRoot ref={ref} {...props} />
})

export const IconButton = React.forwardRef<HTMLElement, IconButtonProps>(function IconButton(props, ref) {
    return <ButtonRoot ref={ref} square {...props} />
})

export function ButtonLink({
    variant = 'default',
    size = 'md',
    icon,
    iconPosition = 'start',
    iconEnd,
    external = false,
    contextMenu,
    className,
    children,
    ...props
}: ButtonLinkProps): JSX.Element {
    const shape = useButtonShape(variant, size, false)

    return (
        <Link
            {...props}
            data-segment={shape.isSegment ? '' : undefined}
            externalNoIcon={external}
            contextMenu={contextMenu ?? !shape.isSegment}
            className={cn(frameClassName(shape), 'no-underline', className)}
        >
            <ButtonContent shape={shape} icon={icon} iconPosition={iconPosition} iconEnd={iconEnd}>
                {children}
            </ButtonContent>
        </Link>
    )
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
    { variant = 'default', size = 'md', className, disabled = false, children, ...props },
    ref
) {
    const appearance = React.useMemo(() => ({ variant, size, disabled }), [variant, size, disabled])
    return (
        <ButtonGroupContext.Provider value={appearance}>
            <div
                ref={ref}
                role="group"
                data-disabled={disabled ? '' : undefined}
                className={cn(
                    variant === 'default'
                        ? flatGroup
                        : cn(
                              raisedGroupBase,
                              raisedUndersideWidth[size],
                              raisedFrames[variant],
                              raisedRadius[size],
                              raisedUndersideRadius[size]
                          ),
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </ButtonGroupContext.Provider>
    )
})
