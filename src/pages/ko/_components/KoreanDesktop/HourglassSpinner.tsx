import React from 'react'

export default function HourglassSpinner({ className = '' }: { className?: string }) {
    return (
        <svg
            className={`hourglass-spinner ${className}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <style>
                {`
                    .hourglass-spinner {
                        animation: hourglass-flip 2.4s ease-in-out infinite;
                    }

                    @keyframes hourglass-flip {
                        0%, 40% {
                            transform: rotate(0deg);
                        }
                        48%, 90% {
                            transform: rotate(180deg);
                        }
                        98%, 100% {
                            transform: rotate(360deg);
                        }
                    }

                    .sand-top {
                        transform-origin: center bottom;
                        animation: sand-drain-top 2.4s ease-in-out infinite;
                    }

                    .sand-bottom {
                        transform-origin: center top;
                        animation: sand-drain-bottom 2.4s ease-in-out infinite;
                    }

                    @keyframes sand-drain-top {
                        0% {
                            transform: scaleY(1);
                            opacity: 0.6;
                        }
                        40% {
                            transform: scaleY(0);
                            opacity: 0;
                        }
                        48%, 100% {
                            transform: scaleY(0);
                            opacity: 0;
                        }
                    }

                    @keyframes sand-drain-bottom {
                        0%, 48% {
                            transform: scaleY(0);
                            opacity: 0;
                        }
                        50% {
                            transform: scaleY(1);
                            opacity: 0.6;
                        }
                        90% {
                            transform: scaleY(0);
                            opacity: 0;
                        }
                        100% {
                            transform: scaleY(0);
                            opacity: 0;
                        }
                    }
                `}
            </style>
            {/* Hourglass outline */}
            <path
                d="M6 2h12M6 22h12M18 2v3.5c0 1.5-1 2.5-2.5 4L12 13l-3.5-3.5C7 8 6 7 6 5.5V2M18 22v-3.5c0-1.5-1-2.5-2.5-4L12 11l-3.5 3.5C7 16 6 17 6 18.5V22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Top sand - triangle filling top chamber */}
            <path className="sand-top" d="M8 4 L16 4 L14.5 7 L9.5 7 Z" fill="currentColor" opacity="0.6" />
            {/* Bottom sand - triangle filling bottom chamber */}
            <path className="sand-bottom" d="M8 20 L16 20 L14.5 17 L9.5 17 Z" fill="currentColor" opacity="0.6" />
        </svg>
    )
}
