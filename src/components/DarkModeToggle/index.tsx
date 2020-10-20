import React, { useEffect } from 'react'
import {handleToggle} from './utils'
import './style.scss'
import { ValidInputElement } from 'antd/lib/auto-complete'

export const DarkModeToggle = () => {
    useEffect(() => {
        if ((window as any)) {
            const darkModeToggleElement = window.document.getElementById('toggleSwitch') as HTMLInputElement
            const currentTheme = window.localStorage['currentWebsiteTheme']
            if (!currentTheme) window.localStorage['currentWebsiteTheme'] = 'light'
            darkModeToggleElement.checked = currentTheme === 'light'
            handleToggle(currentTheme, true)
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
