import React from 'react'
import { IconCheck, IconSearch } from '@posthog/icons'
import { configForType } from './categories'
import SpotlightRow, { spotlightOptionId } from './SpotlightRow'

type FilterMenuProps = {
    options: (string | null)[]
    activeFilter: string | null
    selectedIndex: number
    itemRefs: React.MutableRefObject<(HTMLLIElement | null)[]>
    onSelectIndex: (index: number) => void
    onSelect: (type: string | null) => void
}

export default function FilterMenu({
    options,
    activeFilter,
    selectedIndex,
    itemRefs,
    onSelectIndex,
    onSelect,
}: FilterMenuProps): JSX.Element {
    return (
        <ul role="presentation" className="p-0 m-0 list-none">
            {options.length === 0 && (
                <li className="px-2.5 py-4 text-center text-sm text-secondary">No matching categories</li>
            )}
            {options.map((type, index) => {
                const config = type ? configForType(type) : { label: 'All categories', icon: <IconSearch /> }
                return (
                    <SpotlightRow
                        key={type ?? 'all'}
                        id={spotlightOptionId('filter', index)}
                        ref={(element) => (itemRefs.current[index] = element)}
                        selected={index === selectedIndex}
                        icon={config.icon}
                        onActive={() => onSelectIndex(index)}
                        onSelect={() => onSelect(type)}
                        trailing={
                            type === activeFilter ? (
                                <IconCheck className="ml-auto size-4 shrink-0 text-secondary" />
                            ) : undefined
                        }
                    >
                        <p className="m-0 text-[15px] text-primary">{config.label}</p>
                    </SpotlightRow>
                )
            })}
        </ul>
    )
}
