import React, { Component } from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import { getMenuState } from '../../store/selectors'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    const { sidebarDocked, onPostPage, sidebarHide } = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}>
        {!sidebarHide && onPostPage ? (
        <div style={{position: 'relative', height: 40, width: 100, top: 0}}/>
        ) : (
          <Link
          id="logo"
          to="/"
          style={{
            //color: '#FFF',
            textDecoration: 'none',
          }}
        >
          <img alt="logo" src={logo} id="logo-image" style={{top: 0, left: 0}}/>
          
        </Link>)}
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
