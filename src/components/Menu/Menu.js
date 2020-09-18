import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Button from 'antd/lib/button'
import { connect } from 'react-redux'
import { onChangeMenuState } from '../../actions/layout'
import List from 'antd/lib/list'
import { getMenuState } from '../../store/selectors'
import { Menu as AntMenu } from 'antd'
import StarRepoButton from '../StarRepoButton'

class Menu extends Component {
    onChangeMenuState = (nItem) => {
        this.props.onChangeMenuState(nItem)
    }

    render() {
        const { sidebarDocked, menuOpen, isBlogPage, isHomePage } = this.props
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
                render={(data) => {
                    const menuItems = data.allMenuItemsJson.edges.map((edge) => edge.node)
                    return (
                        <div className="headerItems">
                            {sidebarDocked && (
                                <AntMenu
                                    mode="horizontal"
                                    className={'ant-menu-navbar' + (isBlogPage ? '' : 'ant-menu-navbar-blog')}
                                >
                                    {menuItems.reverse().map((item) => {
                                        return item.name === 'star-repo' ? (
                                            <AntMenu.Item className="headerKey star-repo-btn" key={item.name}>
                                                <StarRepoButton></StarRepoButton>
                                            </AntMenu.Item>
                                        ) : (
                                            <AntMenu.Item className="headerKey" key={item.link || item.a}>
                                                {item.a ? (
                                                    <a
                                                        href={item.a}
                                                        className={
                                                            isBlogPage
                                                                ? 'white '
                                                                : 'zambezi ' +
                                                                  (item.name === 'Login' && !isBlogPage
                                                                      ? ' login-btn'
                                                                      : '')
                                                        }
                                                    >
                                                        {item.name}
                                                    </a>
                                                ) : (
                                                    <Link to={item.link} className={isBlogPage ? 'white' : 'zambezi'}>
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
                                    className={
                                        (isHomePage ? 'burger-btn homepage-burger-btn' : 'burger-btn ') +
                                        (isBlogPage && ' blogpage-burger-btn')
                                    }
                                    type="link"
                                    onClick={() => {
                                        this.onChangeMenuState(menuItems.length)
                                    }}
                                    icon={menuOpen ? 'close' : 'menu'}
                                />
                            )}
                            {menuOpen && !sidebarDocked && (
                                <div id="navbar-responsive-wrapper">
                                    <div className="burger-menu-spacer"></div>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={menuItems}
                                        className="navbar-list"
                                        rowKey={(item) => item.a || item.link}
                                        renderItem={(item) => (
                                            <List.Item className="responsive-menu-item" key={menuItems.indexOf(item)}>
                                                {item.a ? (
                                                    <List.Item.Meta
                                                        title={
                                                            <a
                                                                href={item.a}
                                                                className={
                                                                    'responsive-menu-item-meta ' +
                                                                    (item.name === 'Login' ? ' login-btn' : '')
                                                                }
                                                                onClick={() => {
                                                                    this.onChangeMenuState(menuItems.length)
                                                                }}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        }
                                                    />
                                                ) : item.name === 'star-repo' ? (
                                                    <List.Item.Meta title={<StarRepoButton></StarRepoButton>} />
                                                ) : (
                                                    <List.Item.Meta
                                                        title={
                                                            <Link
                                                                to={item.link}
                                                                className="responsive-menu-item-meta"
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

const mapStateToProps = (state) => {
    return {
        menuOpen: getMenuState(state).open,
    }
}

const mapDispatchToProps = {
    onChangeMenuState,
}

// export default Menu
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
