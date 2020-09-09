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
    const { sidebarDocked, menuOpen, isBlogPage, screenIsSmall, sidebarHide } = this.props
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
            <div className="headerItems" style={{ marginRight: 20 }}>
              {sidebarDocked && (
                <AntMenu mode="horizontal">
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
                          key={item.link || item.a}
                        >
                          {item.a ? (
                            <a href={item.a} className={(item.name === "Login" ? " login-btn" : " headerItem") + (isBlogPage && " blogPage")} >
                              {item.name}
                            </a>
                          ) : (
                              <Link to={item.link} className={"headerItem" + (isBlogPage && " blogPage")} >
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
                  className="headerButton"
                  type="link"
                  onClick={() => {
                    this.onChangeMenuState(menuItems.length)
                  }}
                  icon="menu"
                />
              )}
              {menuOpen && !sidebarDocked && (
                <div
                  className="mobileHeader"
                >
                  <CloseOutlined
                    className="mobileHeaderClose"
                    style={{
                      float: 'right',
                      fontSize: '30px',
                      paddingLeft: '10vw',
                      paddingRight: '10vw',
                      marginTop: '5vh',
                      backgroundColor: 'white',
                    }}
                    onClick={() => {
                      this.onChangeMenuState(menuItems.length)
                    }}
                  />
                  <List
                    itemLayout="horizontal"
                    dataSource={menuItems}
                    rowKey={item => item.a || item.link}
                    renderItem={item => (
                      <List.Item
                        className="mobileHeaderItem"
                        key={menuItems.indexOf(item)}
                      >
                        {item.a ? (
                          <List.Item.Meta
                            title={
                              <a
                                href={item.a}
                                className={item.name === "Login" ? " login-btn" : ""}
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
                    className="mobileHeaderList"
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
