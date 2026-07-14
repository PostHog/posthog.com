import React from 'react'
import { IconFilter, IconSparkles } from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'
import type { SpotlightAction } from './actions'
import { configForType } from './categories'
import type { SuggestionItem } from './types'
import SpotlightRow, { spotlightOptionId } from './SpotlightRow'

type SuggestionListProps = {
    items: SuggestionItem[]
    query: string
    selectedIndex: number
    itemRefs: React.MutableRefObject<(HTMLLIElement | null)[]>
    onSelectIndex: (index: number) => void
    onRunAction: (action: SpotlightAction) => void
    onAskAI: () => void
    onApplyFilter: (type: string) => void
}

const hintClass = 'ml-auto hidden shrink-0 text-xs text-secondary @md:block'

const SuggestionHint = ({ action }: { action: string }): JSX.Element => (
    <span className={hintClass}>
        <KeyboardShortcut text="↵" size="xs" /> to {action}
    </span>
)

export default function SuggestionList({
    items,
    query,
    selectedIndex,
    itemRefs,
    onSelectIndex,
    onRunAction,
    onAskAI,
    onApplyFilter,
}: SuggestionListProps): JSX.Element | null {
    if (items.length === 0) return null

    return (
        <ul role="presentation" className="p-0 m-0 list-none">
            {items.map((item, index) => {
                const rowProps = {
                    id: spotlightOptionId('result', index),
                    ref: (element: HTMLLIElement | null) => (itemRefs.current[index] = element),
                    selected: selectedIndex === index,
                    onActive: () => onSelectIndex(index),
                }

                if (item.kind === 'action') {
                    return (
                        <SpotlightRow
                            key={item.action.id}
                            {...rowProps}
                            icon={item.action.icon}
                            onSelect={() => onRunAction(item.action)}
                            trailing={<SuggestionHint action="run" />}
                        >
                            <p className="m-0 min-w-0 truncate text-[15px] text-primary">{item.action.label}</p>
                        </SpotlightRow>
                    )
                }

                if (item.kind === 'ask-ai') {
                    return (
                        <SpotlightRow
                            key="ask-ai"
                            {...rowProps}
                            icon={<IconSparkles />}
                            onSelect={onAskAI}
                            trailing={<SuggestionHint action="ask" />}
                        >
                            <p className="m-0 min-w-0 truncate text-[15px] text-primary">
                                Ask AI: <span className="font-semibold">&ldquo;{query}&rdquo;</span>
                            </p>
                        </SpotlightRow>
                    )
                }

                const config = configForType(item.type)
                return (
                    <SpotlightRow
                        key="filter"
                        {...rowProps}
                        icon={<IconFilter />}
                        onSelect={() => onApplyFilter(item.type)}
                        trailing={<SuggestionHint action="filter" />}
                    >
                        <p className="m-0 flex items-center gap-1.5 text-[15px] text-primary">
                            Filter by category:
                            <span className="flex items-center gap-1 rounded-md border border-primary bg-accent px-1.5 py-0.5 text-sm font-semibold text-secondary [&_svg]:size-3.5">
                                {config.icon}
                                {config.label}
                            </span>
                        </p>
                    </SpotlightRow>
                )
            })}
        </ul>
    )
}
