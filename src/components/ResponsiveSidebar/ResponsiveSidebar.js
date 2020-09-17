import React, { Component } from 'react'
import SidebarContents from '../SidebarContents'
import logo from '../../images/posthog-logo-150x29.svg'
import { Link } from 'gatsby'

class ResponsiveSidebar extends Component {
    render() {
        const { expandedKeys } = this.props

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
}

export default ResponsiveSidebar
