import React from 'react'
import SidebarContents from '../SidebarContents'
import logo from '../../images/posthog-logo-150x29.svg'
import { Link } from 'gatsby'

export const ResponsiveSidebar = () => {
    return (
        <div className="sidebarWrapper">
            <div className="logoWrapperSidebar">
                <Link id="logo" to="/">
                    <img alt="logo" src={logo} id="logo-image-sidebar" />
                </Link>
            </div>
            <SidebarContents />
        </div>
    )
}
