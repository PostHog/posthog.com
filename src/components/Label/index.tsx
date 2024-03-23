import React from 'react'

export default function Label({
    text,
    className,
    size = 'small',
    style = 'blue',
}: {
    text: string
    className?: string
    size?: 'small' | 'medium' | 'large'
    style?: 'blue' | 'orangeNoBg'
}): JSX.Element {
    const sizeClasses = size === 'large' ? 'text-base px-2' : size === 'medium' ? 'text-sm px-1' : 'text-xs px-1'
    const styleClasses =
        style === 'blue'
            ? 'text-primary/75 dark:text-primary-dark/60 dark:bg-gray-accent-dark !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50'
            : 'text-primary/75 dark:text-primary-dark/60 text-red dark:text-orange'
    return (
        <span
            className={`${styleClasses} m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block ${sizeClasses} ${className}`}
        >
            {text}
        </span>
    )
}
