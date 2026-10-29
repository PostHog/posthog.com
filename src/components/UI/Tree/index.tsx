import React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { IconChevronRight, IconDocument, IconFolder, IconFolderOpen } from '@posthog/icons'
import SiteLink from 'components/Link'
import { cn } from '../../../utils'
import { Checkbox } from '../Checkbox'
import { Collapsible } from '../Collapsible'
import { disclosureChevron, fieldListItemSizes, flatPressable, heightRevealPanel, insetFocusRing } from '../styles'
import type { FieldSize } from '../styles'

type NoData = Record<never, never>

export type TreeNode<Data extends NoData = NoData> = Data & {
    id: string
    label: React.ReactNode
    icon?: React.ReactNode
    textValue?: string
    disabled?: boolean
    children?: TreeNode<Data>[]
}

export type TreeSelectionMode = 'none' | 'single' | 'multiple'

export type TreeSize = FieldSize

export type TreeItemState = {
    level: number
    expanded: boolean
    selected: boolean
    hasChildren: boolean
    disabled: boolean
    size: TreeSize
}

export type TreeRowProps = React.HTMLAttributes<HTMLElement> & {
    'data-tree-id': string
    children: React.ReactNode
}

export type TreeProps<Data extends NoData = NoData> = {
    items: TreeNode<Data>[]
    size?: TreeSize
    expanded?: string[]
    defaultExpanded?: string[]
    onExpandedChange?: (ids: string[]) => void
    selectionMode?: TreeSelectionMode
    selected?: string[]
    defaultSelected?: string[]
    onSelectedChange?: (ids: string[]) => void
    onAction?: (item: TreeNode<Data>) => void
    renderItem?: (item: TreeNode<Data>, state: TreeItemState) => React.ReactNode
    renderRow?: (item: TreeNode<Data>, props: TreeRowProps, state: TreeItemState) => React.ReactElement
    className?: string
} & Pick<React.AriaAttributes, 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-multiselectable'>

type VisibleNode = {
    item: TreeNode
    parentId?: string
    siblings: TreeNode[]
}

type TreeContextValue = {
    expandedIds: Set<string>
    selectedIds: Set<string>
    tabbableId?: string
    selectionMode: TreeSelectionMode
    size: TreeSize
    renderItem?: (item: TreeNode, state: TreeItemState) => React.ReactNode
    renderRow: (item: TreeNode, props: TreeRowProps, state: TreeItemState) => React.ReactElement
    activate: (item: TreeNode) => void
    toggleOpen: (item: TreeNode) => void
    focusRow: (id: string) => void
    setFocusedId: (id: string) => void
}

const TYPEAHEAD_RESET_MS = 500

const ANIMATED_GROUP_MAX_SIZE = 100

const TreeContext = React.createContext<TreeContextValue | null>(null)

function useTreeContext(): TreeContextValue {
    const context = React.useContext(TreeContext)
    if (!context) throw new Error('TreeLevel must be rendered inside Tree')
    return context
}

const hasChildren = (item: TreeNode): boolean => Boolean(item.children?.length)

const textOf = (item: TreeNode): string =>
    (item.textValue ?? (typeof item.label === 'string' ? item.label : '')).toLowerCase()

function collectVisibleNodes(
    items: TreeNode[],
    expanded: Set<string>,
    parentId?: string,
    nodes: VisibleNode[] = []
): VisibleNode[] {
    items.forEach((item) => {
        nodes.push({ item, parentId, siblings: items })
        if (hasChildren(item) && expanded.has(item.id)) {
            collectVisibleNodes(item.children ?? [], expanded, item.id, nodes)
        }
    })
    return nodes
}

function nearestSurvivingRow(
    previous: VisibleNode[],
    lostId: string,
    isVisible: (id: string) => boolean
): string | undefined {
    const previousById = new Map(previous.map((node) => [node.item.id, node]))
    for (let parentId = previousById.get(lostId)?.parentId; parentId; ) {
        if (isVisible(parentId)) return parentId
        parentId = previousById.get(parentId)?.parentId
    }
    const lostIndex = previous.findIndex((node) => node.item.id === lostId)
    const before = previous.slice(0, Math.max(lostIndex, 0)).reverse()
    return before.find((node) => isVisible(node.item.id))?.item.id
}

function ancestorIdsOf(items: TreeNode[], targetId: string, path: string[] = []): string[] | undefined {
    for (const item of items) {
        if (item.id === targetId) return path
        const found = item.children && ancestorIdsOf(item.children, targetId, [...path, item.id])
        if (found) return found
    }
    return undefined
}

function useControllableState<Value>(
    value: Value | undefined,
    defaultValue: Value,
    onChange?: (value: Value) => void
): [Value, (value: Value) => void] {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const isControlled = value !== undefined
    const setValue = React.useCallback(
        (next: Value) => {
            if (!isControlled) setUncontrolledValue(next)
            onChange?.(next)
        },
        [isControlled, onChange]
    )
    return [isControlled ? value : uncontrolledValue, setValue]
}

const treeSizes = {
    sm: {
        root: '[--tree-indent:14px] [--tree-icon:14px]',
        row: 'gap-1 py-0.5',
        icon: 'size-3.5',
        iconSlot: '[&>svg]:size-3.5',
    },
    md: {
        root: '[--tree-indent:16px] [--tree-icon:16px]',
        row: 'gap-1.5 py-1',
        icon: 'size-4',
        iconSlot: '[&>svg]:size-4',
    },
    lg: {
        root: '[--tree-indent:20px] [--tree-icon:20px]',
        row: 'gap-2 py-1',
        icon: 'size-5',
        iconSlot: '[&>svg]:size-5',
    },
} as const

const treeStack = 'flex flex-col [&>*]:shrink-0'

const treeRow = cn(
    'flex min-w-0 cursor-default select-none items-center rounded pl-1 pr-2 text-left leading-tight text-primary no-underline',
    flatPressable,
    'aria-selected:bg-[rgb(var(--text-primary)/0.1)] aria-selected:font-semibold',
    'aria-[current=page]:bg-[rgb(var(--text-primary)/0.1)] aria-[current=page]:font-semibold',
    'aria-disabled:pointer-events-none aria-disabled:text-muted',
    insetFocusRing
)

const treeGroup = cn(
    heightRevealPanel,
    treeStack,
    "relative before:pointer-events-none before:absolute before:inset-y-0 before:left-[var(--tree-guide-left)] before:w-px before:bg-[rgb(var(--text-primary)/0.12)] before:content-['']"
)

const ROW_START_PADDING = '4px'

const rowIndent = (level: number): React.CSSProperties => ({
    marginLeft: `calc(${level - 1} * var(--tree-indent))`,
})

const guideOffset = (parentLevel: number) =>
    ({
        '--tree-guide-left': `calc(${
            parentLevel - 1
        } * var(--tree-indent) + ${ROW_START_PADDING} + var(--tree-icon) / 2)`,
    } as React.CSSProperties)

function TreeItemLabel({
    icon,
    size,
    children,
}: {
    icon?: React.ReactNode
    size: TreeSize
    children: React.ReactNode
}): JSX.Element {
    return (
        <>
            {icon && (
                <span aria-hidden className={cn('flex shrink-0 text-secondary', treeSizes[size].iconSlot)}>
                    {icon}
                </span>
            )}
            <span className="min-w-0 truncate">{children}</span>
        </>
    )
}

const renderDefaultRow = (_item: TreeNode, props: TreeRowProps): React.ReactElement => <div {...props} />

function TreeLevel({ items, level }: { items: TreeNode[]; level: number }): JSX.Element {
    const tree = useTreeContext()
    const sizeClasses = treeSizes[tree.size]

    return (
        <>
            {items.map((item, index) => {
                const isBranch = hasChildren(item)
                const state: TreeItemState = {
                    level,
                    expanded: isBranch && tree.expandedIds.has(item.id),
                    selected: tree.selectedIds.has(item.id),
                    hasChildren: isBranch,
                    disabled: Boolean(item.disabled),
                    size: tree.size,
                }
                const chevron = isBranch ? (
                    <IconChevronRight
                        aria-hidden
                        className={cn(disclosureChevron, sizeClasses.icon, state.expanded && 'rotate-90')}
                        onClick={(event: React.MouseEvent) => {
                            event.preventDefault()
                            event.stopPropagation()
                            tree.toggleOpen(item)
                            tree.focusRow(item.id)
                        }}
                    />
                ) : (
                    <span aria-hidden className={cn('shrink-0', sizeClasses.icon)} />
                )
                const rowProps: TreeRowProps = {
                    role: 'treeitem',
                    'data-tree-id': item.id,
                    'aria-level': level,
                    'aria-posinset': index + 1,
                    'aria-setsize': items.length,
                    'aria-expanded': isBranch ? state.expanded : undefined,
                    'aria-selected': tree.selectionMode === 'none' ? undefined : state.selected,
                    'aria-disabled': state.disabled || undefined,
                    tabIndex: item.id === tree.tabbableId ? 0 : -1,
                    className: cn(treeRow, fieldListItemSizes[tree.size], sizeClasses.row),
                    style: rowIndent(level),
                    onFocus: () => tree.setFocusedId(item.id),
                    onClick: () => {
                        tree.setFocusedId(item.id)
                        tree.activate(item)
                    },
                    children: (
                        <>
                            {chevron}
                            {tree.renderItem ? (
                                tree.renderItem(item, state)
                            ) : (
                                <TreeItemLabel icon={item.icon} size={tree.size}>
                                    {item.label}
                                </TreeItemLabel>
                            )}
                        </>
                    ),
                }
                const row = tree.renderRow(item, rowProps, state)
                if (!isBranch) return <React.Fragment key={item.id}>{row}</React.Fragment>

                const children = item.children ?? []
                return (
                    <Collapsible.Root key={item.id} open={state.expanded} className={treeStack}>
                        {row}
                        <BaseCollapsible.Panel
                            className={cn(treeGroup, children.length > ANIMATED_GROUP_MAX_SIZE && 'transition-none')}
                            style={guideOffset(level)}
                        >
                            <TreeLevel items={children} level={level + 1} />
                        </BaseCollapsible.Panel>
                    </Collapsible.Root>
                )
            })}
        </>
    )
}

export function Tree<Data extends NoData = NoData>({
    items: itemsProp,
    size = 'md',
    expanded: expandedProp,
    defaultExpanded = [],
    onExpandedChange,
    selectionMode = 'none',
    selected: selectedProp,
    defaultSelected = [],
    onSelectedChange,
    onAction,
    renderItem,
    renderRow = renderDefaultRow,
    className,
    ...ariaProps
}: TreeProps<Data>): JSX.Element {
    const items = itemsProp as TreeNode[]
    const [expanded, setExpanded] = useControllableState(expandedProp, defaultExpanded, onExpandedChange)
    const [selected, setSelected] = useControllableState(selectedProp, defaultSelected, onSelectedChange)
    const [focusedId, setFocusedId] = React.useState<string>()
    const rootRef = React.useRef<HTMLDivElement>(null)
    const ownsFocus = React.useRef(false)
    const typeahead = React.useRef({ query: '', resetAt: 0 })

    const expandedIds = React.useMemo(() => new Set(expanded), [expanded])
    const selectedIds = React.useMemo(() => new Set(selected), [selected])
    const nodes = React.useMemo(() => collectVisibleNodes(items, expandedIds), [items, expandedIds])
    const previousNodes = React.useRef(nodes)
    const isVisible = (id: string) => nodes.some((node) => node.item.id === id)

    const tabbableId =
        (focusedId && isVisible(focusedId) ? focusedId : undefined) ??
        nodes.find((node) => selectedIds.has(node.item.id))?.item.id ??
        nodes[0]?.item.id

    const focusRow = (id: string) => {
        setFocusedId(id)
        rootRef.current?.querySelector<HTMLElement>(`[data-tree-id="${CSS.escape(id)}"]`)?.focus()
    }

    React.useEffect(() => {
        const releaseFocusOnOutsidePointer = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) ownsFocus.current = false
        }
        document.addEventListener('pointerdown', releaseFocusOnOutsidePointer)
        return () => document.removeEventListener('pointerdown', releaseFocusOnOutsidePointer)
    }, [])

    React.useEffect(() => {
        const previous = previousNodes.current
        previousNodes.current = nodes
        const root = rootRef.current
        if (!root || !focusedId || !ownsFocus.current || isVisible(focusedId)) return
        const active = document.activeElement
        if (active !== document.body && !root.contains(active)) return
        const target = nearestSurvivingRow(previous, focusedId, isVisible) ?? nodes[0]?.item.id
        if (target) focusRow(target)
    }, [nodes])

    const setOpen = (targets: TreeNode[], open: boolean) => {
        const next = new Set(expandedIds)
        targets
            .filter((item) => !item.disabled && hasChildren(item))
            .forEach((item) => (open ? next.add(item.id) : next.delete(item.id)))
        setExpanded(Array.from(next))
    }

    const toggleOpen = (item: TreeNode) => setOpen([item], !expandedIds.has(item.id))

    const activate = (item: TreeNode) => {
        if (item.disabled) return
        if (selectionMode === 'single') setSelected([item.id])
        if (selectionMode === 'multiple') {
            setSelected(selectedIds.has(item.id) ? selected.filter((id) => id !== item.id) : [...selected, item.id])
        }
        if (onAction) onAction(item as TreeNode<Data>)
        else if (selectionMode === 'none') toggleOpen(item)
    }

    const focusByTypeahead = (character: string, fromIndex: number) => {
        const now = Date.now()
        const isNewQuery = now > typeahead.current.resetAt
        typeahead.current = {
            query: (isNewQuery ? '' : typeahead.current.query) + character.toLowerCase(),
            resetAt: now + TYPEAHEAD_RESET_MS,
        }
        const { query } = typeahead.current
        const ordered = [...nodes.slice(fromIndex + 1), ...nodes.slice(0, fromIndex + 1)]
        const match = ordered.find((node) => textOf(node.item).startsWith(query))
        if (match) focusRow(match.item.id)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const rowId = (event.target as HTMLElement).closest('[data-tree-id]')?.getAttribute('data-tree-id')
        const index = nodes.findIndex((node) => node.item.id === rowId)
        if (index < 0 || event.altKey || event.ctrlKey || event.metaKey) return
        const node = nodes[index]
        const isBranch = hasChildren(node.item)
        const isOpen = expandedIds.has(node.item.id)
        const focusIndex = (target: number) => nodes[target] && focusRow(nodes[target].item.id)

        switch (event.key) {
            case 'ArrowDown':
                focusIndex(index + 1)
                break
            case 'ArrowUp':
                focusIndex(index - 1)
                break
            case 'Home':
                focusIndex(0)
                break
            case 'End':
                focusIndex(nodes.length - 1)
                break
            case 'ArrowRight':
                if (isBranch && !isOpen) setOpen([node.item], true)
                else if (isBranch) focusIndex(index + 1)
                break
            case 'ArrowLeft':
                if (isBranch && isOpen) setOpen([node.item], false)
                else if (node.parentId) focusRow(node.parentId)
                break
            case '*':
                setOpen(node.siblings, true)
                break
            case 'Enter':
                if ((event.target as HTMLElement).tagName === 'A') return
                activate(node.item)
                break
            case ' ':
                activate(node.item)
                break
            default:
                if (event.key.length !== 1) return
                focusByTypeahead(event.key, index)
        }
        event.preventDefault()
    }

    const context: TreeContextValue = {
        expandedIds,
        selectedIds,
        tabbableId,
        selectionMode,
        size,
        renderItem: renderItem as TreeContextValue['renderItem'],
        renderRow: renderRow as TreeContextValue['renderRow'],
        activate,
        toggleOpen,
        focusRow,
        setFocusedId,
    }

    return (
        <TreeContext.Provider value={context}>
            <div
                ref={rootRef}
                role="tree"
                aria-multiselectable={selectionMode === 'multiple' || undefined}
                className={cn(treeStack, treeSizes[size].root, className)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                    ownsFocus.current = true
                }}
                onBlur={(event) => {
                    const next = event.relatedTarget
                    if (next && !event.currentTarget.contains(next)) ownsFocus.current = false
                }}
                {...ariaProps}
            >
                <TreeLevel items={items} level={1} />
            </div>
        </TreeContext.Provider>
    )
}

type CheckState = { checked: boolean; indeterminate: boolean; leafIds: string[] }

function collectCheckStates(items: TreeNode[], checkedIds: Set<string>, strict: boolean): Map<string, CheckState> {
    const states = new Map<string, CheckState>()
    const visit = (item: TreeNode): string[] => {
        if (!hasChildren(item)) {
            const leafIds = item.disabled ? [] : [item.id]
            states.set(item.id, { checked: checkedIds.has(item.id), indeterminate: false, leafIds })
            return leafIds
        }
        if (strict) {
            item.children?.forEach(visit)
            states.set(item.id, { checked: checkedIds.has(item.id), indeterminate: false, leafIds: [] })
            return []
        }
        const leafIds = (item.children ?? []).flatMap(visit)
        const checkedCount = leafIds.filter((id) => checkedIds.has(id)).length
        const allChecked = leafIds.length > 0 && checkedCount === leafIds.length
        states.set(item.id, { checked: allChecked, indeterminate: checkedCount > 0 && !allChecked, leafIds })
        return leafIds
    }
    items.forEach(visit)
    return states
}

const checkboxSizes: Record<TreeSize, string> = { sm: 'size-3.5', md: 'size-4', lg: 'size-5' }

export type CheckboxTreeProps<Data extends NoData = NoData> = Omit<
    TreeProps<Data>,
    'selectionMode' | 'selected' | 'defaultSelected' | 'onSelectedChange' | 'onAction' | 'renderRow'
> & {
    checked?: string[]
    defaultChecked?: string[]
    onCheckedChange?: (ids: string[]) => void
    strict?: boolean
}

export function CheckboxTree<Data extends NoData = NoData>({
    checked: checkedProp,
    defaultChecked = [],
    onCheckedChange,
    strict = false,
    renderItem,
    ...treeProps
}: CheckboxTreeProps<Data>): JSX.Element {
    const [checked, setChecked] = useControllableState(checkedProp, defaultChecked, onCheckedChange)
    const checkStates = React.useMemo(
        () => collectCheckStates(treeProps.items as TreeNode[], new Set(checked), strict),
        [treeProps.items, checked, strict]
    )
    const checkedRowIds = React.useMemo(
        () =>
            Array.from(checkStates)
                .filter(([, state]) => state.checked)
                .map(([id]) => id),
        [checkStates]
    )
    const checkStateOf = (item: TreeNode<Data>): CheckState =>
        checkStates.get(item.id) ?? { checked: false, indeterminate: false, leafIds: [] }

    const toggleChecked = (item: TreeNode<Data>) => {
        const state = checkStateOf(item)
        const affected = strict || !hasChildren(item) ? [item.id] : state.leafIds
        const next = new Set(checked)
        affected.forEach((id) => (state.checked ? next.delete(id) : next.add(id)))
        setChecked(Array.from(next))
    }

    return (
        <Tree<Data>
            aria-multiselectable
            {...treeProps}
            selected={checkedRowIds}
            onAction={toggleChecked}
            renderItem={(item, state) => {
                const { checked: isChecked, indeterminate } = checkStateOf(item)
                return (
                    <>
                        <Checkbox.Mark
                            checked={isChecked}
                            indeterminate={indeterminate}
                            disabled={state.disabled}
                            className={checkboxSizes[state.size]}
                        />
                        {renderItem ? (
                            renderItem(item, state)
                        ) : (
                            <TreeItemLabel icon={item.icon} size={state.size}>
                                {item.label}
                            </TreeItemLabel>
                        )}
                    </>
                )
            }}
            renderRow={(item, props) => {
                const { checked: isChecked, indeterminate } = checkStateOf(item)
                return <div {...props} aria-checked={indeterminate ? 'mixed' : isChecked} />
            }}
        />
    )
}

export type FileTreeData = {
    href?: string
}

export type FileTreeNode = TreeNode<FileTreeData>

export type FileTreeProps = Omit<
    TreeProps<FileTreeData>,
    'renderRow' | 'selectionMode' | 'selected' | 'defaultSelected' | 'onSelectedChange'
> & {
    currentId?: string
}

function fileIconOf(item: FileTreeNode, state: TreeItemState): React.ReactNode {
    if (item.icon) return item.icon
    if (!state.hasChildren) return <IconDocument />
    return state.expanded ? <IconFolderOpen /> : <IconFolder />
}

export function FileTree({
    currentId,
    defaultExpanded = [],
    renderItem,
    items,
    ...treeProps
}: FileTreeProps): JSX.Element {
    const [initialExpanded] = React.useState(() => {
        const currentAncestors = currentId ? ancestorIdsOf(items as TreeNode[], currentId) ?? [] : []
        return Array.from(new Set([...defaultExpanded, ...currentAncestors]))
    })

    return (
        <Tree<FileTreeData>
            {...treeProps}
            items={items}
            defaultExpanded={initialExpanded}
            selected={currentId ? [currentId] : []}
            renderItem={(item, state) => (
                <TreeItemLabel icon={fileIconOf(item, state)} size={state.size}>
                    {renderItem ? renderItem(item, state) : item.label}
                </TreeItemLabel>
            )}
            renderRow={(item, props) => {
                const current = item.id === currentId ? 'page' : undefined
                return item.href && !item.disabled ? (
                    <SiteLink {...props} to={item.href} contextMenu={false} aria-current={current} />
                ) : (
                    <div {...props} aria-current={current} />
                )
            }}
        />
    )
}
