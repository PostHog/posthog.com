import React from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { IconCheck, IconChevronDown } from '@posthog/icons'
import {
    fieldChevronSizes,
    fieldListItemSizes,
    fieldSizes,
    checkListItem,
    fieldAppearanceShape,
    fieldTriggerSurface,
    menuGroupLabel,
    menuSeparator,
    popupSurface,
    popupTransition,
    positionerLayer,
} from '../styles'
import type { FieldAppearance, FieldSize } from '../styles'
import { mergeClassName, positionerPropNames, splitProps, withClassName } from '../utils'
import type { PositionerPropName } from '../utils'
import { TruncatedText } from '../truncation'

const selectPositionerPropNames = [...positionerPropNames, 'alignItemWithTrigger'] as const

const SizeContext = React.createContext<FieldSize>('md')
const AppearanceContext = React.createContext<FieldAppearance>('inset')

export type SelectRootProps = React.ComponentProps<typeof BaseSelect.Root> & {
    size?: FieldSize
    appearance?: FieldAppearance
}

function Root({ size = 'md', appearance = 'inset', ...props }: SelectRootProps): JSX.Element {
    return (
        <SizeContext.Provider value={size}>
            <AppearanceContext.Provider value={appearance}>
                <BaseSelect.Root {...props} />
            </AppearanceContext.Provider>
        </SizeContext.Provider>
    )
}

const Label = withClassName(BaseSelect.Label, 'cursor-default text-sm font-semibold text-primary')

export type SelectTriggerProps = Omit<BaseSelect.Trigger.Props, 'size'> & { size?: FieldSize }

const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
    { size: ownSize, className, ...props },
    ref
) {
    const contextSize = React.useContext(SizeContext)
    const appearance = React.useContext(AppearanceContext)
    const size = ownSize ?? contextSize
    return (
        <BaseSelect.Trigger
            ref={ref}
            className={mergeClassName(
                `${fieldTriggerSurface(
                    appearance
                )} flex min-w-32 select-none items-center justify-between gap-2 leading-none text-primary outline-none data-[popup-open]:border-orange ${
                    fieldSizes[size]
                } ${fieldAppearanceShape[appearance]}`,
                className
            )}
            {...props}
        />
    )
})

const Value = withClassName(BaseSelect.Value, 'truncate data-[placeholder]:text-muted')

const Icon = React.forwardRef<HTMLSpanElement, BaseSelect.Icon.Props>(function SelectIcon(
    { className, children, ...props },
    ref
) {
    const size = React.useContext(SizeContext)
    return (
        <BaseSelect.Icon ref={ref} className={mergeClassName('flex shrink-0 text-secondary', className)} {...props}>
            {children ?? <IconChevronDown className={fieldChevronSizes[size]} />}
        </BaseSelect.Icon>
    )
})

const selectPopup = `${popupSurface} ${popupTransition} group min-w-[var(--anchor-width)] max-w-[min(var(--available-width),max(var(--anchor-width),24rem))] bg-clip-padding data-[side=none]:min-w-[calc(var(--anchor-width)+2rem)]`

const scrollArrow =
    'z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-primary text-secondary'

export type SelectPopupProps = BaseSelect.Popup.Props &
    Pick<BaseSelect.Positioner.Props, PositionerPropName | 'alignItemWithTrigger'> & {
        container?: BaseSelect.Portal.Props['container']
    }

const Popup = React.forwardRef<HTMLDivElement, SelectPopupProps>(function SelectPopup(
    { className, children, container, ...props },
    ref
) {
    const [positionerProps, popupProps] = splitProps(props, selectPositionerPropNames)

    return (
        <BaseSelect.Portal container={container}>
            <BaseSelect.Positioner sideOffset={4} {...positionerProps} className={positionerLayer}>
                <BaseSelect.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(selectPopup, className)}
                    {...popupProps}
                >
                    <BaseSelect.ScrollUpArrow className={`${scrollArrow} top-0`}>
                        <IconChevronDown className="size-4 rotate-180" />
                    </BaseSelect.ScrollUpArrow>
                    <BaseSelect.List className="max-h-[var(--available-height)] scroll-py-6 overflow-y-auto p-1">
                        {children}
                    </BaseSelect.List>
                    <BaseSelect.ScrollDownArrow className={`${scrollArrow} bottom-0`}>
                        <IconChevronDown className="size-4" />
                    </BaseSelect.ScrollDownArrow>
                </BaseSelect.Popup>
            </BaseSelect.Positioner>
        </BaseSelect.Portal>
    )
})

const Item = React.forwardRef<HTMLDivElement, BaseSelect.Item.Props>(function SelectItem(
    { className, children, ...props },
    ref
) {
    const size = React.useContext(SizeContext)
    return (
        <BaseSelect.Item
            ref={ref}
            className={mergeClassName(`${checkListItem} ${fieldListItemSizes[size]}`, className)}
            {...props}
        >
            <BaseSelect.ItemIndicator className="col-start-1 flex">
                <IconCheck className="size-4" />
            </BaseSelect.ItemIndicator>
            <BaseSelect.ItemText className="col-start-2 min-w-0">
                <TruncatedText>{children}</TruncatedText>
            </BaseSelect.ItemText>
        </BaseSelect.Item>
    )
})

const GroupLabel = withClassName(BaseSelect.GroupLabel, `${menuGroupLabel} pl-8`)

const Separator = withClassName(BaseSelect.Separator, menuSeparator)

export const Select = {
    Root,
    Label,
    Trigger,
    Value,
    Icon,
    Popup,
    Item,
    Group: BaseSelect.Group,
    GroupLabel,
    Separator,
}
