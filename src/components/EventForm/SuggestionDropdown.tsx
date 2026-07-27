import React from 'react'

export type SuggestionItem = {
    id: string
    label: string
    sublabel?: string
}

type SuggestionDropdownProps = {
    id: string
    items: SuggestionItem[]
    highlightIndex: number
    onHighlight: (index: number) => void
    onSelect: (index: number) => void
}

// Absolutely-positioned listbox rendered inside a `relative` wrapper around an
// input. Keyboard navigation stays with the input that owns the dropdown.
export default function SuggestionDropdown({
    id,
    items,
    highlightIndex,
    onHighlight,
    onSelect,
}: SuggestionDropdownProps): React.ReactElement | null {
    if (items.length === 0) return null

    return (
        <ul
            id={id}
            role="listbox"
            className="absolute mt-1 max-h-72 w-full overflow-auto rounded border border-primary bg-primary shadow-2xl z-20"
        >
            {items.map((item, idx) => (
                <li
                    key={item.id}
                    role="option"
                    aria-selected={highlightIndex === idx}
                    className={`px-3 py-2 cursor-pointer ${highlightIndex === idx ? 'bg-accent' : ''}`}
                    onMouseEnter={() => onHighlight(idx)}
                    onMouseLeave={() => onHighlight(-1)}
                    onClick={() => onSelect(idx)}
                    title={item.sublabel || item.label}
                >
                    <div className="text-sm font-semibold text-primary">{item.label}</div>
                    {item.sublabel && <div className="text-xs text-secondary mt-0.5">{item.sublabel}</div>}
                </li>
            ))}
        </ul>
    )
}
