import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Button from 'antd/lib/button'
import { connect } from 'react-redux'
import { onChangeMenuState } from '../../actions/layout'
import { onSetSidebarOpen } from '../../actions/layout'
import List from 'antd/lib/list'
import { getMenuState } from '../../store/selectors'
import { Menu as AntMenu } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import StarRepoButton from '../StarRepoButton'

class Menu extends Component {
  onChangeMenuState = nItem => {
    this.props.onChangeMenuState(nItem)
  }

  onSetSidebarClose = () => {
    this.props.onSetSidebarOpen(false)
  }

  render() {
    const { sidebarDocked, menuOpen, isBlogPage, sidebarHide } = this.props
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
            <div className="headerItems" style={{ 
              position: 'relative',
              top: 0, 
              background: 'none'}}>
              {sidebarDocked && (
                <AntMenu
                  mode="horizontal"
                  style={{
                    borderBottomWidth: 0,
                  }}
                >
                  {menuItems.reverse().map(item => {
                    return item.name === "star-repo" ? (
                      <AntMenu.Item
                        className="headerKey star-repo-btn"
                        style={{
                          marginLeft: '2em',
                          float: 'right',
                          marginBottom: 'calc(1.45rem / 2)'
                        }}
                        key={item.name}
                      >
                        <StarRepoButton></StarRepoButton>
                      </AntMenu.Item>
                    ) : (
                        <AntMenu.Item
                          className="headerKey"
                          style={{
                            marginLeft: '2em',
                            float: 'right',
                            marginBottom: 'calc(1.45rem / 2)'
                          }}
                          key={item.link || item.a}
                        >
                          {item.a ? (
                            <a href={item.a} className={item.name === "Login" && !isBlogPage ? " login-btn" : ""} style={{ color: isBlogPage ? '#FFFFFF' : '#000000' }}>
                              {item.name}
                            </a>
                          ) : (
                              <Link to={item.link} style={{ color: isBlogPage ? '#FFFFFF' : '#595959' }}>
                                {item.name}
                              </Link>
                            )}
                        </AntMenu.Item>
                      )
                  })}
                </AntMenu>
              )}
              {!sidebarDocked && !menuOpen ? (
                <Button
                className="dropdownMenuButton"
                  style={{
                    position: 'relative',
                    fontSize: 32,
                    width: 60,
                    height: 60,
                    top: 4,
                  }}
                  type="link"
                  onClick={() => {
                    this.onChangeMenuState(menuItems.length)
                  }}
                  icon="menu"
                />
              ) : (
                <CloseOutlined 
                className="closeButton"
                  style={{ 
                    position: 'relative',
                    fontSize: 32,
                    height: 60,
                    width: 60,
                    float: 'right',
                    right: 0,
                    top: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => {
                    this.onChangeMenuState(menuItems.length)
                  }}
                />
              )}
              {menuOpen && !sidebarDocked && (
                <div
                className="dropdownMenuMobile"
                  style={{
                    position: 'absolute',
                    top: 64,
                    height: '100vh',
                    width: '100vw',
                    float: 'right',
                    right: 0,
                    zIndex: 1
                  }}
                >
                  <List
                    className="dropdownMenu"
                    itemLayout="horizontal"
                    dataSource={menuItems}
                    rowKey={item => item.a || item.link}
                    renderItem={item => (
                      <List.Item
                        style={{
                          lineHeight: 54,
                          listStyle: 'none',
                          padding: '32px 10vw',
                          margin: 0
                        }}
                        key={menuItems.indexOf(item)}
                      >
                        {item.a ? (
                          <List.Item.Meta
                            title={
                              <a
                                href={item.a}
                                className={item.name === "Login" ? " login-btn" : ""}
                                style={{
                                  color: 'black',
                                  textDecoration: 'none',
                                }}
                                onClick={() => {
                                  this.onChangeMenuState(menuItems.length)
                                }}
                              >
                                {item.name}
                              </a>
                            }
                          />
                        ) : item.name === "star-repo" ? (
                          <List.Item.Meta
                            title={
                              <StarRepoButton></StarRepoButton>
                            }
                          />
                        ) : (
                              <List.Item.Meta
                                title={
                                  <Link
                                    to={item.link}
                                    style={{
                                      color: 'black',
                                      textDecoration: 'none',
                                    }}
                                    onClick={() => {
                                      this.onChangeMenuState(menuItems.length)
                                    }}
                                  >
                                    {item.name}
                                  </Link>
                                }
                              />
                            )}
                      </List.Item>
                    )}
                    style={{
                      width: '100%',
                      float: 'left',
                      backgroundColor: '#F0F0F0'
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
