import React from 'react'

export default function KeyboardShortcut({
    text,
    className,
    size = 'md',
}: {
    text: string | React.ReactNode
    className?: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
}): JSX.Element {
    const sizeClasses =
        size === 'lg'
            ? 'text-base py-1 ml-0'
            : size === 'md'
                ? 'text-sm py-0.5 ml-1'
                : size === 'sm'
                    ? 'text-xs py-[2px] ml-0.5'
                    : 'text-[11px] py-0.5 ml-0.5'
    return (
        <kbd
            className={`border border-b-2 border-input rounded-sm px-1 leading-none text-secondary font-code ${sizeClasses} ${className}`}
        >
            {typeof text === 'string' ? text : text}
        </kbd>
    )
}
