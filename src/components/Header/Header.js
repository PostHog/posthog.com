import React, { Component } from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { getMenuState, isSidebarHide } from '../../store/selectors'
import { connect } from 'react-redux'
import { withPrefix } from "gatsby-link"


class Header extends Component {
  render() {
    const { sidebarDocked, onPostPage, sidebarHide, screenIsSmall, isBlogPage, isHomePage } = this.props

    return (
      <div className={"menuHeaderWrapper " + (!sidebarHide && !screenIsSmall && onPostPage && "noLogo")}>
        {screenIsSmall ? (
          <Link
          id="logo"
          to="/">
          <img alt="logo" src={logo} id="logo-image-header" />
          </Link>
        ) : (
            isBlogPage ? (

              <Link
              id="logo"
              to="/">
                <img alt="logo" src={whiteLogo} id="logo-image-header"/>
              </Link>
              ) : (
                sidebarDocked && !onPostPage &&
                <Link
                  id="logo"
                  to="/">
                  <img alt="logo" src={logo} id="logo-image-header" />
                </Link>
              ))}
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
