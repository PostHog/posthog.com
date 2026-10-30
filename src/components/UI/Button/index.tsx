import React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cn } from '../../../utils'
import Link from '../../Link'
import type { Props as LinkProps } from '../../Link'
import { disabledHatch, focusRing, iconSizes, toneSolid, toneText } from '../styles'
import { mergeClassName } from '../utils'
import { Spinner } from '../Spinner'
import { truncateTextChildren } from '../truncation'
import './styles.css'

export type ButtonAppearance = 'flat' | 'raised' | 'outline'
export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonIconPosition = 'start' | 'end'

type ButtonLook = {
    appearance?: ButtonAppearance
    variant?: ButtonVariant
    size?: ButtonSize
}

export type ButtonProps = BaseButton.Props &
    ButtonLook & {
        icon?: React.ReactNode
        iconPosition?: ButtonIconPosition
        iconEnd?: React.ReactNode
        loading?: boolean
    }

export type IconButtonProps = Omit<BaseButton.Props, 'children'> &
    ButtonLook & {
        icon: React.ReactNode
        loading?: boolean
        'aria-label': string
    }

export type ButtonLinkProps = Pick<LinkProps, 'to' | 'state' | 'event' | 'contextMenu' | 'onClick'> &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href' | 'onClick'> &
    ButtonLook & {
        icon?: React.ReactNode
        iconPosition?: ButtonIconPosition
        iconEnd?: React.ReactNode
        external?: boolean
        className?: string
        children?: React.ReactNode
    }

export type ButtonGroupOrientation = 'horizontal' | 'vertical'

export type ButtonGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> &
    ButtonLook & {
        className?: string
        disabled?: boolean
        orientation?: ButtonGroupOrientation
        children?: React.ReactNode
    }

const ButtonGroupContext = React.createContext<
    (Required<ButtonLook> & { disabled: boolean; orientation: ButtonGroupOrientation }) | null
>(null)

const busyCursor = '[&[data-disabled][aria-busy=true]]:cursor-progress'

const disabledFade = '[&[data-disabled]:not([aria-busy=true]):not([data-group-disabled])]:opacity-50'

const flatBase = `relative inline-flex min-w-0 max-w-full items-center justify-center rounded border border-transparent bg-transparent text-primary ui-button-flat hover:bg-[rgb(var(--text-primary)/0.06)] [&:not([data-disabled]):active]:bg-[rgb(var(--text-primary)/0.12)] data-[pressed]:bg-[rgb(var(--text-primary)/0.1)] data-[popup-open]:bg-[rgb(var(--text-primary)/0.1)] data-[disabled]:cursor-not-allowed [&[data-disabled]:not([aria-busy=true]):not([data-group-disabled])]:text-muted data-[disabled]:hover:bg-transparent ${busyCursor} ${focusRing}`

const flatPadding: Record<ButtonSize, string> = {
    sm: 'gap-1 px-2 py-1 text-xs leading-4',
    md: 'gap-1 px-2.5 py-1.5 text-[13px] leading-[22px]',
    lg: 'gap-1 rounded-[6px] px-3 py-2 text-[15px] leading-[26px]',
}

const flatTones: Record<ButtonVariant, string> = {
    secondary: '',
    primary:
        'text-red hover:bg-orange/10 [&:not([data-disabled]):active]:bg-orange/25 data-[pressed]:bg-orange/15 data-[popup-open]:bg-orange/15 dark:text-yellow',
    danger: `${toneText.error} hover:bg-salmon/10 [&:not([data-disabled]):active]:bg-salmon/25 data-[pressed]:bg-salmon/15 data-[popup-open]:bg-salmon/15`,
}

const outlineTones: Record<ButtonVariant, string> = {
    secondary:
        'border-[rgb(var(--text-primary)/0.22)] hover:border-[rgb(var(--text-primary)/0.4)] hover:bg-[rgb(var(--text-primary)/0.05)] [&:not([data-disabled]):active]:border-[rgb(var(--text-primary)/0.5)] [&:not([data-disabled]):active]:bg-[rgb(var(--text-primary)/0.12)] data-[disabled]:hover:border-[rgb(var(--text-primary)/0.22)]',
    primary:
        'border-orange text-red hover:border-orange hover:bg-orange/10 [&:not([data-disabled]):active]:border-orange [&:not([data-disabled]):active]:bg-orange/25 data-[pressed]:border-orange data-[pressed]:bg-orange/15 data-[popup-open]:border-orange data-[popup-open]:bg-orange/15 data-[disabled]:hover:border-orange dark:text-yellow',
    danger: `border-salmon/70 ${toneText.error} hover:border-salmon hover:bg-salmon/10 [&:not([data-disabled]):active]:border-salmon [&:not([data-disabled]):active]:bg-salmon/25 data-[pressed]:border-salmon data-[pressed]:bg-salmon/15 data-[popup-open]:border-salmon data-[popup-open]:bg-salmon/15 data-[disabled]:hover:border-salmon/70`,
}

const outlineDisabled = `${disabledHatch} [&[data-disabled]:not([aria-busy=true])]:border-dashed`

const flatSegmentTones: Record<ButtonVariant, string> = {
    secondary: '',
    primary: 'hover:bg-orange/10',
    danger: 'hover:bg-salmon/10',
}

const flatGroupTones: Record<ButtonVariant, string> = {
    secondary: '',
    primary: 'border-orange [&>[data-segment]~[data-segment]]:border-orange',
    danger: 'border-salmon/70 [&>[data-segment]~[data-segment]]:border-salmon/70',
}

const flatSquarePadding: Record<ButtonSize, string> = { sm: 'p-[5px]', md: 'p-[9px]', lg: 'p-[11px]' }

const flatSegment =
    'rounded-none border-0 hover:bg-[rgb(var(--text-primary)/0.07)] data-[disabled]:hover:bg-transparent focus-visible:-outline-offset-2'

const flatSegmentPadding: Record<ButtonSize, string> = { sm: 'px-2', md: 'px-2.5', lg: 'px-3' }

const flatGroupBase = 'inline-grid max-w-full data-[disabled]:opacity-50 overflow-hidden rounded border border-primary'

const flatGroupOrientations: Record<ButtonGroupOrientation, string> = {
    horizontal:
        'grid-flow-col auto-cols-[minmax(0,max-content)] [&>[data-segment]~[data-segment]]:border-l [&>[data-segment]~[data-segment]]:border-primary',
    vertical:
        'grid-flow-row [&>[data-segment]~[data-segment]]:border-t [&>[data-segment]~[data-segment]]:border-primary',
}

const raisedUnderside =
    "before:absolute before:inset-x-0 before:bottom-0 before:top-1/2 before:border-t-0 before:bg-[repeating-linear-gradient(45deg,rgb(0_0_0/0.15)_0_1px,transparent_1px_5.6569px)] before:bg-[length:8px_8px] before:content-['']"

const raisedUndersideWidth = 'p-px before:border'

const raisedFrameBase = `relative inline-block min-w-0 max-w-full text-center ${raisedUnderside} data-[disabled]:cursor-not-allowed ${disabledFade} ${busyCursor} ${focusRing}`

const raisedHatchMotion: Record<ButtonSize, string> = {
    sm: 'before:transition-[background-position] before:duration-150 before:[transition-timing-function:cubic-bezier(0.2,0.7,0.3,1)] motion-reduce:before:transition-none [&:not([data-disabled]):active]:before:[background-position:0_1px] [&[data-pressed]]:before:[background-position:0_1px] [&[data-popup-open]]:before:[background-position:0_1px]',
    md: 'before:transition-[background-position] before:duration-150 before:[transition-timing-function:cubic-bezier(0.2,0.7,0.3,1)] motion-reduce:before:transition-none [&:not([data-disabled]):active]:before:[background-position:0_1.5px] [&[data-pressed]]:before:[background-position:0_1.5px] [&[data-popup-open]]:before:[background-position:0_1.5px]',
    lg: 'before:transition-[background-position] before:duration-150 before:[transition-timing-function:cubic-bezier(0.2,0.7,0.3,1)] motion-reduce:before:transition-none [&:not([data-disabled]):active]:before:[background-position:0_1.5px] [&[data-pressed]]:before:[background-position:0_1.5px] [&[data-popup-open]]:before:[background-position:0_1.5px]',
}

const raisedFrames: Record<ButtonVariant, string> = {
    danger: 'before:border-[color:color-mix(in_srgb,color-mix(in_srgb,theme(colors.salmon)_85%,theme(colors.red))_62%,black)] before:bg-[color:color-mix(in_srgb,color-mix(in_srgb,theme(colors.salmon)_85%,theme(colors.red))_76%,black)]',
    primary:
        'before:border-button before:bg-button-shadow dark:before:border-button-dark dark:before:bg-button-shadow-dark',
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
    'ui-button-face relative flex min-w-0 select-none items-center justify-center font-bold [[data-disabled]:not([aria-busy=true])>&]:bg-[repeating-linear-gradient(135deg,rgb(var(--text-primary)/0.08)_0_1px,transparent_1px_6px)]'

const raisedFaces: Record<ButtonVariant, string> = {
    danger: `border-[color:color-mix(in_srgb,color-mix(in_srgb,theme(colors.salmon)_85%,theme(colors.red))_62%,black)] ${toneSolid.error} [[data-pressed]>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.1)] [[aria-pressed]:not([data-disabled]):active>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.1)] [[data-popup-open]>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.1)] dark:[[data-pressed]>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.1)] dark:[[aria-pressed]:not([data-disabled]):active>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.1)] dark:[[data-popup-open]>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.1)]`,
    primary:
        'border-button bg-orange text-black [[data-pressed]>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.1)] [[aria-pressed]:not([data-disabled]):active>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.1)] [[data-popup-open]>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.1)] dark:border-button-dark',
    secondary:
        'border-gray bg-white text-primary dark:[--shade-color:rgb(255_255_255/0.16)] [[data-pressed]>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.08)] [[aria-pressed]:not([data-disabled]):active>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.08)] [[data-popup-open]>&]:shadow-[inset_0_0_0_999px_rgb(0_0_0/0.08)] dark:bg-dark dark:[[data-pressed]>&]:shadow-[inset_0_0_0_999px_rgb(255_255_255/0.1)] dark:[[aria-pressed]:not([data-disabled]):active>&]:shadow-[inset_0_0_0_999px_rgb(255_255_255/0.1)] dark:[[data-popup-open]>&]:shadow-[inset_0_0_0_999px_rgb(255_255_255/0.1)]',
}

const raisedFaceBorder = 'border'

const raisedFaceInset = 'mx-[-1px]'

const raisedFaceMotion: Record<ButtonSize, string> = {
    sm: 'translate-y-[-1.5px] [:not([data-disabled]):active>&]:translate-y-0 [[data-disabled]>&]:translate-y-[-1.5px] [[data-pressed]>&]:translate-y-0 [[data-popup-open]>&]:translate-y-[-0.5px]',
    md: 'translate-y-[-2px] [:not([data-disabled]):active>&]:translate-y-0 [[data-disabled]>&]:translate-y-[-2px] [[data-pressed]>&]:translate-y-0 [[data-popup-open]>&]:translate-y-[-0.5px]',
    lg: 'translate-y-[-2px] [:not([data-disabled]):active>&]:translate-y-0 [[data-disabled]>&]:translate-y-[-2px] [[data-pressed]>&]:translate-y-0 [[data-popup-open]>&]:translate-y-[-0.5px]',
}

const raisedFacePadding: Record<ButtonSize, string> = {
    sm: 'gap-1 px-2 py-[3px] text-xs leading-4',
    md: 'gap-1 px-2.5 py-[5px] text-[13px] leading-[22px]',
    lg: 'gap-1 px-3 py-[7px] text-[15px] leading-[26px]',
}

const raisedFaceSquarePadding: Record<ButtonSize, string> = { sm: 'p-1', md: 'p-2', lg: 'p-2.5' }

const raisedGroupBase = 'relative inline-grid max-w-full p-px data-[disabled]:opacity-50'

const raisedGroupOrientations: Record<ButtonGroupOrientation, string> = {
    horizontal: 'grid-flow-col auto-cols-[minmax(0,max-content)]',
    vertical: 'grid-flow-row',
}

const raisedSegment = `relative flex min-w-0 focus-visible:z-10 data-[disabled]:cursor-not-allowed ${busyCursor} ${focusRing}`

const raisedSegmentUnderside: Record<ButtonSize, string> = {
    sm: 'before:-bottom-px before:-left-px before:border [&:not([data-segment]~[data-segment])]:before:rounded-bl-[4px] [&:not(:has(~[data-segment]))]:before:-right-px [&:not(:has(~[data-segment]))]:before:rounded-br-[4px]',
    md: 'before:-bottom-px before:-left-px before:border [&:not([data-segment]~[data-segment])]:before:rounded-bl-[6px] [&:not(:has(~[data-segment]))]:before:-right-px [&:not(:has(~[data-segment]))]:before:rounded-br-[6px]',
    lg: 'before:-bottom-px before:-left-px before:border [&:not([data-segment]~[data-segment])]:before:rounded-bl-[6px] [&:not(:has(~[data-segment]))]:before:-right-px [&:not(:has(~[data-segment]))]:before:rounded-br-[6px]',
}

const raisedStackedSegmentUnderside: Record<ButtonSize, string> = {
    sm: 'before:-inset-x-px before:-bottom-px before:border [&:not(:has(~[data-segment]))]:before:rounded-b-[4px]',
    md: 'before:-inset-x-px before:-bottom-px before:border [&:not(:has(~[data-segment]))]:before:rounded-b-[6px]',
    lg: 'before:-inset-x-px before:-bottom-px before:border [&:not(:has(~[data-segment]))]:before:rounded-b-[6px]',
}

const raisedStackedSegmentFace: Record<ButtonSize, string> = {
    sm: '-mx-px flex-1 rounded-none [[data-segment]:has(~[data-segment])>&]:border-b-0 [[data-segment]:not([data-segment]~[data-segment])>&]:rounded-t-[4px] [[data-segment]:not(:has(~[data-segment]))>&]:rounded-b-[4px]',
    md: '-mx-px flex-1 rounded-none [[data-segment]:has(~[data-segment])>&]:border-b-0 [[data-segment]:not([data-segment]~[data-segment])>&]:rounded-t-[6px] [[data-segment]:not(:has(~[data-segment]))>&]:rounded-b-[6px]',
    lg: '-mx-px flex-1 rounded-none [[data-segment]:has(~[data-segment])>&]:border-b-0 [[data-segment]:not([data-segment]~[data-segment])>&]:rounded-t-[6px] [[data-segment]:not(:has(~[data-segment]))>&]:rounded-b-[6px]',
}

const pressedSegmentShade =
    "[--shade-color:rgb(0_0_0/0.22)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-100 after:content-[''] after:[box-shadow:var(--shade-start,0_0_#0000),var(--shade-end,0_0_#0000)] motion-reduce:after:transition-none [[data-pressed]>&]:after:opacity-100 [[data-popup-open]>&]:after:opacity-100 [:not([data-disabled]):active>&]:after:opacity-100"

const sideBySideShade =
    '[[data-segment]~[data-segment]>&]:[--shade-start:inset_4px_0_4px_-3px_var(--shade-color)] [[data-segment]:has(~[data-segment])>&]:[--shade-end:inset_-4px_0_4px_-3px_var(--shade-color)] [[data-segment]~[data-segment]>&:dir(rtl)]:[--shade-start:inset_-4px_0_4px_-3px_var(--shade-color)] [[data-segment]:has(~[data-segment])>&:dir(rtl)]:[--shade-end:inset_4px_0_4px_-3px_var(--shade-color)]'

const stackedShade =
    '[[data-segment]~[data-segment]>&]:[--shade-start:inset_0_4px_4px_-3px_var(--shade-color)] [[data-segment]:has(~[data-segment])>&]:[--shade-end:inset_0_-4px_4px_-3px_var(--shade-color)]'

const raisedSegmentFace: Record<ButtonSize, string> = {
    sm: '-ml-px rounded-none [[data-segment]:not([data-segment]~[data-segment])>&]:rounded-l-[4px] [[data-segment]:not(:has(~[data-segment]))>&]:-mr-px [[data-segment]:not(:has(~[data-segment]))>&]:rounded-r-[4px]',
    md: '-ml-px rounded-none [[data-segment]:not([data-segment]~[data-segment])>&]:rounded-l-[6px] [[data-segment]:not(:has(~[data-segment]))>&]:-mr-px [[data-segment]:not(:has(~[data-segment]))>&]:rounded-r-[6px]',
    lg: '-ml-px rounded-none [[data-segment]:not([data-segment]~[data-segment])>&]:rounded-l-[6px] [[data-segment]:not(:has(~[data-segment]))>&]:-mr-px [[data-segment]:not(:has(~[data-segment]))>&]:rounded-r-[6px]',
}

type ButtonShape = Required<ButtonLook> & {
    square: boolean
    isSegment: boolean
    stacked: boolean
}

function useButtonShape(
    ownAppearance: ButtonAppearance,
    ownVariant: ButtonVariant,
    ownSize: ButtonSize,
    square: boolean
): ButtonShape {
    const group = React.useContext(ButtonGroupContext)
    return {
        appearance: group?.appearance ?? ownAppearance,
        variant: group?.variant ?? ownVariant,
        size: group?.size ?? ownSize,
        square,
        isSegment: group !== null,
        stacked: group?.orientation === 'vertical',
    }
}

function frameClassName({ appearance, variant, size, square, isSegment, stacked }: ButtonShape): string {
    if (appearance === 'raised') {
        return isSegment
            ? cn(
                  raisedSegment,
                  raisedUnderside,
                  raisedFrames[variant],
                  raisedHatchMotion[size],
                  stacked ? raisedStackedSegmentUnderside[size] : raisedSegmentUnderside[size]
              )
            : cn(
                  raisedFrameBase,
                  raisedHatchMotion[size],
                  raisedUndersideWidth,
                  raisedFrames[variant],
                  raisedRadius[size],
                  raisedUndersideRadius[size]
              )
    }
    return cn(
        flatBase,
        appearance === 'outline' ? cn(outlineTones[variant], outlineDisabled) : flatTones[variant],
        square ? flatSquarePadding[size] : flatPadding[size],
        isSegment && flatSegment,
        isSegment && flatSegmentTones[variant],
        isSegment && !square && flatSegmentPadding[size]
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
    const { appearance, variant, size, square, isSegment, stacked } = shape
    const iconSlot = cn('flex shrink-0 items-center justify-center [&>svg]:size-full', iconSizes[size])
    const leadingIcon = square || iconPosition === 'start' ? icon : null
    const trailingIcon = square || iconPosition === 'start' ? null : icon
    const spinnerReplacesIcon = loading && leadingIcon
    const spinnerCoversLabel = loading && !spinnerReplacesIcon

    const label = (
        <span
            className={cn(
                'flex min-w-0 max-w-full items-center justify-center [gap:inherit]',
                spinnerCoversLabel && 'opacity-0',
                isSegment &&
                    appearance === 'raised' &&
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
            {truncateTextChildren(children)}
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

    if (appearance !== 'raised') {
        return content
    }

    return (
        <span
            data-button-face=""
            className={cn(
                raisedFaceBase,
                raisedFaces[variant],
                raisedFaceBorder,
                raisedFaceMotion[size],
                square ? raisedFaceSquarePadding[size] : raisedFacePadding[size],
                isSegment
                    ? cn(
                          pressedSegmentShade,
                          stacked
                              ? cn(raisedStackedSegmentFace[size], stackedShade)
                              : cn(raisedSegmentFace[size], sideBySideShade)
                      )
                    : cn(raisedFaceInset, raisedRadius[size])
            )}
        >
            {content}
        </span>
    )
}

type ButtonRootProps = ButtonProps & {
    square?: boolean
}

const ButtonRoot = React.forwardRef<HTMLElement, ButtonRootProps>(function ButtonRoot(
    {
        appearance = 'raised',
        variant = 'secondary',
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
    const shape = useButtonShape(appearance, variant, size, square)
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
    appearance = 'raised',
    variant = 'secondary',
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
    const shape = useButtonShape(appearance, variant, size, false)

    return (
        <Link
            {...props}
            data-segment={shape.isSegment ? '' : undefined}
            externalNoIcon={external || props.target === '_blank'}
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
    {
        appearance = 'raised',
        variant = 'secondary',
        size = 'md',
        orientation = 'horizontal',
        className,
        disabled = false,
        children,
        ...props
    },
    ref
) {
    const look = React.useMemo(
        () => ({ appearance, variant, size, disabled, orientation }),
        [appearance, variant, size, disabled, orientation]
    )
    return (
        <ButtonGroupContext.Provider value={look}>
            <div
                ref={ref}
                role="group"
                data-disabled={disabled ? '' : undefined}
                data-orientation={orientation}
                aria-orientation={orientation}
                className={cn(
                    appearance === 'raised'
                        ? cn(raisedGroupBase, raisedGroupOrientations[orientation], raisedRadius[size])
                        : cn(flatGroupBase, flatGroupOrientations[orientation], flatGroupTones[variant]),
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </ButtonGroupContext.Provider>
    )
})
