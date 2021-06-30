import React from 'react'
import { graphql } from 'gatsby'
import Markdown from 'react-markdown'

import Layout from '../../components/Layout'
import { SEO } from '../../components/seo'
import { ExportOutlined } from '@ant-design/icons'
import { DarkModeToggle } from '../../components/DarkModeToggle'
import { pluginInstallationMd } from '../../pages-content/plugin-installation'

const PluginPage = ({
    data: {
        allPlugin: { edges },
    },
    params: { plugin },
}) => {
    let plugins = []
    if (edges.length) {
        const edge = edges[0]
        plugins = edge.node.plugins
    }
    const activePlugin = plugins.find((p) => {
        return p.url.indexOf(plugin) > -1
    })
    if (!activePlugin) {
        // probably want to direct to 404
        return null
    }
    let markdown = `#${pluginInstallationMd}`
    if (activePlugin.url.includes('github.com/')) {
        markdown = activePlugin.markdown
    }
    if (!markdown.includes('Installation')) {
        markdown += pluginInstallationMd
    }
    markdown = markdown
        .split(/!\[.*\]\(.*\)/)
        .join('')
        .split(/<img\s+[^>]*>/)
        .join('')

    return (
        <div className="bg-offwhite-purple text-gray-900 dark:bg-darkmode-purple dark:text-white">
            <Layout headerBackgroundTransparent>
                <SEO title={activePlugin.name} description={activePlugin.description} />
                <div className="bg-offwhite-purple text-gray-900 bg-gradient-to-b dark:from-darkmode-purple dark:to-footer dark:text-white pb-12">
                    <div className="w-11/12 mx-auto text-right">
                        <DarkModeToggle />
                    </div>
                    <h1 className="center">{activePlugin.name}</h1>
                    <p className="center">{activePlugin.description}</p>
                    <div className="px-12">
                        <Markdown source={markdown} linkTarget="_blank" />
                    </div>
                    <a className="centered" href={activePlugin.url} target="_blank" rel="noreferrer">
                        Learn More <ExportOutlined />
                    </a>
                </div>
            </Layout>
        </div>
    )
}

export default PluginPage

export const pageQuery = graphql`
    query {
        allPlugin {
            edges {
                node {
                    id
                    plugins {
                        name
                        url
                        description
                        verified
                        maintainer
                        displayOnWebsiteLib
                        type
                        imageLink
                        markdown
                    }
                }
            }
        }
    }
`
