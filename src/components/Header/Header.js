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
      <div className={"menuHeaderWrapper " + (!sidebarHide && !screenIsSmall && "noLogo")}>
        {screenIsSmall ? (
          <Link
          id="logo"
          to="/">
          <img alt="logo" src={logo} id="logo-image" />
          </Link>
        ) : (
            onPostPage && (isBlogPage ? (
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
              ) : (
                <Link
              id="logo"
              to="/"
              style={{
                //color: '#FFF',
                textDecoration: 'none',
                verticalAlign: 'center'
              }}>
                <img alt="logo" src={logo} id="logo-image" />
              </Link>
              )))}
        <Menu 
        sidebarDocked={sidebarDocked}
        sidebarHide={sidebarHide}
        isBlogPage={isBlogPage}
        screenIsSmall={screenIsSmall} />
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
