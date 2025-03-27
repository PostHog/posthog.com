import React from 'react'
import * as Icons from '@posthog/icons'

const typeStyles = {
    action: 'bg-yellow/15 border-none',
    fyi: 'bg-gray/10 border-none',
    caution: 'bg-red/15 border-none',
}

export const CalloutBox = ({ icon = 'IconInfo', title, type = 'fyi', children }) => {
    const Icon = Icons[icon]
    const styles = typeStyles[type] || typeStyles.action

    return (
        <div className={`ph-callout my-4 mb-8 p-4 border rounded-lg ${styles}`}>
            <div>
                <div className="flex items-center gap-2 mb-2">
                    {Icon && <Icon className="w-5 h-5 shrink-0" />}
                    <strong>{title}</strong>
                </div>
                <div className="pl-7 [&>*:last-child]:mb-0 [&_p]">{children}</div>
            </div>
        </div>
    )
}

export default CalloutBox
