import React, { useEffect } from 'react'
import { useValues, useActions } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import './style.scss'

export const DarkModeToggle = () => {
    const { websiteTheme } = useValues(layoutLogic)
    const { setWebsiteTheme } = useActions(layoutLogic)

    useEffect(() => {
        setWebsiteTheme(window.__theme)
        window.__onThemeChange = () => setWebsiteTheme(window.__theme)
    }, [])

    return (
        <span className="toggle-wrapper" data-attr="dark-mode-toggle">
            <span className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    name="toggleSwitch"
                    id="toggleSwitch"
                    checked={websiteTheme === 'dark'}
                    onChange={(e) => window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')}
                />
                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                </label>
            </span>
        </span>
    )
}
