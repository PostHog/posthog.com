import React from 'react'
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import { contentPopup, focusRing, popupArrow, positionerLayer } from '../styles'
import { mergeClassName, positionerPropNames, splitProps, withClassName } from '../utils'
import type { PositionerPropName } from '../utils'

const previewCardTrigger = `font-semibold text-red hover:underline data-[popup-open]:underline dark:text-yellow ${focusRing}`

const previewCardPopup = contentPopup

export type PreviewCardPopupProps = BasePreviewCard.Popup.Props &
    Pick<BasePreviewCard.Positioner.Props, PositionerPropName> & {
        container?: BasePreviewCard.Portal.Props['container']
    }

const Popup = React.forwardRef<HTMLDivElement, PreviewCardPopupProps>(function PreviewCardPopup(
    { className, container, ...props },
    ref
) {
    const [positionerProps, popupProps] = splitProps(props, positionerPropNames)

    return (
        <BasePreviewCard.Portal container={container}>
            <BasePreviewCard.Positioner sideOffset={8} {...positionerProps} className={positionerLayer}>
                <BasePreviewCard.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(previewCardPopup, className)}
                    {...popupProps}
                />
            </BasePreviewCard.Positioner>
        </BasePreviewCard.Portal>
    )
})

const Trigger = withClassName(BasePreviewCard.Trigger, previewCardTrigger)

const Arrow = withClassName(BasePreviewCard.Arrow, popupArrow)

export const PreviewCard = {
    Root: BasePreviewCard.Root,
    Trigger,
    Popup,
    Arrow,
    Backdrop: BasePreviewCard.Backdrop,
    Viewport: BasePreviewCard.Viewport,
    createHandle: BasePreviewCard.createHandle,
    Handle: BasePreviewCard.Handle,
}
