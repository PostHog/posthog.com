import React from 'react'
import { useApp } from '../../context/App'
import SidePanel from 'components/SidePanel'
import ScrollArea from 'components/RadixUI/ScrollArea'

export default function ActiveWindowsPanel() {
  const {
    windows,
    isActiveWindowsPanelOpen,
    setIsActiveWindowsPanelOpen,
    focusedWindow,
    bringToFront,
    closeWindow
  } = useApp()

  const closeActiveWindowsPanel = () => {
    setIsActiveWindowsPanelOpen(false)
  }

  const handleWindowClick = (window: any) => {
    bringToFront(window)
    closeActiveWindowsPanel()
  }

  const totalWindows = windows.length

  return (
    <SidePanel
      isOpen={isActiveWindowsPanelOpen}
      onClose={closeActiveWindowsPanel}
      title="Active Windows"
      width="w-80"
    >
      <ScrollArea className="p-2">
        <div className="flex flex-col gap-px">
          {windows.map((window) => (
            <div key={window.key} className="flex items-center gap-2">
              <button
                onClick={() => handleWindowClick(window)}
                className="text-primary text-left px-2 py-1.5 rounded hover:bg-accent text-sm flex-1 flex items-center gap-2"
              >
                <span
                  className={`truncate ${window.minimized
                      ? 'italic'
                      : focusedWindow === window
                        ? 'font-bold'
                        : ''
                    }`}
                >
                  {window.meta?.title || 'Untitled'}
                </span>
              </button>
              <button
                onClick={() => closeWindow(window)}
                className="text-secondary hover:text-primary text-sm px-2 py-1"
              >
                ×
              </button>
            </div>
          ))}
          {totalWindows === 0 && (
            <div className="text-center text-secondary p-4">
              No active windows
            </div>
          )}
        </div>
      </ScrollArea>
    </SidePanel>
  )
} 