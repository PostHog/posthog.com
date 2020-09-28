import React, { useEffect } from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import './SidebarContents.css'
import { useActions, useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import { featureFlagLogic } from '../../logic/featureFlagLogic'

const SubMenu = Menu.SubMenu


function SidebarContents() {
    const { featureFlags } = useValues(featureFlagLogic)
    
    useEffect(() => {
        if (!featureFlags['launch-tutorials-section']) {
            const tutorialsDiv = window.document.getElementById('tutorials-sidebar-item')
            if (tutorialsDiv) {
                tutorialsDiv.style.display = 'none'
            }
        }
    }, [featureFlags])

    const {
        sidebarSelectedKey: selectedKey,
        sidebarExpandedKeys: expandedKeys,
        sidebarEntry: entry,
        sidebarSelectedEntry: selectedEntry,
        sidebarContentTree: contentTree,
        sidebarContentDir: contentDir,
    } = useValues(layoutLogic)

    const { setSidebarOpen, onSidebarContentExpanded, setSidebarContentStructure } = useActions(layoutLogic)

    return (
        <StaticQuery
            query={graphql`
                query sidebarContentQuery {
                    allMarkdownRemark(sort: { order: ASC, fields: [fields___slug] }) {
                        nodes {
                            fields {
                                slug
                            }
                            id
                            frontmatter {
                                title
                            }
                        }
                    }
                    allSidebarsJson {
                        nodes {
                            id
                            name
                            entry
                            child_entries
                            items
                        }
                    }
                }
            `}
            render={(data) => {
                const entries = data.allSidebarsJson.nodes
                const pages = data.allMarkdownRemark.nodes
                let dir = []
                let tree = null
                let defaultOpenKeys = []

                const convertToTree = (entry, parent) => {
                    if (!entry) {
                        return
                    }
                    const rootEntry = getEntry(entry)
                    const child_dir = rootEntry?.child_entries?.map((item) => convertToTree(item, rootEntry.id))
                    let children = itemToNode(rootEntry)
                    if (children && child_dir) children = children.concat(child_dir)
                    else if (children === null) children = child_dir
                    const node = {
                        key: rootEntry.id,
                        title: rootEntry.name,
                        children: children,
                        parent: parent,
                    }
                    dir.push(node)
                    return node
                }

                const getEntry = (entry) => {
                    for (let item in entries) {
                        if (entries[item].name === entry) return entries[item]
                    }
                    return null
                }
                const getNode = (key) => {
                    for (let item in dir) {
                        if (dir[item].key === key) return dir[item]
                    }
                    return null
                }

                const itemToNode = (entry) => {
                    if (entry.items == null) return null
                    return entry.items.map((item) => {
                        return getPage('/' + item, entry.id)
                    })
                }

                const getPage = (path, parent) => {
                    for (let item in pages) {
                        if (pages[item].fields.slug === path) {
                            const node = {
                                path: pages[item].fields.slug,
                                key: pages[item].id,
                                title: pages[item].frontmatter.title,
                                parent: parent,
                            }
                            dir.push(node)
                            return node
                        }
                    }
                    return null
                }

                const addOpenKeys = (key) => {
                    if (key && key !== selectedKey) defaultOpenKeys.push(key)
                    const parent = getNode(key)
                    if (parent) addOpenKeys(parent.parent)
                }

                if (selectedEntry === null || selectedEntry !== entry) {
                    tree = convertToTree(entry, null)
                    if (tree) {
                        setSidebarContentStructure(entry, tree, dir)
                        addOpenKeys(selectedKey)
                        onSidebarContentExpanded(defaultOpenKeys)
                    }
                } else {
                    tree = contentTree
                    dir = contentDir
                    defaultOpenKeys = expandedKeys
                }

                const loop = (root) => {
                    if (root.children) {
                        return root.children.map((item) => {
                            if (item.path) {
                                return (
                                    <Menu.Item key={item.key} className="keySelected">
                                        <Link
                                            className="keySelectedLink"
                                            to={item.path}
                                            onClick={() => setSidebarOpen(false)}
                                            style={{ float: 'left' }}
                                        >
                                            {item.title}
                                        </Link>
                                    </Menu.Item>
                                )
                            }
                            return (
                                <SubMenu
                                    className="submenuSelected"
                                    id={item.title.toLowerCase() + '-sidebar-item'}
                                    key={item.key}
                                    title={<span style={{ fontWeight: 750 }}>{item.title}</span>}
                                >
                                    {loop(item)}
                                </SubMenu>
                            )
                        })
                    }
                }
                return (
                    <Menu
                        mode="inline"
                        defaultOpenKeys={defaultOpenKeys}
                        selectedKeys={[selectedKey]}
                        inlineIndent={12}
                        onOpenChange={onSidebarContentExpanded}
                        style={{ height: '100%', backgroundColor: '#F9F9F9' }}
                        theme="light"
                    >
                        {loop(tree)}
                    </Menu>
                )
            }}
        />
    )
}

export default SidebarContents
