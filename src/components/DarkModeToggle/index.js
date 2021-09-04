import React, { useEffect } from 'react'
import { useValues, useActions } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import './style.scss'

export const DarkModeToggle = () => {
    const { websiteTheme } = useValues(layoutLogic)
    const { setWebsiteTheme } = useActions(layoutLogic)
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window) {
            setWebsiteTheme(window.__theme)
            window.__onThemeChange = () => {
                setWebsiteTheme(window.__theme)
                if (posthog) {
                    posthog.people.set({ preferred_theme: window.__theme })
                }
            }
        }
    }, [])

    return (
        <div className="ml-auto md:ml-0 pl-3 flex items-center text-[#777] dark:text-[#999] border-gray-accent-light dark:border-gray-accent-dark border-dashed border-l">
            <svg
                className="fill-current mr-3"
                width="18"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M4.534 10a5.465 5.465 0 1010.93 0 5.465 5.465 0 00-10.93 0zm5.519-4.035a4.085 4.085 0 013.538 6.13 4.086 4.086 0 01-3.538 2.043V5.965zm.347-2.554V.96a.46.46 0 10-.918 0V3.41a.46.46 0 00.918 0zm6.274.485a.46.46 0 00-.65-.65l-1.726 1.733a.46.46 0 00.65.65l1.726-1.733zm-.086 6.504h2.452a.46.46 0 100-.918h-2.452a.46.46 0 000 .918zm-2.218 3.897a.458.458 0 000 .65l1.735 1.735h-.001a.462.462 0 00.785-.325.458.458 0 00-.135-.325l-1.734-1.735a.46.46 0 00-.65 0zM9.6 16.588v2.452a.46.46 0 10.918 0v-2.452a.46.46 0 00-.918 0zm-6.282-.484a.461.461 0 00.326.784.455.455 0 00.324-.134l1.734-1.735v.001a.46.46 0 00-.65-.65l-1.734 1.734zM.5 10.052a.46.46 0 00.46.458h2.452a.46.46 0 000-.918H.96a.462.462 0 00-.46.46zm5.13-4.35a.458.458 0 000-.65L3.895 3.318h.001a.46.46 0 00-.65.65L4.98 5.702c.18.178.47.178.65 0z" />
            </svg>

            <span className="toggle-wrapper mt-[-2px]" data-attr="dark-mode-toggle">
                <span className="toggle-switch">
                    <input
                        type="checkbox"
                        className="toggle-switch-checkbox"
                        name="toggleSwitch"
                        id="toggleSwitch"
                        checked={websiteTheme === 'dark'}
                        onChange={(e) => window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')}
                    />
                    <label className="toggle-switch-label bg-[#c4c4c4] dark:bg-[#5A5A5A]" htmlFor="toggleSwitch">
                        <span className="toggle-switch-switch bg-[#0e0e0e] dark:bg-[#999]" />
                    </label>
                </span>
            </span>
        </div>
    )
}
