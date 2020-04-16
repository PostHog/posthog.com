import React, { Component } from 'react'
import { Link } from 'gatsby';
import Menu from '../Menu';
import { getMenuState } from '../../store/selectors';
import { connect } from 'react-redux';

class Header extends Component {

  render() {
    const { 
      siteTitle,
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
          background: 'cornflowerblue',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1360,
            padding: '15px 18px',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{
            float: 'left',
            marginBottom: '10px',
          }}>
            <h1 style={{ margin: 0, fontSize: "1.25rem" }}>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {siteTitle}
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
