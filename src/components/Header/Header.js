import React, { Component } from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { getMenuState } from '../../store/selectors'
import { connect } from 'react-redux'


class Header extends Component {
  render() {
    const { sidebarDocked, onPostPage, sidebarHide, screenIsSmall, isBlogPage } = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          verticalAlign: screenIsSmall ? 'center' : 'top',
          justifyContent: 'space-between',
          background: 'none'
        }}>
          {screenIsSmall ? (
          <Link
            id="logo"
            to="/">
            <img alt="logo" src={logo} id="logo-image"/>
          </Link>
          ) : (
            (isBlogPage || !onPostPage) ? (
            <Link
            id="logo"
            to="/">
              {isBlogPage ? (
                <img alt="logo" src={whiteLogo} id="logo-image"/>
              ):(
                <img alt="logo" src={logo} id="logo-image"/>
              )}
            
          </Link>
            ) : (
              <div/>
            )
          )}
        <Menu 
        sidebarDocked={sidebarDocked}
        sidebarHide={sidebarHide}
        isBlogPage={isBlogPage} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuOpen: getMenuState(state).open,
    nMenuItem: getMenuState(state).nItem,
  }
}

export default connect(mapStateToProps)(Header)
