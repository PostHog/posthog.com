import React from 'react'
import { CallToAction } from 'components/CallToAction'

interface ReplitBadgeProps {
    mcpConfig: string
}

const ReplitIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
    >
        <path
            d="M7 5.5C7 4.67157 7.67157 4 8.5 4H15.5C16.3284 4 17 4.67157 17 5.5V12H8.5C7.67157 12 7 11.3284 7 10.5V5.5Z"
            fill="currentColor"
        />
        <path
            d="M17 12H25.5C26.3284 12 27 12.6716 27 13.5V18.5C27 19.3284 26.3284 20 25.5 20H17V12Z"
            fill="currentColor"
        />
        <path d="M7 21.5C7 20.6716 7.67157 20 8.5 20H17V28H8.5C7.67157 28 7 27.3284 7 26.5V21.5Z" fill="currentColor" />
    </svg>
)

export const ReplitBadge: React.FC<ReplitBadgeProps> = ({ mcpConfig }) => {
    const url = `https://replit.com/integrations?mcp=${mcpConfig}`

    return (
        <CallToAction href={url} type="secondary" size="md" externalNoIcon>
            <span className="inline-flex items-center gap-2">
                <ReplitIcon />
                Add PostHog to Replit
            </span>
        </CallToAction>
    )
}

export default ReplitBadge
