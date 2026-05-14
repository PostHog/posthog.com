import React from 'react'

export default function QASwarmIcon({ className = '' }: { className?: string }): JSX.Element {
    return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
            <path
                d="M15.5 15.5 22 22l8.5-8.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 28.5 6 32.5l8.5 8.5L31 24.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M33 36.5 29 40.5l8.5 8.5L54 32.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M44 10.5v4M44 20.5v4M40 18.5h4M48 18.5h4"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
            />
            <path
                d="M53.5 18.5v2M53.5 24.5v2M50.5 23.5h2M56.5 23.5h2"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    )
}
