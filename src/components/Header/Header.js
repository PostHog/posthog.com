import React, { Component } from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { getMenuState } from '../../store/selectors'
import { connect } from 'react-redux'


class Header extends Component {

  render() {

    const { sidebarDocked, onPostPage, sidebarHide, screenIsSmall, isBlogPage, isHomePage, isBlogArticlePage, isDocsPage } = this.props

    return (
      <div className={"menuHeaderWrapper " + (!isBlogPage && !sidebarHide && !screenIsSmall && onPostPage && "noLogo")}>
        {/* Desktop Docs pages = (onPostPage && !screenIsSmall) 
            They already have a logo on the sidebar - skip adding the logo to navbar */}
        {!(onPostPage && !screenIsSmall && isDocsPage) && (
          <Link
            id="logo"
            to="/">
            <img
              alt="logo"
              id="logo-image-header"
              src={
                (isHomePage || isBlogArticlePage) ? whiteLogo : logo
              }
            />
          </Link>
        )}
        <Menu
          sidebarDocked={sidebarDocked}
          sidebarHide={sidebarHide}
          isBlogPage={isBlogPage}
          screenIsSmall={screenIsSmall}
          isHomePage={isHomePage}
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
