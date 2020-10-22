import React from 'react'
import SidebarContents from '../SidebarContents'
import coloredLogo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { Link } from 'gatsby'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'

export const ResponsiveSidebar = () => {
    const { websiteTheme } = useValues(layoutLogic)

    return (
        <div className="sidebarWrapper">
            <div className="logoWrapperSidebar">
                <Link id="logo" to="/">
                    <img alt="logo" src={websiteTheme === 'dark' ? whiteLogo : coloredLogo} id="logo-image-sidebar" />
                </Link>
            </div>
            <SidebarContents />
        </div>
    )
}
