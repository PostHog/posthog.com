import React from 'react'

export type SortValue = 'recent' | 'popular'

const options: { value: SortValue; label: string }[] = [
    { value: 'recent', label: 'Recent' },
    { value: 'popular', label: 'Popular' },
]

/**
 * A small segmented control for switching a feed between most recent and most popular.
 * Keyboard-accessible (native buttons) with `aria-pressed` reflecting the active option.
 */
export default function SortToggle({ value, onChange }: { value: SortValue; onChange: (v: SortValue) => void }) {
    return (
        <div
            className="inline-flex rounded-md border border-primary p-0.5 bg-accent"
            role="group"
            aria-label="Sort posts"
        >
            {options.map((option) => {
                const active = option.value === value
                return (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onChange(option.value)}
                        className={`px-3 py-1 text-sm rounded font-medium transition-colors ${
                            active
                                ? 'bg-primary text-primary border border-primary'
                                : 'text-secondary hover:text-primary'
                        }`}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}
