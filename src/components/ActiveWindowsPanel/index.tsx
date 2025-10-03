import React, { useEffect } from 'react'
import { useApp } from '../../context/App'
import SidePanel from 'components/SidePanel'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { navigate } from 'gatsby'

export default function ActiveWindowsPanel() {
    const {
        windows: activeWindows,
        isActiveWindowsPanelOpen,
        setIsActiveWindowsPanelOpen,
        focusedWindow,
        bringToFront,
        closeWindow,
        animateClosingAllWindows,
    } = useApp()

    const windows = activeWindows.filter((window) => !window.hidden)

    const closeActiveWindowsPanel = () => {
        setIsActiveWindowsPanelOpen(false)
    }

    // Add keyboard listener for Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isActiveWindowsPanelOpen) {
                e.preventDefault()
                closeActiveWindowsPanel()
            }
        }

        if (isActiveWindowsPanelOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isActiveWindowsPanelOpen])

    const handleWindowClick = (appWindow: any) => {
        if (appWindow.path.startsWith('/')) {
            navigate(`${appWindow.path}`)
        } else {
            bringToFront(appWindow)
        }
        closeActiveWindowsPanel()
    }

    const totalWindows = windows.length

    return (
        <SidePanel
            isOpen={isActiveWindowsPanelOpen}
            onClose={closeActiveWindowsPanel}
            title="Active windows"
            headerAside={
                windows.length > 0 && (
                    <OSButton
                        size="sm"
                        onClick={() => {
                            animateClosingAllWindows()
                            closeActiveWindowsPanel()
                        }}
                    >
                        Close all
                    </OSButton>
                )
            }
            width="w-80"
        >
            <ScrollArea className="p-2">
                <div className="flex flex-col gap-1">
                    {windows.map((window) => (
                        <OSButton
                            key={window.key}
                            size="md"
                            width="full"
                            align="left"
                            active={focusedWindow === window}
                            onClick={() => handleWindowClick(window)}
                            className="group"
                        >
                            <span className={`truncate flex-1 ${window.minimized ? 'italic opacity-60' : ''}`}>
                                {window.meta?.title || 'Untitled'}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    closeWindow(window)
                                }}
                                className="ml-2 text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity text-lg leading-none px-1"
                            >
                                ×
                            </button>
                        </OSButton>
                    ))}
                    {totalWindows === 0 && <div className="text-center text-secondary p-4">No active windows</div>}
                </div>
            </ScrollArea>
        </SidePanel>
    )
}
