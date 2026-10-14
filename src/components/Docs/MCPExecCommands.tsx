import React from 'react'
import Markdown from 'components/Markdown'
import mcpToolsData from '../../data/mcp-tools.json'

const MCPExecCommands: React.FC = () => {
    const { execCommands } = mcpToolsData as { execCommands?: string | null }

    if (!execCommands) {
        return null
    }

    return <Markdown>{execCommands}</Markdown>
}

export default MCPExecCommands
