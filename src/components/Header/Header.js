import React, { Component } from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import blogBackground from '../../images/blog-background.svg'
import { getMenuState } from '../../store/selectors'
import { connect } from 'react-redux'


class Header extends Component {
  render() {
    const { sidebarDocked, onPostPage, screenIsSmall, isBlogPage } = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {isBlogPage && (
          <img alt='blog-background' src={blogBackground}/>
        )}
        {screenIsSmall ? (
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
          )}
        <Menu sidebarDocked={sidebarDocked} />
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
