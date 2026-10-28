import React from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { IconX } from '@posthog/icons'
import { cn } from '../../../utils'
import { IconButton } from '../Button'
import { ScrollArea } from '../ScrollArea'
import { dialogBackdrop, dialogPopup, dialogViewport, surfacePaddings, surfaceDivider } from '../styles'
import { mergeClassName, withClassName } from '../utils'

export type DialogPopupProps = BaseDialog.Popup.Props & {
    container?: BaseDialog.Portal.Props['container']
}

const Popup = React.forwardRef<HTMLDivElement, DialogPopupProps>(function DialogPopup(
    { className, container, children, ...props },
    ref
) {
    return (
        <BaseDialog.Portal container={container}>
            <BaseDialog.Backdrop className={dialogBackdrop} />
            <BaseDialog.Viewport className={dialogViewport}>
                <BaseDialog.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(`${dialogPopup} max-w-lg`, className)}
                    {...props}
                >
                    {children}
                </BaseDialog.Popup>
            </BaseDialog.Viewport>
        </BaseDialog.Portal>
    )
})

export type DialogHeaderProps = {
    children: React.ReactNode
    className?: string
    showCloseButton?: boolean
}

const Header = ({ children, className, showCloseButton = true }: DialogHeaderProps): JSX.Element => (
    <div className={cn('flex shrink-0 items-start justify-between gap-2 pl-4 pr-2.5 pt-3.5', className)}>
        <BaseDialog.Title className="my-0 min-w-0 pt-0.5 text-left text-base font-bold leading-6 text-primary">
            {children}
        </BaseDialog.Title>
        {showCloseButton && (
            <BaseDialog.Close
                render={
                    <IconButton appearance="flat" aria-label="Close" size="sm" icon={<IconX className="size-4" />} />
                }
            />
        )}
    </div>
)

const Title = withClassName(BaseDialog.Title, 'my-0 text-base font-bold text-primary')

const Description = withClassName(BaseDialog.Description, 'my-0 text-sm text-secondary')

export const scrollBodyRoot = 'flex min-h-0 grow flex-col'
export const scrollBodyViewport = 'h-auto min-h-0 grow'

const Body = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(function DialogBody(
    { className, ...props },
    ref
) {
    return (
        <ScrollArea.Root className={scrollBodyRoot}>
            <ScrollArea.Viewport
                ref={ref}
                className={cn(`${scrollBodyViewport} flex flex-col ${surfacePaddings.md}`, className)}
                {...props}
            />
            <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
})
export type DialogFooterProps = React.ComponentPropsWithoutRef<'div'> & {
    separator?: boolean
}

const Footer = React.forwardRef<HTMLDivElement, DialogFooterProps>(function DialogFooter(
    { className, separator = false, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={cn(
                'flex shrink-0 flex-wrap items-center justify-end gap-2 px-4 pb-4',
                separator && `border-t ${surfaceDivider} py-3`,
                className
            )}
            {...props}
        />
    )
})

export const Dialog = {
    Root: BaseDialog.Root,
    Trigger: BaseDialog.Trigger,
    Popup,
    Header,
    Body,
    Footer,
    Title,
    Description,
    Close: BaseDialog.Close,
}
