import React from 'react'
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { Dialog } from '../Dialog'
import type { DialogHeaderProps } from '../Dialog'
import { dialogBackdrop, dialogPopup, dialogViewport } from '../styles'
import { mergeClassName, withClassName } from '../utils'

export type AlertDialogPopupProps = BaseAlertDialog.Popup.Props & {
    container?: BaseAlertDialog.Portal.Props['container']
}

const Popup = React.forwardRef<HTMLDivElement, AlertDialogPopupProps>(function AlertDialogPopup(
    { className, container, children, ...props },
    ref
) {
    return (
        <BaseAlertDialog.Portal container={container}>
            <BaseAlertDialog.Backdrop className={dialogBackdrop} />
            <BaseAlertDialog.Viewport className={dialogViewport}>
                <BaseAlertDialog.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(`${dialogPopup} max-w-lg`, className)}
                    {...props}
                >
                    {children}
                </BaseAlertDialog.Popup>
            </BaseAlertDialog.Viewport>
        </BaseAlertDialog.Portal>
    )
})

const Title = withClassName(BaseAlertDialog.Title, 'my-0 text-base font-bold text-primary')

const Description = withClassName(BaseAlertDialog.Description, 'my-0 text-sm text-secondary')

const Header = ({ showCloseButton = false, ...props }: DialogHeaderProps): JSX.Element => (
    <Dialog.Header {...props} showCloseButton={showCloseButton} />
)

export const AlertDialog = {
    Root: BaseAlertDialog.Root,
    Trigger: BaseAlertDialog.Trigger,
    Popup,
    Header,
    Body: Dialog.Body,
    Footer: Dialog.Footer,
    Title,
    Description,
    Close: BaseAlertDialog.Close,
    createHandle: BaseAlertDialog.createHandle,
}
