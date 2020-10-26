import React from 'react'
import './style.scss'

interface DarkModeToggleProps {
    checked: boolean
    onChange: () => void
    style: Object
}

export const DarkModeToggle = ({ checked, onChange, style }: DarkModeToggleProps) => {
    return (
        <span className="toggle-wrapper" style={style} data-attr="dark-mode-toggle">
            <span className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    name="toggleSwitch"
                    id="toggleSwitch"
                    checked={checked}
                    onChange={onChange}
                />
                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                </label>
            </span>
        </span>
    )
}
