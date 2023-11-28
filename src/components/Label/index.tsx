import React from 'react'

export default function Label({
    text,
    className,
    size = 'small',
}: {
    text: string
    className?: string
    size?: 'small' | 'medium' | 'large'
}): JSX.Element {
    const sizeClasses = size === 'large' ? 'text-base px-2' : size === 'medium' ? 'text-sm px-1' : 'text-xs px-1'
    return (
        <span
            className={`text-primary/75 dark:text-primary-dark/60 dark:bg-gray-accent-dark
                !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50 
                m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block ${sizeClasses} ${className}`}
        >
            {text}
        </span>
    )
}
