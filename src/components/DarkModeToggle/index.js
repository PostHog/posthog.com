import React, { useEffect } from 'react'
import './style.scss'

export const DarkModeToggle = () => {
    useEffect(() => {
        if (window) {
            const doc = window.document
            const darkModeToggleElement = doc.getElementById('toggleSwitch')
            darkModeToggleElement.addEventListener('change', () => {
                handleToggle()
            })
        }
    }, [])

    const handleToggle = () => {
        const doc = window.document
        const sidebarElement = doc.getElementById('docs-sidebar')
        const headerElement = doc.getElementById('menu-header')
        const rightNavElement = doc.getElementById('right-navbar')
        sidebarElement.style['background'] = '#000000'
        headerElement.style['background-color'] = '#000000'
        rightNavElement.style['background'] = '#000000'
    }

    return (
        <div className="toggle-wrapper">
            <div className="toggle-switch">
                <input type="checkbox" className="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                </label>
            </div>
        </div>
    )
}
