import React from 'react'

export default function QASwarmIcon({ className = '' }: { className?: string }): JSX.Element {
    return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
            <path
                d="M23 16 35 28 60 3"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 39h8l10-10 10 10h8"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5 60 17 72 42 47"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M35 55 47 67 72 42"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M60 17c1.3 0 2.2-.9 2.6-2.7.5 1.8 1.4 2.7 2.7 2.7-1.3 0-2.2.9-2.7 2.7-.4-1.8-1.3-2.7-2.6-2.7Z"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M68 24c.9 0 1.6-.7 1.9-2 .3 1.3 1 2 1.9 2-.9 0-1.6.7-1.9 2-.3-1.3-1-2-1.9-2Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
