import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Button from 'antd/lib/button'
import List from 'antd/lib/list'
import { Menu as AntMenu } from 'antd'
import { layoutLogic } from '../../logic/layoutLogic'
import { useActions, useValues } from 'kea'

function Menu({ isBlogArticlePage, isHomePage }) {
    const { menuOpen } = useValues(layoutLogic)
    const { onChangeMenuState } = useActions(layoutLogic)

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
                        <AntMenu
                            mode="horizontal"
                            className={
                                'ant-menu-navbar display-desktop ' + (isBlogArticlePage ? '' : 'ant-menu-navbar-blog')
                            }
                        >
                            {menuItems.reverse().map((item) => {
                                return (
                                    <AntMenu.Item className="headerKey" key={item.link || item.a}>
                                        {item.a ? (
                                            <a
                                                href={item.a}
                                                className={
                                                    isBlogArticlePage
                                                        ? 'white '
                                                        : 'zambezi ' +
                                                          (item.name === 'Login' && !isBlogArticlePage
                                                              ? ' login-btn'
                                                              : '')
                                                }
                                            >
                                                {item.name}
                                            </a>
                                        ) : (
                                            <Link to={item.link} className={isBlogArticlePage ? 'white' : 'zambezi'}>
                                                {item.name}
                                            </Link>
                                        )}
                                    </AntMenu.Item>
                                )
                            })}
                        </AntMenu>
                        <Button
                            className={
                                'display-mobile ' +
                                (isHomePage ? 'burger-btn homepage-burger-btn' : 'burger-btn ') +
                                (isBlogArticlePage && ' blogpage-burger-btn')
                            }
                            type="link"
                            onClick={() => {
                                onChangeMenuState(menuItems.length)
                            }}
                            icon={menuOpen ? 'close' : 'menu'}
                        />
                        {menuOpen && (
                            <div id="navbar-responsive-wrapper" className="display-mobile">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={menuItems.reverse()}
                                    className="navbar-list"
                                    rowKey={(item) => item.a || item.link}
                                    renderItem={(item) => (
                                        <List.Item className="responsive-menu-item" key={menuItems.indexOf(item)}>
                                            <List.Item.Meta
                                                title={
                                                    item.a ? (
                                                        <a
                                                            href={item.a}
                                                            className={
                                                                'responsive-menu-item-meta ' +
                                                                (item.name === 'Login' ? ' login-btn' : '')
                                                            }
                                                            onClick={() => {
                                                                onChangeMenuState(menuItems.length)
                                                            }}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            to={item.link}
                                                            className="responsive-menu-item-meta"
                                                            onClick={() => {
                                                                onChangeMenuState(menuItems.length)
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )
                                                }
                                            />
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

export default Menu
