import React from 'react'
import * as Icons from '@posthog/icons'

// Topics store the export name of a @posthog/icons icon. An unknown or empty name falls back to a chat bubble.
export const iconNames = Object.keys(Icons).filter((name) => name.startsWith('Icon'))

export default function TopicIcon({ icon, className = 'size-4' }: { icon?: string | null; className?: string }) {
    const Icon =
        (icon && (Icons[icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>)) ||
        Icons.IconMessage
    return <Icon className={`shrink-0 ${className}`} />
}
