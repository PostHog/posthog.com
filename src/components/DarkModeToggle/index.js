import React, { useEffect } from 'react'
import { useValues, useActions } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import usePostHog from '../../hooks/usePostHog'
import './style.scss'
import Toggle from 'components/Toggle'
import { DarkMode } from 'components/Icons/Icons'

export const DarkModeToggle = () => {
    const { websiteTheme } = useValues(layoutLogic)
    const { setWebsiteTheme } = useActions(layoutLogic)
    const posthog = usePostHog()

    useEffect(() => {
        if (window) {
            setWebsiteTheme(window.__theme)
            window.__onThemeChange = () => {
                setWebsiteTheme(window.__theme)
                if (posthog?.setPersonProperties) {
                    posthog.setPersonProperties({ preferred_theme: window.__theme })
                }
            }
        }
    }, [])

    return (
        <Toggle
            checked={websiteTheme === 'dark'}
            onChange={(checked) => window.__setPreferredTheme(checked ? 'dark' : 'light')}
        />
    )
}
