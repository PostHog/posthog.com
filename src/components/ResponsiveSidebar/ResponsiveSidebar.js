import React, { Component } from "react";
import SidebarContents from "../SidebarContents";
import logo from '../../images/posthog-logo-lg.svg'
import { Link } from 'gatsby'

class ResponsiveSidebar extends Component {
  render() {
    const { expandedKeys } = this.props

    return (
      <div className="sidebarMenuDesktop">
        <div className="sidebarLogo">
          <Link id="logo" to="/">
            <img alt='logo' src={logo} id='logo-image-sidebar'/>
          </Link>
        </div>           
        <div className="sidebarMenuWrapper">
          <SidebarContents/>
        </div>
      </div>
    )
  }
}

export default ResponsiveSidebar;