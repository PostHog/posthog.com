import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React from 'react'
import '../styles/api-docs.scss'

import { RedocStandalone } from 'redoc'

export default function ApiEndpoint({ data }) {
    const {
        data: { id, items, name, url },
        components: { components },
    } = data
    const paths = {}
    JSON.parse(items).map((item) => {
        if (!paths[item.path]) {
            paths[item.path] = {}
        }
        paths[item.path][item.httpVerb] = item.operationSpec
    })
    return (
        <>
            <SEO title={`${name} - PostHog`} />
            <Layout>
                <div className="px-4 sticky top-[-2px] bg-tan dark:bg-primary z-10">
                    <Breadcrumbs
                        crumbs={[
                            {
                                title: 'Integrations',
                                url: '/integrations',
                            },
                            {
                                title: name,
                            },
                        ]}
                        darkModeToggle
                    />
                </div>
                <div className="max-w-screen-sm mx-auto px-4 flex flex-col md:flex-row items-start mt-16 md:mt-20">
                    <section className="article-content plugin-content">
                        <RedocStandalone
                            options={{
                                // See https://redoc.ly/docs/api-reference-docs/configuration/theming/ for more options
                                theme: {
                                    colors: {
                                        primary: {
                                            main: 'red',
                                        },
                                    },
                                },
                            }}
                            spec={{
                                openapi: '3.0.3',
                                info: { title: '', description: '' },
                                paths,
                                components: JSON.parse(components),
                            }}
                        />
                    </section>
                </div>
            </Layout>
        </>
    )
}

export const query = graphql`
    query ApiEndpoint($id: String!) {
        data: apiEndpoint(id: { eq: $id }) {
            id
            internal {
                content
                description
                ignoreType
                mediaType
            }
            items
            name
            url
        }
        components: apiComponents {
            components
        }
    }
`
