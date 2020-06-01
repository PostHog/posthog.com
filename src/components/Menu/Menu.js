import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Button from 'antd/lib/button'
import { connect } from 'react-redux'
import { onChangeMenuState } from '../../actions/layout'
import List from 'antd/lib/list'
import { getMenuState } from '../../store/selectors'
import { Menu as AntMenu } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

class Menu extends Component {
  onChangeMenuState = nItem => {
    this.props.onChangeMenuState(nItem)
  }

  render() {
    const { sidebarDocked, menuOpen } = this.props
    return (
      <StaticQuery
        query={graphql`
          query {
            allMenuItemsJson {
              edges {
                node {
                  name
                  link
                  a
                }
              }
            }
          }
        `}
        render={data => {
          const menuItems = data.allMenuItemsJson.edges.map(edge => edge.node)
          return (
            <div style={{ marginRight: 20 }}>
              {sidebarDocked && (
                <AntMenu
                  mode="horizontal"
                  style={{
                    borderBottomWidth: 0,
                  }}
                  selectedKeys={typeof window !== 'undefined' && menuItems.map(menuItem => {
                    try {
                        if (window.location.pathname === menuItem.link)
                        return menuItem.link
                      } catch (e) {
                        console.log(e)
                    }
                  })}
                >
                  {menuItems.reverse().map(item => {
                    return (
                      <AntMenu.Item
                        style={{
                          marginLeft: '2em',
                          float: 'right',
                        }}
                        key={item.link || item.a}
                      >
                        {item.a ? (
                          <a href={item.a} style={{ color: 'black' }}>
                            {item.name}
                          </a>
                        ) : (
                          <Link to={item.link} style={{ color: 'black' }}>
                            {item.name}
                          </Link>
                        )}
                      </AntMenu.Item>
                    )
                  })}
                </AntMenu>
              )}
              {!sidebarDocked && (
                <Button
                  style={{
                    color: 'cornflowerblue',
                  }}
                  type="link"
                  onClick={() => {
                    this.onChangeMenuState(menuItems.length)
                  }}
                  icon="menu"
                />
              )}
              {menuOpen && !sidebarDocked && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: 'white',
                    zIndex: 100,
                    paddingLeft: '10vw',
                    paddingRight: '10vw',
                    paddingTop: '5vh',
                  }}
                >
                  <div>
                    <CloseOutlined
                      style={{ float: 'right', fontSize: '30px' }}
                      onClick={() => {
                        this.onChangeMenuState(menuItems.length)
                      }}
                    ></CloseOutlined>
                  </div>
                  <List
                    itemLayout="horizontal"
                    dataSource={menuItems}
                    rowKey={item => item.a || item.link}
                    renderItem={item => (
                      <List.Item
                        style={{
                          listStyle: 'none',
                          marginTop: '5vh',
                        }}
                        key={menuItems.indexOf(item)}
                      >
                        {item.a?
                          <List.Item.Meta
                            title={                            
                              <a
                                href={item.a}
                                style={{ color: 'black', textDecoration: 'none' }}
                                onClick={() => {
                                  this.onChangeMenuState(menuItems.length)
                                }}
                              >
                                {item.name}
                              </a>
                            }
                          />
                        : 
                          <List.Item.Meta
                            title={
                              <Link
                                to={item.link}
                                style={{ color: 'black', textDecoration: 'none' }}
                                onClick={() => {
                                  this.onChangeMenuState(menuItems.length)
                                }}
                              >
                                {item.name}
                              </Link>                            
                            }
                          />
                        }
                        
                      </List.Item>
                    )}
                    style={{
                      width: '100%',
                      float: 'left',
                    }}
                  />
                </div>
              )}
            </div>
          )
        }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    menuOpen: getMenuState(state).open,
  }
}

const mapDispatchToProps = {
  onChangeMenuState,
}

// export default Menu
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
