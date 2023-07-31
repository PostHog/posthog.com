import React from 'react'

export default function KeyboardShortcut({
    text,
    className,
    size = 'md',
}: {
    text: string
    className?: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
}): JSX.Element {
    const sizeClasses =
        size === 'lg'
            ? 'text-base py-1'
            : size === 'md'
            ? 'text-sm py-0.5'
            : size === 'sm'
            ? 'text-xs py-1'
            : 'text-[11px] p-0'
    return (
        <kbd
            className={`border border-b-2 border-light dark:border-dark rounded-sm px-1.5 text-primary/50 dark:text-primary-dark/50 bg-accent-light dark:bg-accent-dark font-code ${sizeClasses} ${className}`}
        >
            {text}
        </kbd>
    )
}
