import React from 'react'

export default function Label({ text, className }: { text: string; className?: string }): JSX.Element {
    return (
        <span
            className={`text-primary/75 dark:text-primary-dark/60 dark:bg-gray-accent-dark text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50 ${className}`}
        >
            {text}
        </span>
    )
}
