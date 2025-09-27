import React from 'react'
import * as Icons from '@posthog/icons'

const typeStyles = {
    action: 'bg-yellow/15 border-yellow',
    fyi: 'bg-accent border-primary',
    caution: 'bg-red/15 border-red',
}

export const CalloutBox = ({ icon, title, type, children }) => {
    const Icon = Icons[icon] || Icons.IconInfo
    const styles = typeStyles[type] || typeStyles.action

    return (
        <div className={`ph-callout mt-4 mb-6 p-4 border rounded ${styles}`}>
            <div className="flex items-center gap-2 mb-0.5">
                {Icon && (
                    <div className="shrink-0 opacity-75">
                        <Icon className="size-6" />
                    </div>
                )}
                <strong className="text-lg">{title}</strong>
            </div>
            <div className="ph-text pl-8 text-[15px] [&_p]:text-[15px] [&_*]:text-[15px] [&>*:last-child]:mb-0 !leading-relaxed">
                {children}
            </div>
        </div>
    )
}

export default CalloutBox
