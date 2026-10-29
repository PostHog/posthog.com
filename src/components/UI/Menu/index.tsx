import React from 'react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { IconCheck, IconChevronRight } from '@posthog/icons'
import {
    menuGroupLabel,
    menuItem,
    menuItemIndicator,
    menuItemWithIndicator,
    menuPopup,
    menuSeparator,
    positionerLayer,
} from '../styles'
import { mergeClassName, positionerPropNames, splitProps, withClassName } from '../utils'
import type { PositionerPropName } from '../utils'
import { truncateTextChildren } from '../truncation'

export type MenuPopupProps = BaseMenu.Popup.Props &
    Pick<BaseMenu.Positioner.Props, PositionerPropName> & {
        container?: BaseMenu.Portal.Props['container']
    }

const Popup = React.forwardRef<HTMLDivElement, MenuPopupProps>(function MenuPopup(
    { className, container, ...props },
    ref
) {
    const [positionerProps, popupProps] = splitProps(props, positionerPropNames)

    return (
        <BaseMenu.Portal container={container}>
            <BaseMenu.Positioner sideOffset={4} {...positionerProps} className={positionerLayer}>
                <BaseMenu.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(menuPopup, className)}
                    {...popupProps}
                />
            </BaseMenu.Positioner>
        </BaseMenu.Portal>
    )
})

const Item = React.forwardRef<HTMLDivElement, BaseMenu.Item.Props>(function MenuItem(
    { className, children, ...props },
    ref
) {
    return (
        <BaseMenu.Item ref={ref} className={mergeClassName(menuItem, className)} {...props}>
            {truncateTextChildren(children)}
        </BaseMenu.Item>
    )
})

const LinkItem = React.forwardRef<HTMLAnchorElement, BaseMenu.LinkItem.Props>(function MenuLinkItem(
    { className, children, ...props },
    ref
) {
    return (
        <BaseMenu.LinkItem ref={ref} className={mergeClassName(`${menuItem} no-underline`, className)} {...props}>
            {truncateTextChildren(children)}
        </BaseMenu.LinkItem>
    )
})

const CheckboxItem = React.forwardRef<HTMLDivElement, BaseMenu.CheckboxItem.Props>(function MenuCheckboxItem(
    { className, children, ...props },
    ref
) {
    return (
        <BaseMenu.CheckboxItem ref={ref} className={mergeClassName(menuItemWithIndicator, className)} {...props}>
            <BaseMenu.CheckboxItemIndicator className={menuItemIndicator}>
                <IconCheck className="size-3.5" />
            </BaseMenu.CheckboxItemIndicator>
            {truncateTextChildren(children)}
        </BaseMenu.CheckboxItem>
    )
})

const RadioItem = React.forwardRef<HTMLDivElement, BaseMenu.RadioItem.Props>(function MenuRadioItem(
    { className, children, ...props },
    ref
) {
    return (
        <BaseMenu.RadioItem ref={ref} className={mergeClassName(menuItemWithIndicator, className)} {...props}>
            <BaseMenu.RadioItemIndicator className={menuItemIndicator}>
                <span className="size-1.5 rounded-full bg-[rgb(var(--text-primary))]" />
            </BaseMenu.RadioItemIndicator>
            {truncateTextChildren(children)}
        </BaseMenu.RadioItem>
    )
})

const SubmenuTrigger = React.forwardRef<HTMLDivElement, BaseMenu.SubmenuTrigger.Props>(function MenuSubmenuTrigger(
    { className, children, ...props },
    ref
) {
    return (
        <BaseMenu.SubmenuTrigger
            ref={ref}
            className={mergeClassName(`${menuItem} data-[popup-open]:bg-accent`, className)}
            {...props}
        >
            {truncateTextChildren(children)}
            <IconChevronRight className="-mr-1 ml-auto size-4 text-secondary" />
        </BaseMenu.SubmenuTrigger>
    )
})

const GroupLabel = withClassName(BaseMenu.GroupLabel, menuGroupLabel)

const Separator = withClassName(BaseMenu.Separator, menuSeparator)

export const Menu = {
    Root: BaseMenu.Root,
    Trigger: BaseMenu.Trigger,
    Popup,
    Item,
    LinkItem,
    CheckboxItem,
    RadioGroup: BaseMenu.RadioGroup,
    RadioItem,
    Group: BaseMenu.Group,
    GroupLabel,
    Separator,
    SubmenuRoot: BaseMenu.SubmenuRoot,
    SubmenuTrigger,
}
