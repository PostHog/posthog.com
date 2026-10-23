import React from 'react'
import { IconX } from '@posthog/icons'
import { cn } from '../../../utils'
import { IconButton } from '../Button'
import type { IconButtonProps } from '../Button'
import { cardLevels, toneFill, toneText, toneIcon } from '../styles'
import type { Tone } from '../styles'
import { toneIcons } from '../toneIcons'
import { HEIGHT_CHANGE_MS, heightChangeEasing, mergeClassName, prefersReducedMotion } from '../utils'

export type BannerRootProps = React.HTMLAttributes<HTMLDivElement> & { tone?: Tone }
export type BannerCloseProps = Omit<IconButtonProps, 'icon' | 'onClick' | 'aria-label'> & {
    onDismiss: () => void
    'aria-label'?: string
}
const ToneContext = React.createContext<Tone>('brand')
const CollapseContext = React.createContext<(onCollapsed: () => void) => void>((onCollapsed) => onCollapsed())
function flattenChildren(children: React.ReactNode): React.ReactNode[] {
    return React.Children.toArray(children).flatMap((child) =>
        React.isValidElement<{ children?: React.ReactNode }>(child) && child.type === React.Fragment
            ? flattenChildren(child.props.children)
            : [child]
    )
}

const Root = React.forwardRef<HTMLDivElement, BannerRootProps>(function BannerRoot(
    { tone = 'brand', children, className, ...props },
    ref
) {
    const parts = flattenChildren(children)
    const icon = parts.find((child) => React.isValidElement(child) && child.type === Icon)
    const close = parts.find((child) => React.isValidElement(child) && child.type === Close)
    const title = parts.find((child) => React.isValidElement(child) && child.type === Title)
    const action = parts.find((child) => React.isValidElement(child) && child.type === Action)
    const body = parts.filter((child) => child !== icon && child !== close && child !== title && child !== action)
    const frame = React.useRef<HTMLDivElement>(null)
    const collapse = React.useCallback((onCollapsed: () => void) => {
        const element = frame.current
        if (!element || prefersReducedMotion()) {
            onCollapsed()
            return
        }
        const animation = element.animate(
            [
                { height: `${element.offsetHeight}px`, opacity: 1, overflow: 'hidden' },
                { height: '0px', opacity: 0, overflow: 'hidden' },
            ],
            { duration: HEIGHT_CHANGE_MS, easing: heightChangeEasing, fill: 'forwards' }
        )
        animation.onfinish = onCollapsed
    }, [])
    return (
        <ToneContext.Provider value={tone}>
            <CollapseContext.Provider value={collapse}>
                <div ref={frame} className="@container w-full">
                    <div
                        ref={ref}
                        {...props}
                        className={cn(
                            cardLevels[1],
                            'w-full overflow-hidden rounded-none border-x-0 text-sm leading-5 text-primary',
                            className
                        )}
                    >
                        {title ? (
                            <>
                                <div className={cn('flex min-w-0 items-start gap-2 px-3 py-1.5', toneFill[tone])}>
                                    {icon}
                                    {title}
                                    {close}
                                </div>
                                <div className="flex min-w-0 flex-col items-start gap-2 px-3 py-2 @md:flex-row @md:items-center">
                                    <div className="min-w-0 flex-1">{body}</div>
                                    {action && <div className="max-w-full shrink-0">{action}</div>}
                                </div>
                            </>
                        ) : (
                            <div className="flex min-w-0 items-start gap-2 px-3 py-2">
                                {icon}
                                <div className="flex min-w-0 flex-1 flex-col gap-2 @md:flex-row @md:items-center">
                                    <div className="min-w-0 flex-1">{body}</div>
                                    {action && <div className="max-w-full shrink-0 @md:-my-[3px]">{action}</div>}
                                </div>
                                {close}
                            </div>
                        )}
                    </div>
                </div>
            </CollapseContext.Provider>
        </ToneContext.Provider>
    )
})
const Icon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function BannerIcon(
    { className, children, ...props },
    ref
) {
    const tone = React.useContext(ToneContext)
    const DefaultIcon = toneIcons[tone]
    return (
        <span
            ref={ref}
            {...props}
            aria-hidden
            className={cn('flex h-5 shrink-0 items-center [&_svg]:size-4', toneIcon[tone], className)}
        >
            {children === undefined ? <DefaultIcon /> : children}
        </span>
    )
})
const Title = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function BannerTitle(
    { className, ...props },
    ref
) {
    const tone = React.useContext(ToneContext)
    return (
        <div
            ref={ref}
            {...props}
            className={cn('min-w-0 flex-1 font-semibold [overflow-wrap:anywhere]', toneText[tone], className)}
        />
    )
})
const Content = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function BannerContent(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            {...props}
            className={cn('min-w-0 [overflow-wrap:anywhere] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0', className)}
        />
    )
})
const Action = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function BannerAction(
    { className, ...props },
    ref
) {
    return <span ref={ref} {...props} className={cn('flex max-w-full flex-wrap gap-2', className)} />
})
const Close = React.forwardRef<HTMLElement, BannerCloseProps>(function BannerClose(
    { onDismiss, 'aria-label': label = 'Dismiss notice', size = 'sm', className, ...props },
    ref
) {
    const collapse = React.useContext(CollapseContext)
    return (
        <IconButton
            ref={ref}
            {...props}
            size={size}
            aria-label={label}
            icon={<IconX className="size-4" />}
            onClick={() => collapse(onDismiss)}
            className={mergeClassName('-my-[3px] -mr-1', className)}
        />
    )
})
export const Banner = { Root, Icon, Title, Content, Action, Close }
