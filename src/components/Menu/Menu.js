import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Button from 'antd/lib/button'
import { connect } from 'react-redux'
import { onChangeMenuState } from '../../actions/layout'
import List from 'antd/lib/list'
import { getMenuState } from '../../store/selectors';


class Menu extends Component {
  onChangeMenuState = (nItem) => {
    this.props.onChangeMenuState(nItem)
  }

  render() {
    const { 
      sidebarDocked,
      menuOpen,
    } = this.props

    return (
      <StaticQuery
        query={graphql`
          query {
            allMenuItemsJson {
              edges {
                node {
                  name
                  link
                }
              }
            }
          }
        `}
        render={data => {
          const menuItems = data.allMenuItemsJson.edges.map(edge => edge.node)
          return (
            <div>
            {sidebarDocked &&
            <div>
              {menuItems.reverse().map(item => {
                return (
                  <div 
                    style={{ marginLeft: "2em", float: "right" }}
                    key={menuItems.indexOf(item)}
                  >
                    <p style={{ margin:0, fontSize: "1rem" }}>
                      <Link
                        to={item.link}
                        style={{ color: 'white', textDecoration: 'none' }}
                      >
                        {item.name}
                      </Link>
                    </p>
                  </div>
                )
              })}
            </div>
            }
            {!sidebarDocked &&
              <Button 
                style={{
                  position: 'fixed',
                  right: 10,
                  top: 12,
                  color: 'white',
                }}
                type='link'
                onClick={() => {this.onChangeMenuState(menuItems.length)}}
                icon="menu"
              />
            }
            {menuOpen && !sidebarDocked &&
              <List
                itemLayout="horizontal"
                dataSource={menuItems}
                renderItem={item => (
                  <List.Item
                    style={{
                      listStyle: 'none',
                      marginLeft: '-20px',
                    }}
                    key={menuItems.indexOf(item)}
                  >
                    <List.Item.Meta
                      title={
                        <Link
                          to={item.link}
                          style={{ color: 'white', textDecoration: 'none' }}
                          onClick={() => {this.onChangeMenuState(menuItems.length)}}
                        >
                          {item.name}
                        </Link>
                      }
                    />
                  </List.Item>
                )}
                style={{
                  width: '100%',
                  float: 'left',
                }}
              />
            }
            </div>
          )
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuOpen: getMenuState(state).open,
  }
}

const mapDispatchToProps = {
  onChangeMenuState,
}

// export default Menu
export default connect(mapStateToProps, mapDispatchToProps) (Menu)
