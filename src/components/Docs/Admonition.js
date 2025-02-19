import React from 'react'
import * as Icons from '@posthog/icons'

const typeStyles = {
    info: 'bg-yellow/10 border-l-yellow',
    tip: 'bg-gray/10 border-l-gray',
    success: 'bg-green/10 border-l-green',
    caution: 'bg-red/10 border-l-red',
}

export const Admonition = ({ icon, title, type = 'info', children }) => {
    const Icon = Icons[icon]
    const styles = typeStyles[type] || typeStyles.info

    return (
        <div className={`my-4 mb-8 p-4 border-l-[10px] rounded-sm ${styles}`}>
            <div className="flex items-center gap-2 mb-2">
                {Icon && <Icon className="w-5 h-5" />}
                <strong>{title}</strong>
            </div>
            <div className="[&>p:last-child]:mb-0">{children}</div>
        </div>
    )
}

export default Admonition
