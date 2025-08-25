import React from 'react'
import { useApp } from '../../context/App'
import SidePanel from 'components/SidePanel'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { navigate } from 'gatsby'

export default function ActiveWindowsPanel() {
    const {
        windows,
        isActiveWindowsPanelOpen,
        setIsActiveWindowsPanelOpen,
        focusedWindow,
        bringToFront,
        closeWindow,
        animateClosingAllWindows,
    } = useApp()

    const closeActiveWindowsPanel = () => {
        setIsActiveWindowsPanelOpen(false)
    }

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
                <OSButton
                    size="sm"
                    onClick={() => {
                        animateClosingAllWindows()
                        closeActiveWindowsPanel()
                    }}
                >
                    Close all
                </OSButton>
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
