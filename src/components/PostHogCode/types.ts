import React from 'react'

export interface ConversationItem {
    type: 'user' | 'agent' | 'tool' | 'think' | 'loading'
    content?: React.ReactNode
    toolName?: string
    toolDetail?: string
    expanded?: React.ReactNode
}

export interface Section {
    id: string
    title: string
    icon?: React.ComponentType<{ className?: string }>
    conversation: ConversationItem[]
}
