import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import getUuid from 'uuid-by-string'

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter }) => {
    try {
        const { data, errors } = await graphql(`
            {
                docs: allMdx(filter: { fields: { slug: { regex: "/^/docs/" } } }) {
                    nodes {
                        id
                        slug
                        content: rawBody
                    }
                }
                handbook: allMdx(filter: { fields: { slug: { regex: "/^/handbook/" } } }) {
                    nodes {
                        id
                        slug
                        content: rawBody
                    }
                }
                tutorials: allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) {
                    nodes {
                        id
                        slug
                        content: rawBody
                    }
                }
            }
        `)

        if (errors) {
            throw new Error(errors)
        }

        const body = {
            entries: [
                ...data.tutorials.nodes.map((node) => ({
                    id: getUuid(node.content),
                    content: node.content,
                    meta: {
                        slug: node.slug,
                        type: 'tutorials',
                    },
                })),
            ],
        }

        await fetch('http://max.posthog.cc/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
    } catch (error) {
        reporter.panic(error)
    }
}
