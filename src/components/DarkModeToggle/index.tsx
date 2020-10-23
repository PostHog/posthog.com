import React from 'react'
import './style.scss'

interface DarkModeToggleProps {
    checked: boolean
    onChange: () => void
}

export const DarkModeToggle = ({ checked, onChange }: DarkModeToggleProps) => {
    return (
        <span className="toggle-wrapper">
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
