import React, { Component } from "react";
import SidebarContents from "../SidebarContents";
import logo from '../../images/posthog-logo-150x29.svg'
import { Link } from 'gatsby'

class ResponsiveSidebar extends Component {
  render() {
    const { expandedKeys } = this.props

    return (
      <div style={{
        width: '100%',
        top: 80,
        left: 10,
        right: "80%",
        bottom: 0,
        zIndex:1, 
        marginBottom: 10,
      }} >           
        <div style={{
          marginLeft: 10,
          marginRight: 'auto',
        }}>
          <Link
            id="logo"
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >

              <img alt='logo' src={logo} id='logo-image' style={{width: 160, height: 'auto', top: 0, left: 40, marginTop: 17, marginBottom: 80}}/>
          </Link>
          <SidebarContents/>
        </div>
      </div>
    )
  }
}

export default ResponsiveSidebar;