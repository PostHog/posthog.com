import React from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { IconX } from '@posthog/icons'
import { cn } from '../../../utils'
import { Button } from '../Button'
import { dialogBackdrop, dialogPopup, dialogViewport, surfacePaddings, surfaceDivider } from '../styles'
import { mergeClassName, withClassName } from '../utils'

export type DialogPopupProps = BaseDialog.Popup.Props & {
    container?: BaseDialog.Portal.Props['container']
}

const Popup = React.forwardRef<HTMLDivElement, DialogPopupProps>(function DialogPopup(
    { className, container, ...props },
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
                />
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
    <div
        className={cn(
            'flex min-h-[35px] shrink-0 items-center justify-between gap-2 border-b border-primary bg-accent p-1',
            className
        )}
    >
        <BaseDialog.Title className="my-0 ml-3 truncate text-left text-sm font-semibold text-primary">
            {children}
        </BaseDialog.Title>
        {showCloseButton && (
            <BaseDialog.Close render={<Button aria-label="Close" className="p-1" />}>
                <IconX className="size-4" />
            </BaseDialog.Close>
        )}
    </div>
)

const Title = withClassName(BaseDialog.Title, 'my-0 text-base font-bold text-primary')

const Description = withClassName(BaseDialog.Description, 'my-0 text-sm text-secondary')

const Body = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(function DialogBody(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={cn(`flex min-h-0 flex-col overflow-y-auto overscroll-contain ${surfacePaddings.md}`, className)}
            {...props}
        />
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
