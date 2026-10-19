import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { LayoutMode, LayoutModeContext } from '../layoutMode'

const PARAM = 'layout-mode'
const MODES: LayoutMode[] = ['split', 'cinematic']

const readMode = (): LayoutMode => {
    const fromUrl = new URLSearchParams(window.location.search).get(PARAM)
    return MODES.includes(fromUrl as LayoutMode) ? (fromUrl as LayoutMode) : 'split'
}

const writeMode = (mode: LayoutMode): void => {
    const url = new URL(window.location.href)
    if (mode === 'split') url.searchParams.delete(PARAM)
    else url.searchParams.set(PARAM, mode)
    window.history.replaceState(null, '', url.toString())
}

export default function LayoutModeSwitch({ children }: { children: React.ReactNode }): JSX.Element {
    const [mode, setMode] = useState<LayoutMode>('split')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setMode(readMode())
    }, [])

    const toggle = () => {
        const next = mode === 'split' ? 'cinematic' : 'split'
        writeMode(next)
        setMode(next)
    }

    return (
        <LayoutModeContext.Provider value={mode}>
            {children}
            {mounted &&
                createPortal(
                    <button type="button" onClick={toggle} title="Toggle the data story layout" style={pillStyle}>
                        layout · {mode}
                    </button>,
                    document.body
                )}
        </LayoutModeContext.Provider>
    )
}

const pillStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 12,
    right: 12,
    zIndex: 99999,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: 11,
    lineHeight: 1,
    background: 'rgba(20, 21, 26, 0.92)',
    color: '#e8e8ea',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 999,
    padding: '5px 10px',
    cursor: 'pointer',
    userSelect: 'none',
}
