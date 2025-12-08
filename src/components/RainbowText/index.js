import React from 'react'

export const RainbowText = ({ children }) => (
    <span
        className="inline-block bg-clip-text text-transparent font-bold"
        style={{
            background:
                'linear-gradient(to right, rgb(239, 68, 68), rgb(234, 179, 8), rgb(34, 197, 94), rgb(59, 130, 246), rgb(168, 85, 247))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        }}
    >
        {children}
    </span>
)
