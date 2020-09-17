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
      <div className={"menuHeaderWrapper " + (!isBlogPage && !sidebarHide && !screenIsSmall && onPostPage && "noLogo")}>
      {screenIsSmall ? (
        (onPostPage && !isBlogPage) ? (
        <Link
          id="logo"
          to="/">
          <img alt="logo" src={logo} id="logo-image-header" />
        </Link>
        ) : (
        <Link
          id="logo"
          to="/">
          <img alt="logo" src={whiteLogo} id="logo-image-header"/>
        </Link>
        )):(
      ((isBlogPage || !onPostPage) && (
          <Link
          id="logo"
          to="/">
            <img alt="logo" src={whiteLogo} id="logo-image-header"/>
          </Link>
        )))}
        <Menu
          sidebarDocked={sidebarDocked}
          sidebarHide={sidebarHide}
          isBlogPage={isBlogPage}
          screenIsSmall={screenIsSmall}
        />
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
