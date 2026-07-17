import React from 'react'
import KeyboardShortcut from 'components/KeyboardShortcut'

export default function SearchFooter({
    filterMenuOpen,
    activeFilter,
}: {
    filterMenuOpen: boolean
    activeFilter: string | null
}): JSX.Element {
    return (
        <div className="hidden @sm:flex justify-between items-center px-4 py-2 text-xs border-t shrink-0 border-primary bg-primary text-secondary">
            {filterMenuOpen ? (
                <>
                    <div className="flex gap-3 items-center">
                        <span>
                            <KeyboardShortcut text="↑" size="xs" />
                            <KeyboardShortcut text="↓" size="xs" /> navigate
                        </span>
                        <span>
                            <KeyboardShortcut text="↵" size="xs" /> apply filter
                        </span>
                    </div>
                    <span>
                        <KeyboardShortcut text="esc" size="xs" /> close
                    </span>
                </>
            ) : (
                <>
                    <div className="flex gap-3 items-center">
                        <span>
                            <KeyboardShortcut text="↑" size="xs" />
                            <KeyboardShortcut text="↓" size="xs" /> navigate
                        </span>
                        <span>
                            <KeyboardShortcut text="↵" size="xs" /> open
                        </span>
                        <span className="hidden @md:inline">
                            <KeyboardShortcut text="⌘F" size="xs" /> filter
                        </span>
                        {activeFilter && (
                            <span>
                                <KeyboardShortcut text="⌫" size="xs" /> remove filter
                            </span>
                        )}
                    </div>
                    <span>
                        <KeyboardShortcut text="⇧" size="xs" />
                        <KeyboardShortcut text="↵" size="xs" /> talk to a robot
                    </span>
                </>
            )}
        </div>
    )
}
