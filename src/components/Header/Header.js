import React, { Component } from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-dark-grey.svg'
import { getMenuState } from '../../store/selectors'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    const { sidebarDocked } = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          padding: 0
        }}
      >
        <Link
          id="logo"
          to="/"
          style={{
            //color: '#FFF',
            textDecoration: 'none',
          }}
        >
          <div style={{width: '20vw', backgroundColor: '#C4C4C4'}}>
          <img alt="logo" src={logo} id="logo-image" style={{margin: '0 10%'}}/>
          </div>
          
        </Link>
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
