import React, { useEffect } from 'react'
import { handleToggle } from './utils'
import './style.scss'

export const DarkModeToggle = () => {
    useEffect(() => {
        if (window) {
            const darkModeToggleElement = window.document.getElementById('toggleSwitch') as HTMLInputElement
            const currentTheme = window.localStorage['currentWebsiteTheme']
            if (!currentTheme) window.localStorage['currentWebsiteTheme'] = 'light'
            darkModeToggleElement.checked = currentTheme === 'light'
            darkModeToggleElement.addEventListener('change', () => {
                handleToggle(window.localStorage['currentWebsiteTheme'])
            })
        }
    }, [])

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
