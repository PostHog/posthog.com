import React, { Component } from "react";
import SidebarContents from "../SidebarContents";
import logoGrey from '../../images/posthog-logo-dark-grey.svg'
import { Link } from 'gatsby'

class ResponsiveSidebar extends Component {
  render() {

    return (
      <div style={{
        top: 80,
        left: 10,
        right: "80%",
        bottom: 0,
        zIndex:1, 
        marginBottom: 10
      }} >           
        <div style={{
          marginRight: 10
        }}>
          <Link
            id="logo"
            to="/"
            style={{
              //color: '#FFF',
              textDecoration: 'none',
            }}
          >
            <div style={{ 
              height: 'auto', 
              backgroundColor: '#C4C4C4', 
              padding: 10,
              marginRight: 10,
              marginBottom: 80}}>
              <img alt='logo' src={logoGrey} id='logo-image' style={{padding: '0 10', width: '20vw', height: 'auto'}}/>
            </div>
          </Link>
          <SidebarContents/>
        </div>
      </div>
    )
  }
}

export default ResponsiveSidebar;