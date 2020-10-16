import React from 'react'
import './style.css'

export const Spacer = ({ onlyMobile = false, onlyDesktop = false, height = '50px' }) => (
    <div
        className={(onlyMobile ? 'mobile-only' : '') + (onlyDesktop ? 'desktop-only' : '')}
        style={{ height: height }}
    />
)
