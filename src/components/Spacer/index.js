import React from 'react'
import './style.scss'

export const Spacer = ({ onlyMobile = false, onlyDesktop = false, height = 50 }) => (
    <span className="custom-spacer-wrapper">
        <div
            className={'custom-spacer ' + (onlyMobile ? 'mobile-only' : '') + (onlyDesktop ? 'desktop-only' : '')}
            style={{ height: height }}
        />
    </span>
)
