import React from 'react'
import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { IconCheck, IconX } from '@posthog/icons'
import {
    fieldGroupSizes,
    fieldInnerSizes,
    fieldButtonSizes,
    fieldChipRemoveSizes,
    fieldChipSizes,
    fieldChipsSizes,
    bareInput,
    checkListItem,
    chip,
    chipRemove,
    inputGroup,
    inputGroupButton,
    insetFocusRing,
    menuGroupLabel,
    menuSeparator,
    popupSurface,
    popupTransition,
    positionerLayer,
} from '../styles'
import { assignRef, mergeClassName, positionerPropNames, splitProps, useSmoothHeight, withClassName } from '../utils'
import type { FieldSize } from '../styles'
import type { PositionerPropName } from '../utils'

const comboboxListMessage = 'px-3.5 py-2 text-sm leading-none text-muted empty:p-0'

const Label = withClassName(BaseCombobox.Label, 'cursor-default text-sm font-semibold text-primary')

const SizeContext = React.createContext<FieldSize>('md')

export type ComboboxInputGroupProps = BaseCombobox.InputGroup.Props & { size?: FieldSize }
const InputGroup = React.forwardRef<HTMLDivElement, ComboboxInputGroupProps>(function ComboboxInputGroup(
    { size = 'md', className, ...props },
    ref
) {
    const smoothHeight = useSmoothHeight()
    const setRef = React.useCallback(
        (element: HTMLDivElement | null) => {
            smoothHeight(element)
            assignRef(ref, element)
        },
        [ref, smoothHeight]
    )
    return (
        <SizeContext.Provider value={size}>
            <BaseCombobox.InputGroup
                ref={setRef}
                className={mergeClassName(`${inputGroup} ${fieldGroupSizes[size]}`, className)}
                {...props}
            />
        </SizeContext.Provider>
    )
})
function withGroupSize<Component extends React.ElementType>(
    BaseComponent: Component,
    classes: string,
    sizes: Record<FieldSize, string>,
    defaults: Partial<React.ComponentProps<Component>> = {}
) {
    const Part = React.forwardRef<React.ComponentRef<Component>, Omit<React.ComponentProps<Component>, 'size'>>(
        function SizedPart({ className, ...props }, ref) {
            const size = React.useContext(SizeContext)
            return React.createElement(BaseComponent, {
                ...defaults,
                ...props,
                ref,
                className: mergeClassName(`${classes} ${sizes[size]}`, className),
            })
        }
    )
    return Part
}

const Input = withGroupSize(
    BaseCombobox.Input,
    `${bareInput} min-w-10 data-[disabled]:cursor-not-allowed`,
    fieldInnerSizes
)

const clearButtonSizes = {
    sm: `${fieldButtonSizes.sm} [&>svg]:size-2.5`,
    md: `${fieldButtonSizes.md} [&>svg]:size-3`,
    lg: `${fieldButtonSizes.lg} [&>svg]:size-3.5`,
}

const Clear = withGroupSize(
    BaseCombobox.Clear,
    `${inputGroupButton} transition-opacity duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none`,
    clearButtonSizes,
    { children: <IconX className="size-3.5" />, 'aria-label': 'Clear' }
)

const Chips = withGroupSize(
    BaseCombobox.Chips,
    'flex min-w-0 flex-1 flex-wrap items-center gap-1 self-stretch',
    fieldChipsSizes
)

const Chip = withGroupSize(BaseCombobox.Chip, `${chip} cursor-default ${insetFocusRing}`, fieldChipSizes)

const ChipRemove = withGroupSize(BaseCombobox.ChipRemove, chipRemove, fieldChipRemoveSizes, {
    children: <IconX className="size-3" />,
    'aria-label': 'Remove',
})

const comboboxPopup = `${popupSurface} ${popupTransition} min-w-[var(--anchor-width)] max-w-[var(--available-width)] bg-clip-padding`

export type ComboboxPopupProps = BaseCombobox.Popup.Props &
    Pick<BaseCombobox.Positioner.Props, PositionerPropName> & {
        container?: BaseCombobox.Portal.Props['container']
    }

const Popup = React.forwardRef<HTMLDivElement, ComboboxPopupProps>(function ComboboxPopup(
    { className, container, ...props },
    ref
) {
    const [positionerProps, popupProps] = splitProps(props, positionerPropNames)

    return (
        <BaseCombobox.Portal container={container}>
            <BaseCombobox.Positioner sideOffset={4} {...positionerProps} className={positionerLayer}>
                <BaseCombobox.Popup
                    ref={ref}
                    data-scheme="primary"
                    className={mergeClassName(comboboxPopup, className)}
                    {...popupProps}
                />
            </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
    )
})

const List = withClassName(
    BaseCombobox.List,
    'max-h-[min(22.5rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain p-1 outline-none data-[empty]:p-0'
)

const Status = withClassName(BaseCombobox.Status, `flex items-center gap-2 ${comboboxListMessage}`)

const Empty = withClassName(BaseCombobox.Empty, comboboxListMessage, { children: 'No results' })

const Item = React.forwardRef<HTMLDivElement, BaseCombobox.Item.Props>(function ComboboxItem(
    { className, children, ...props },
    ref
) {
    return (
        <BaseCombobox.Item ref={ref} className={mergeClassName(checkListItem, className)} {...props}>
            <BaseCombobox.ItemIndicator className="col-start-1 flex">
                <IconCheck className="size-4" />
            </BaseCombobox.ItemIndicator>
            <span className="col-start-2">{children}</span>
        </BaseCombobox.Item>
    )
})

const GroupLabel = withClassName(BaseCombobox.GroupLabel, `${menuGroupLabel} pl-8`)

const Separator = withClassName(BaseCombobox.Separator, menuSeparator)

export const Combobox = {
    Root: BaseCombobox.Root,
    Label,
    InputGroup,
    Input,
    Clear,
    Value: BaseCombobox.Value,
    Chips,
    Chip,
    ChipRemove,
    Popup,
    List,
    Status,
    Empty,
    Item,
    Group: BaseCombobox.Group,
    GroupLabel,
    Separator,
    Row: BaseCombobox.Row,
    Collection: BaseCombobox.Collection,
    useFilter: BaseCombobox.useFilter,
    useFilteredItems: BaseCombobox.useFilteredItems,
    createItems: BaseCombobox.createItems,
}
