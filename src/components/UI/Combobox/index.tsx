import React from 'react'
import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { IconCheck, IconX } from '@posthog/icons'
import {
    fieldGroupSizes,
    fieldInnerSizes,
    fieldIconButtonIconSize,
    fieldIconButtonSizes,
    fieldChipRemoveSizes,
    fieldChipSizes,
    fieldChipsSizes,
    bareInput,
    checkListItem,
    chip,
    chipRemove,
    fieldAppearanceShape,
    inputGroupFor,
    insetFocusRing,
    menuGroupLabel,
    menuSeparator,
    popupSurface,
    popupTransition,
    positionerLayer,
} from '../styles'
import {
    assignRef,
    HEIGHT_CHANGE_MS,
    mergeClassName,
    positionerPropNames,
    prefersReducedMotion,
    splitProps,
    useSmoothHeight,
    withClassName,
} from '../utils'
import { IconButton } from '../Button'
import { cn } from '../../../utils'
import type { FieldAppearance, FieldSize } from '../styles'
import type { PositionerPropName } from '../utils'

const comboboxListMessage = 'px-3.5 py-2 text-sm leading-none text-muted empty:p-0'

const Label = withClassName(BaseCombobox.Label, 'cursor-default text-sm font-semibold text-primary')

const SizeContext = React.createContext<FieldSize>('md')

function popupSide(group: HTMLElement): string {
    const listId = group.querySelector('input')?.getAttribute('aria-controls')
    const list = listId ? document.getElementById(listId) : null
    return list?.closest('[data-side]')?.getAttribute('data-side') ?? 'bottom'
}

function scrollParent(element: HTMLElement): HTMLElement {
    let node = element.parentElement
    while (node) {
        if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight) return node
        node = node.parentElement
    }
    return (document.scrollingElement as HTMLElement | null) ?? document.documentElement
}

function keepPopupInPlace(group: HTMLElement): () => void {
    if (typeof ResizeObserver === 'undefined') return () => undefined
    let lastHeight = group.offsetHeight
    let frame = 0

    const observer = new ResizeObserver(() => {
        if (frame) return
        const height = group.offsetHeight
        const growth = height - lastHeight
        const from = lastHeight
        lastHeight = height
        if (!growth || !group.hasAttribute('data-popup-open') || popupSide(group) === 'top') return
        const scroller = scrollParent(group)
        if (prefersReducedMotion()) {
            scroller.scrollTop += growth
            return
        }
        group.style.overflow = 'hidden'
        group.style.height = `${from}px`
        const startScroll = scroller.scrollTop
        const start = performance.now()
        const step = (now: number) => {
            const progress = Math.min(1, (now - start) / HEIGHT_CHANGE_MS)
            const next = from + growth * (1 - Math.pow(1 - progress, 4))
            group.style.height = `${next}px`
            scroller.scrollTop = Math.round(startScroll + next - from)
            if (progress < 1) {
                frame = requestAnimationFrame(step)
                return
            }
            frame = 0
            group.style.height = ''
            group.style.overflow = ''
            lastHeight = group.offsetHeight
            scroller.scrollTop = Math.round(startScroll + lastHeight - from)
        }
        frame = requestAnimationFrame(step)
    })
    observer.observe(group)
    return () => {
        observer.disconnect()
        cancelAnimationFrame(frame)
    }
}

export type ComboboxInputGroupProps = BaseCombobox.InputGroup.Props & { size?: FieldSize; appearance?: FieldAppearance }
const InputGroup = React.forwardRef<HTMLDivElement, ComboboxInputGroupProps>(function ComboboxInputGroup(
    { size = 'md', appearance = 'inset', className, ...props },
    ref
) {
    const group = React.useRef<HTMLDivElement | null>(null)
    const smoothHeight = useSmoothHeight(() => !group.current?.hasAttribute('data-popup-open'))
    const stopFollowingPopup = React.useRef<() => void>()
    const setRef = React.useCallback(
        (element: HTMLDivElement | null) => {
            group.current = element
            smoothHeight(element)
            stopFollowingPopup.current?.()
            stopFollowingPopup.current = element ? keepPopupInPlace(element) : undefined
            assignRef(ref, element)
        },
        [ref, smoothHeight]
    )
    return (
        <SizeContext.Provider value={size}>
            <BaseCombobox.InputGroup
                ref={setRef}
                className={mergeClassName(
                    `${inputGroupFor(appearance)} ${fieldGroupSizes[size]} ${fieldAppearanceShape[appearance]} ${
                        appearance === 'line' ? '[&_input]:px-0' : ''
                    }`,
                    className
                )}
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

const clearFade =
    'transition-[opacity,background-color,color] duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none'

const Clear = React.forwardRef<HTMLButtonElement, BaseCombobox.Clear.Props>(function ComboboxClear(
    { className, children, 'aria-label': label = 'Clear', ...props },
    ref
) {
    const size = React.useContext(SizeContext)
    return (
        <BaseCombobox.Clear
            ref={ref}
            {...props}
            render={(baseProps) => {
                const clearProps = { ...baseProps }
                delete clearProps.children
                return (
                    <IconButton
                        appearance="flat"
                        {...clearProps}
                        size={fieldIconButtonIconSize[size]}
                        aria-label={label}
                        icon={children ?? <IconX />}
                        className={cn(
                            fieldIconButtonSizes[size],
                            clearFade,
                            typeof className === 'string' && className
                        )}
                    />
                )
            }}
        />
    )
})

const chipMotionEasing = 'cubic-bezier(0.23, 1, 0.32, 1)'
const CHIP_ENTER_MS = 220
const CHIP_EXIT_MS = 180

function collapsedChip(gap: number): Keyframe {
    return {
        width: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderLeftWidth: '0px',
        borderRightWidth: '0px',
        marginRight: `${-gap}px`,
        opacity: 0,
    }
}

function openChip(chip: HTMLElement): Keyframe {
    const style = getComputedStyle(chip)
    return {
        width: `${chip.offsetWidth}px`,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        borderLeftWidth: style.borderLeftWidth,
        borderRightWidth: style.borderRightWidth,
        marginRight: '0px',
        opacity: 1,
    }
}

function clipWhileAnimating(chip: HTMLElement, animation: Animation, onDone?: () => void): void {
    chip.style.overflow = 'hidden'
    chip.style.whiteSpace = 'nowrap'
    chip.style.flexShrink = '0'
    animation.onfinish = () => {
        chip.style.overflow = ''
        chip.style.whiteSpace = ''
        chip.style.flexShrink = ''
        onDone?.()
    }
}

const hiddenToRight = 'inset(0 100% 0 0 round 999px)'
const fullyShown = 'inset(0 0 0 0 round 999px)'

type ChipBox = { left: number; top: number; width: number; height: number }

function animateChipChanges(container: HTMLElement): () => void {
    if (typeof MutationObserver === 'undefined') return () => undefined
    const isGhost = (node: Node) => node instanceof HTMLElement && node.dataset.leaving !== undefined
    const isChip = (node: Node): node is HTMLElement =>
        node instanceof HTMLElement && !isGhost(node) && node.tagName !== 'INPUT'
    const gap = () => parseFloat(getComputedStyle(container).columnGap) || 0
    const rowCenter = (element: HTMLElement) => element.offsetTop + element.offsetHeight / 2
    const inputRow = () => {
        const input = container.querySelector('input')
        return input ? rowCenter(input) : 0
    }

    let boxes = new Map<Element, ChipBox>()
    let lastInputRow = 0
    const remember = () => {
        boxes = new Map()
        Array.from(container.children).forEach((child) => {
            if (isChip(child)) {
                boxes.set(child, {
                    left: child.offsetLeft,
                    top: child.offsetTop,
                    width: child.offsetWidth,
                    height: child.offsetHeight,
                })
            }
        })
        lastInputRow = inputRow()
    }

    const ghostOf = (chip: HTMLElement): HTMLElement => {
        const ghost = chip.cloneNode(true) as HTMLElement
        ghost.dataset.leaving = ''
        ghost.setAttribute('aria-hidden', 'true')
        ghost.setAttribute('inert', '')
        ghost.style.pointerEvents = 'none'
        return ghost
    }

    const shrinkInRow = (chip: HTMLElement, nextSibling: Node | null) => {
        const ghost = ghostOf(chip)
        container.insertBefore(ghost, nextSibling?.parentNode === container ? nextSibling : null)
        const exit = ghost.animate([openChip(ghost), collapsedChip(gap())], {
            duration: CHIP_EXIT_MS,
            easing: chipMotionEasing,
        })
        clipWhileAnimating(ghost, exit, () => ghost.remove())
    }

    const clipAwayInPlace = (chip: HTMLElement, box: ChipBox) => {
        const ghost = ghostOf(chip)
        Object.assign(ghost.style, {
            position: 'absolute',
            left: `${box.left}px`,
            top: `${box.top}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
            margin: '0',
        })
        container.appendChild(ghost)
        const exit = ghost.animate(
            [
                { clipPath: fullyShown, opacity: 1 },
                { clipPath: hiddenToRight, opacity: 0 },
            ],
            { duration: CHIP_EXIT_MS, easing: chipMotionEasing }
        )
        exit.onfinish = () => ghost.remove()
    }

    const growInRow = (chip: HTMLElement) => {
        const enter = chip.animate([collapsedChip(gap()), openChip(chip)], {
            duration: CHIP_ENTER_MS,
            easing: chipMotionEasing,
        })
        clipWhileAnimating(chip, enter)
    }

    const revealInPlace = (chip: HTMLElement) => {
        chip.animate(
            [
                { clipPath: hiddenToRight, opacity: 0 },
                { clipPath: fullyShown, opacity: 1 },
            ],
            { duration: CHIP_ENTER_MS, easing: chipMotionEasing }
        )
    }

    const observer = new MutationObserver((records) => {
        const removed: { chip: HTMLElement; nextSibling: Node | null; box?: ChipBox }[] = []
        const added: HTMLElement[] = []
        records.forEach((record) => {
            record.removedNodes.forEach((node) => {
                if (isChip(node)) removed.push({ chip: node, nextSibling: record.nextSibling, box: boxes.get(node) })
            })
            record.addedNodes.forEach((node) => {
                if (isChip(node)) added.push(node)
            })
        })
        if (!removed.length && !added.length) return
        const previousInputRow = lastInputRow
        const rowsChanged = Math.abs(inputRow() - previousInputRow) > 1
        const landsOnNewRow = added.some((chip) => Math.abs(rowCenter(chip) - previousInputRow) > 1)
        remember()
        if (prefersReducedMotion()) return
        removed.forEach(({ chip, nextSibling, box }) => {
            if (rowsChanged && box) clipAwayInPlace(chip, box)
            else shrinkInRow(chip, nextSibling)
        })
        added.forEach((chip) => {
            if (rowsChanged || landsOnNewRow) revealInPlace(chip)
            else growInRow(chip)
        })
    })

    remember()
    observer.observe(container, { childList: true })
    const resizeObserver = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(remember)
    resizeObserver?.observe(container)
    return () => {
        observer.disconnect()
        resizeObserver?.disconnect()
    }
}

const Chips = React.forwardRef<HTMLDivElement, Omit<BaseCombobox.Chips.Props, 'size'>>(function ComboboxChips(
    { className, ...props },
    ref
) {
    const size = React.useContext(SizeContext)
    const stopAnimating = React.useRef<() => void>()
    const setRef = React.useCallback(
        (element: HTMLDivElement | null) => {
            stopAnimating.current?.()
            stopAnimating.current = element ? animateChipChanges(element) : undefined
            assignRef(ref, element)
        },
        [ref]
    )
    return (
        <BaseCombobox.Chips
            ref={setRef}
            className={mergeClassName(
                `relative flex min-w-0 flex-1 flex-wrap items-center gap-1 self-stretch ${fieldChipsSizes[size]}`,
                className
            )}
            {...props}
        />
    )
})

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
