import React from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { contentPopup, popupArrow, positionerLayer } from '../styles'
import { mergeClassName, positionerPropNames, splitProps, withClassName } from '../utils'
import type { PositionerPropName } from '../utils'

const popoverPopup = contentPopup

export type PopoverPopupProps = BasePopover.Popup.Props &
    Pick<BasePopover.Positioner.Props, PositionerPropName> & {
        container?: BasePopover.Portal.Props['container']
    }

const Popup = React.forwardRef<HTMLDivElement, PopoverPopupProps>(function PopoverPopup(
    { className, container, ...props },
    ref
) {
    const [positionerProps, popupProps] = splitProps(props, positionerPropNames)

    return (
        <BasePopover.Portal container={container}>
            <BasePopover.Positioner sideOffset={8} {...positionerProps} className={positionerLayer}>
                <BasePopover.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(popoverPopup, className)}
                    {...popupProps}
                />
            </BasePopover.Positioner>
        </BasePopover.Portal>
    )
})

const Arrow = withClassName(BasePopover.Arrow, popupArrow)

const Title = withClassName(BasePopover.Title, 'm-0 text-[15px] font-bold leading-snug text-primary')

const Description = withClassName(BasePopover.Description, 'm-0 text-sm text-secondary')

export const Popover = {
    Root: BasePopover.Root,
    Trigger: BasePopover.Trigger,
    Popup,
    Arrow,
    Title,
    Description,
    Close: BasePopover.Close,
}
