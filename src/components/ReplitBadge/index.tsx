import React from 'react'

interface ReplitBadgeProps {
    mcpConfig: string
}

export const ReplitBadge: React.FC<ReplitBadgeProps> = ({ mcpConfig }) => {
    const url = `https://replit.com/integrations?mcp=${mcpConfig}`
    const badgeUrl = 'https://replit.com/badge?caption=Add%20to%20Replit'

    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={badgeUrl} alt="Add to Replit" style={{ cursor: 'pointer' }} />
        </a>
    )
}

export default ReplitBadge
