import React, { useState, useCallback } from 'react'

interface SidebarState {
    isOpen: boolean
    width: number
}

export default function ReaderView() {
    const leftSidebarWidth = '300px'
    const rightSidebarWidth = '350px'

    return (
        <div className="w-full flex-grow overflow-auto flex flex-col bg-light dark:bg-dark gap-2">
            {/* First row */}
            <div className="flex w-full gap-2">
                <div className={`flex-shrink-0 w-[${leftSidebarWidth}]`}>home, sidebar</div>
                <div className="flex-grow dark:bg-accent-dark flex justify-between">
                    <div>back, forward</div>
                    <div>search</div>
                </div>
                <div className={`flex-shrink-0 w-[${rightSidebarWidth}]`}>actions</div>
            </div>

            {/* Second row */}
            <div className="flex w-full gap-2">
                <div className={`flex-shrink-0 w-[${leftSidebarWidth}]`}>navigation</div>
                <div className="flex-grow bg-white dark:bg-accent-dark">main content</div>
                <div className={`flex-shrink-0 w-[${rightSidebarWidth}]`}>table of contents</div>
            </div>

            {/* Third row */}
            <div className="flex w-full gap-2">
                <div className={`flex-shrink-0 w-[${leftSidebarWidth}]`}>home, sidebar</div>
                <div className="flex-grow dark:bg-accent-dark flex justify-between">
                    <div>Questions?</div>
                    <div>text sizing</div>
                </div>
                <div className={`flex-shrink-0 w-[${rightSidebarWidth}]`}>edit buttons</div>
            </div>
        </div>
    )
}
