import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
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
                    <div className="flex justify-between items-center">
                        <AntMenu.Item className="header-key main-nav-cta-wrapper">
                            <a onClick={() => setIsGetStartedModalOpen(true)}>
                                <span
                                    className=""
                                >
                                    Get started now
                                </span>
                            </a>
                        </AntMenu.Item>
                    </div>
                )
            }}
        />
    )
}

export default Menu
export { Menu }
