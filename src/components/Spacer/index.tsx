import React from 'react'
import './style.css'

interface SpacerProps {
    onlyMobile?: boolean
    onlyDesktop?: boolean
    height?: string | number | undefined
}

export const Spacer = ({ onlyMobile = false, onlyDesktop = false, height = 50 }: SpacerProps) => (
    <span className="custom-spacer-wrapper">
        <div
            className={'custom-spacer ' + (onlyMobile ? 'mobile-only' : '') + (onlyDesktop ? 'desktop-only' : '')}
            style={{ height: height }}
        />
    </span>
)
