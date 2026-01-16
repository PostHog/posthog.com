import React, { useEffect } from 'react'
import { useApp } from '../../context/App'
import SidePanel from 'components/SidePanel'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { navigate } from 'gatsby'
import { IconCheck, IconCopy } from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'

export default function ActiveWindowsPanel() {
    const {
        windows,
        isActiveWindowsPanelOpen,
        setIsActiveWindowsPanelOpen,
        focusedWindow,
        bringToFront,
        closeWindow,
        animateClosingAllWindows,
        desktopParams,
        shareableDesktopURL,
        desktopCopied,
        copyDesktopParams,
    } = useApp()

    const closeActiveWindowsPanel = () => {
        setIsActiveWindowsPanelOpen(false)
    }

    const handleCopyDesktopParams = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        copyDesktopParams()
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
            <div className="h-full flex flex-col">
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
                {totalWindows > 0 && (
                    <div className="p-4 mt-auto border-t border-primary">
                        <h3 className="text-sm font-semibold m-0 mb-0.5">Share your windows</h3>
                        <p className="text-xs text-secondary m-0 mb-2 leading-relaxed">
                            Copy the URL to share your open windows & layout.
                        </p>
                        <form onSubmit={handleCopyDesktopParams} className="flex gap-1">
                            <input
                                disabled
                                type="url"
                                value={shareableDesktopURL}
                                className="text-xs font-mono border border-primary rounded-md flex-grow bg-white dark:bg-dark"
                            />
                            <OSButton
                                type="submit"
                                size="sm"
                                disabled={!desktopParams}
                                className="shrink-0 !w-[34px] border border-primary rounded-md"
                            >
                                {desktopCopied ? (
                                    <IconCheck className="size-4 text-green" />
                                ) : (
                                    <IconCopy className="size-4" />
                                )}
                            </OSButton>
                        </form>
                        <p className="text-xs text-secondary m-0 mt-2 flex items-center gap-1">
                            <span>Tip: Press</span>
                            <div className="flex items-center gap-1">
                                <KeyboardShortcut text="Shift" size="sm" />
                                <KeyboardShortcut text="C" size="sm" />
                            </div>
                            <span>to copy instantly.</span>
                        </p>
                    </div>
                )}
            </div>
        </SidePanel>
    )
}
