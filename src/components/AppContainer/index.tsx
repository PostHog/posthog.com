import React from 'react'
import { useWindowLayoutAttributes } from 'hooks/useWindowLayoutAttributes'

type AppContainerProps = {
    children: React.ReactNode
    className?: string
    dir?: 'ltr' | 'rtl'
}

// Subscribes to window layout state only to set data attributes on #app-container.
const AppContainer = React.memo(function AppContainer({ children, className = '', dir }: AppContainerProps) {
    const { hasExpandedWindow, hasSnappedLeftWindow, hasSnappedRightWindow } = useWindowLayoutAttributes()

    return (
        <div
            data-scheme="primary"
            id="app-container"
            dir={dir}
            data-window-expanded={hasExpandedWindow || undefined}
            data-window-snapped-left={hasSnappedLeftWindow || undefined}
            data-window-snapped-right={hasSnappedRightWindow || undefined}
            className={className}
        >
            {children}
        </div>
    )
})

export default AppContainer
