import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import CheckIcon from '../../images/check.svg'
import XIcon from '../../images/x.svg'
import List from 'components/List'

type LibraryNode = {
    fields: {
        slug: string
    }
    frontmatter: {
        title: string
        icon: {
            publicURL: string
        }
        features: LibraryFeatures | null
    }
}

type FrameworkNode = {
    fields: {
        slug: string
    }
    frontmatter: {
        title: string
        icon: {
            publicURL: string
        }
    }
}

type LibraryFeatures = {
    eventCapture: boolean
    autoCapture: boolean
    featureFlags: boolean
    groupAnalytics: boolean
    sessionRecording: boolean
    userIdentification: boolean
}

type LibraryData = {
    sdks: {
        nodes: LibraryNode[]
    }
    frameworks: {
        nodes: FrameworkNode[]
    }
}

export const SDKs = () => {
    const { sdks } = useStaticQuery<LibraryData>(query)

    return (
        <List
            className="grid sm:grid-cols-2 md:grid-cols-3"
            items={sdks.nodes.map(({ fields: { slug }, frontmatter: { title, icon } }) => ({
                label: title,
                url: slug,
                image: icon?.publicURL,
            }))}
        />
    )
}

export const Frameworks = () => {
    const { frameworks } = useStaticQuery<LibraryData>(query)

    return (
        <List
            className="grid sm:grid-cols-2 md:grid-cols-3"
            items={frameworks.nodes.map(({ fields: { slug }, frontmatter: { title, icon } }) => ({
                label: title,
                url: slug,
                image: icon?.publicURL,
            }))}
        />
    )
}

const query = graphql`
    {
        sdks: allMdx(
            filter: {
                fields: {
                    slug: {
                        in: [
                            "/docs/libraries/js"
                            "/docs/libraries/android"
                            "/docs/libraries/elixir"
                            "/docs/libraries/flutter"
                            "/docs/libraries/go"
                            "/docs/libraries/ios"
                            "/docs/libraries/java"
                            "/docs/libraries/node"
                            "/docs/libraries/php"
                            "/docs/libraries/python"
                            "/docs/libraries/react"
                            "/docs/libraries/react-native"
                            "/docs/libraries/ruby"
                            "/docs/libraries/rust"
                        ]
                    }
                }
            }
            sort: { fields: fields___pageViews, order: DESC }
        ) {
            nodes {
                ...sdk
            }
        }
        frameworks: allMdx(
            filter: {
                fields: {
                    slug: {
                        in: [
                            "/docs/libraries/angular"
                            "/docs/libraries/astro"
                            "/docs/libraries/bubble"
                            "/docs/libraries/django"
                            "/docs/libraries/docusaurus"
                            "/docs/libraries/flask"
                            "/docs/libraries/framer"
                            "/docs/libraries/gatsby"
                            "/docs/libraries/google-tag-manager"
                            "/docs/libraries/laravel"
                            "/docs/libraries/next-js"
                            "/docs/libraries/nuxt-js"
                            "/docs/libraries/remix"
                            "/docs/libraries/retool"
                            "/docs/libraries/rudderstack"
                            "/docs/libraries/segment"
                            "/docs/libraries/sentry"
                            "/docs/libraries/slack"
                            "/docs/libraries/shopify"
                            "/docs/libraries/svelte"
                            "/docs/libraries/vue-js"
                            "/docs/libraries/webflow"
                            "/docs/libraries/wordpress"
                        ]
                    }
                }
            }
            sort: { fields: slug, order: ASC }
        ) {
            nodes {
                ...framework
            }
        }
    }

    fragment framework on Mdx {
        fields {
            slug
        }
        frontmatter {
            title
            icon {
                publicURL
            }
        }
    }

    fragment sdk on Mdx {
        fields {
            slug
        }
        frontmatter {
            title
            icon {
                publicURL
            }
            features {
                eventCapture
                userIdentification
                autoCapture
                sessionRecording
                featureFlags
                groupAnalytics
            }
        }
    }
`
