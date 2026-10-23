import React from 'react'
import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { Menu } from '../Menu'
import { menuPopup, positionerLayer } from '../styles'
import { mergeClassName, positionerPropNames, splitProps } from '../utils'
import type { PositionerPropName } from '../utils'

export type ContextMenuPopupProps = BaseContextMenu.Popup.Props &
    Pick<BaseContextMenu.Positioner.Props, PositionerPropName> & {
        container?: BaseContextMenu.Portal.Props['container']
    }

const Popup = React.forwardRef<HTMLDivElement, ContextMenuPopupProps>(function ContextMenuPopup(
    { className, container, ...props },
    ref
) {
    const [positionerProps, popupProps] = splitProps(props, positionerPropNames)

    return (
        <BaseContextMenu.Portal container={container}>
            <BaseContextMenu.Positioner {...positionerProps} className={positionerLayer}>
                <BaseContextMenu.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(menuPopup, className)}
                    {...popupProps}
                />
            </BaseContextMenu.Positioner>
        </BaseContextMenu.Portal>
    )
})

export const ContextMenu = {
    Root: BaseContextMenu.Root,
    Trigger: BaseContextMenu.Trigger,
    Popup,
    Item: Menu.Item,
    LinkItem: Menu.LinkItem,
    CheckboxItem: Menu.CheckboxItem,
    RadioGroup: Menu.RadioGroup,
    RadioItem: Menu.RadioItem,
    Group: Menu.Group,
    GroupLabel: Menu.GroupLabel,
    Separator: Menu.Separator,
    SubmenuRoot: Menu.SubmenuRoot,
    SubmenuTrigger: Menu.SubmenuTrigger,
}
