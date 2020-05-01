import React, { Component } from 'react'
import { Link } from 'gatsby';
import Menu from '../Menu';
import logo from "../../images/posthog-logo-no-text.png";
import { getMenuState } from '../../store/selectors';
import { connect } from 'react-redux';

class Header extends Component {

  render() {
    const { 
      sidebarDocked,
      menuOpen,
      nMenuItem,
    } = this.props
    
    return (
      <div
        style={{
            // position: "fixed",
            // top: 0,
          width: "100%",
          height: (menuOpen && !sidebarDocked) ? nMenuItem*32 + 50 : 55,
          marginBottom: 20,
          background: '#fff',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            padding: '15px 80px',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{
            float: 'left',
            marginBottom: '10px',
          }}>
          <h1>
            <Link id="logo"
                to="/"
                style={{
                  //color: '#FFF',
                  textDecoration: 'none',
                }}
              ><img alt="logo" src={logo} id="logo-image" />PostHog
            </Link>
          </h1>
          </div>
          <Menu sidebarDocked={sidebarDocked}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuOpen: getMenuState(state).open,
    nMenuItem: getMenuState(state).nItem,
  }
}

export default connect(mapStateToProps) (Header);
