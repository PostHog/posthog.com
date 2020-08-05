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
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none'
        }}>
        {sidebarHide || !onPostPage ? (
          <Link
          id="logo"
          to="/"
          style={{
            //color: '#FFF',
            textDecoration: 'none',
            verticalAlign: 'center'
          }}>
          {screenIsSmall ? (<img alt="logo" src={whiteLogo} id="logo-image" style={{
            display: 'flex',
            top: 0,
            left: 8
          }} />
          ) : (
            <img alt="logo" src={logo} id="logo-image"/>
          )}
          </Link>
        ) : (
        isBlogPage ? (
          <Link
          id="logo"
          to="/"
          style={{
            //color: '#FFF',
            textDecoration: 'none',
            verticalAlign: 'center'
          }}>
            <img alt="logo" src={whiteLogo} id="logo-image"/>
          </Link>
        ):(
          screenIsSmall ? (
            <Link
          id="logo"
          to="/"
          style={{
            //color: '#FFF',
            textDecoration: 'none',
            verticalAlign: 'center'
          }}>
            <img alt="logo" src={logo} id="logo-image" style={{
              display: 'flex',
              top: 0,
              left: 8
            }} />
          </Link>
          ) : (
          <div style={{height: 64, width: 0}}></div>
        )))}
        <Menu 
        sidebarDocked={sidebarDocked}
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
