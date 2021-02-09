import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Button from 'antd/lib/button'
import List from 'antd/lib/list'
import { Menu as AntMenu } from 'antd'
import { layoutLogic } from '../../logic/layoutLogic'
import { useActions, useValues } from 'kea'

interface MenuProps {
    isBlogArticlePage?: boolean
    isHomePage?: boolean
    activeKey: string
}

interface MenuQueryNodeType {
    node: {
        name: string
        link: string
        a: string
    }
}

interface MenuQueryType {
    allMenuItemsJson: {
        edges: MenuQueryNodeType[]
    }
}

function Menu({ isBlogArticlePage = false, isHomePage = false, activeKey }: MenuProps) {
    const { menuOpen } = useValues(layoutLogic)
    const { onChangeMenuState, setIsGetStartedModalOpen } = useActions(layoutLogic)

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
            render={(data: MenuQueryType) => {
                const menuItems = data.allMenuItemsJson.edges.map((edge) => edge.node)
                return (
                    <div className="headerItems">
                        <AntMenu
                            mode="horizontal"
                            className={
                                'ant-menu-navbar display-desktop ' + (isBlogArticlePage ? '' : 'ant-menu-navbar-blog')
                            }
                        >
                            <AntMenu.Item className="header-key main-nav-cta-wrapper">
                                <a onClick={() => setIsGetStartedModalOpen(true)}>
                                    <span
                                        className={
                                            'main-nav-cta ' +
                                            (isBlogArticlePage || isHomePage
                                                ? 'main-nav-cta-dark-bg'
                                                : 'main-nav-cta-light-bg')
                                        }
                                    >
                                        Get started now
                                    </span>
                                </a>
                            </AntMenu.Item>
                            {menuItems.reverse().map((item) => {
                                return (
                                    <AntMenu.Item
                                        className={
                                            'header-key' +
                                            (item.name.toLowerCase() === activeKey ? ' header-key-active' : '')
                                        }
                                        key={item.link || item.a}
                                    >
                                        {item.a ? (
                                            <a
                                                href={item.a}
                                                className={isBlogArticlePage || isHomePage ? 'white ' : 'zambezi '}
                                            >
                                                <span>{item.name}</span>
                                            </a>
                                        ) : (
                                            <Link
                                                to={item.link}
                                                className={isBlogArticlePage || isHomePage ? 'white' : 'zambezi'}
                                            >
                                                <span>{item.name}</span>
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
                                        <>
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
                                        </>
                                    )}
                                >
                                    <List.Item className="responsive-menu-item centered">
                                        <List.Item.Meta
                                            title={
                                                <a
                                                    className="responsive-menu-item-meta"
                                                    onClick={() => setIsGetStartedModalOpen(true)}
                                                >
                                                    Get Started For Free
                                                </a>
                                            }
                                        />
                                    </List.Item>
                                </List>
                            </div>
                        )}
                    </div>
                )
            }}
        />
    )
}

export default Menu
export { Menu }
