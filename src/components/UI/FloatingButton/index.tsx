import React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cn } from '../../../utils'
import { focusRing, grainSurface, liquidGlassSurface } from '../styles'
import { mergeClassName } from '../utils'
import { Spinner } from '../Spinner'

export type FloatingButtonSize = 'sm' | 'md' | 'lg'

export type FloatingButtonProps = BaseButton.Props & {
    size?: FloatingButtonSize
    icon?: React.ReactNode
    iconPosition?: 'start' | 'end'
    loading?: boolean
}

export type FloatingIconButtonProps = Omit<BaseButton.Props, 'children'> & {
    size?: FloatingButtonSize
    icon: React.ReactNode
    loading?: boolean
    'aria-label': string
}

export type FloatingButtonGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
    size?: FloatingButtonSize
    className?: string
    children?: React.ReactNode
}

const GroupSizeContext = React.createContext<FloatingButtonSize | null>(null)

const pressable = `relative inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border-0 font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [&:not([data-disabled]):active]:scale-[0.96] data-[disabled]:cursor-not-allowed [&[data-disabled]:not([aria-busy=true])]:opacity-50 [&[data-disabled][aria-busy=true]]:cursor-progress motion-reduce:transition-none ${focusRing}`

const standalone = `${grainSurface} ${liquidGlassSurface} hover:bg-white/60 data-[pressed]:bg-white/70 data-[popup-open]:bg-white/70 dark:hover:bg-black/40 dark:data-[pressed]:bg-black/50 dark:data-[popup-open]:bg-black/50`

const inGroup =
    'bg-transparent text-black hover:bg-white/40 data-[pressed]:bg-white/60 data-[popup-open]:bg-white/60 dark:text-white dark:hover:bg-white/10 dark:data-[pressed]:bg-white/15 dark:data-[popup-open]:bg-white/15'

const labelSizes: Record<FloatingButtonSize, string> = {
    sm: 'h-8 gap-1.5 px-3 text-xs',
    md: 'h-10 gap-2 px-4 text-sm',
    lg: 'h-12 gap-2 px-5 text-[15px]',
}

const groupedLabelSizes: Record<FloatingButtonSize, string> = {
    sm: 'h-6 gap-1.5 px-2.5 text-xs',
    md: 'h-8 gap-2 px-3 text-sm',
    lg: 'h-10 gap-2 px-4 text-[15px]',
}

const squareSizes: Record<FloatingButtonSize, string> = { sm: 'size-8', md: 'size-10', lg: 'size-12' }

const groupedSquareSizes: Record<FloatingButtonSize, string> = { sm: 'size-6', md: 'size-8', lg: 'size-10' }

const iconSizes: Record<FloatingButtonSize, string> = { sm: 'size-3.5', md: 'size-4', lg: 'size-5' }

function useFloatingSize(ownSize: FloatingButtonSize): { size: FloatingButtonSize; grouped: boolean } {
    const groupSize = React.useContext(GroupSizeContext)
    return { size: groupSize ?? ownSize, grouped: groupSize !== null }
}

function Content({
    size,
    icon,
    iconPosition = 'start',
    loading,
    children,
}: {
    size: FloatingButtonSize
    icon?: React.ReactNode
    iconPosition?: 'start' | 'end'
    loading?: boolean
    children?: React.ReactNode
}): JSX.Element {
    const iconSlot = icon ? (
        <span
            aria-hidden
            className={cn('flex shrink-0 items-center justify-center [&>svg]:size-full', iconSizes[size])}
        >
            {icon}
        </span>
    ) : null
    return (
        <>
            <span className={cn('flex items-center justify-center [gap:inherit]', loading && 'opacity-0')}>
                {iconPosition === 'start' && iconSlot}
                {children}
                {iconPosition === 'end' && iconSlot}
            </span>
            {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <Spinner size={size} />
                </span>
            )}
        </>
    )
}

export const FloatingButton = React.forwardRef<HTMLElement, FloatingButtonProps>(function FloatingButton(
    { size: ownSize = 'md', icon, iconPosition, loading, className, children, ...props },
    ref
) {
    const { size, grouped } = useFloatingSize(ownSize)
    return (
        <BaseButton
            ref={ref}
            className={mergeClassName(
                cn(pressable, grouped ? inGroup : standalone, grouped ? groupedLabelSizes[size] : labelSizes[size]),
                className
            )}
            {...props}
            disabled={loading || props.disabled}
            focusableWhenDisabled={loading || props.focusableWhenDisabled}
            aria-busy={loading || props['aria-busy']}
        >
            <Content size={size} icon={icon} iconPosition={iconPosition} loading={loading}>
                {children}
            </Content>
        </BaseButton>
    )
})

export const FloatingIconButton = React.forwardRef<HTMLElement, FloatingIconButtonProps>(function FloatingIconButton(
    { size: ownSize = 'md', icon, loading, className, ...props },
    ref
) {
    const { size, grouped } = useFloatingSize(ownSize)
    return (
        <BaseButton
            ref={ref}
            className={mergeClassName(
                cn(pressable, grouped ? inGroup : standalone, grouped ? groupedSquareSizes[size] : squareSizes[size]),
                className
            )}
            {...props}
            disabled={loading || props.disabled}
            focusableWhenDisabled={loading || props.focusableWhenDisabled}
            aria-busy={loading || props['aria-busy']}
        >
            <Content size={size} icon={icon} loading={loading} />
        </BaseButton>
    )
})

export const FloatingButtonGroup = React.forwardRef<HTMLDivElement, FloatingButtonGroupProps>(
    function FloatingButtonGroup({ size = 'md', className, children, ...props }, ref) {
        return (
            <GroupSizeContext.Provider value={size}>
                <div
                    ref={ref}
                    role="group"
                    className={cn(
                        'inline-flex items-center gap-0.5 rounded-full p-1',
                        grainSurface,
                        liquidGlassSurface,
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </GroupSizeContext.Provider>
        )
    }
)
