import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import CustomerLogo from 'components/CustomerLogo'
import { useCustomers } from 'hooks/useCustomers'
import { IconArrowUpRight } from '@posthog/icons'

const STORIES_SHOWN = 2

interface Story {
    fields: { slug: string }
    frontmatter: { title: string }
}

export default function MoreCustomerStories({ currentSlug }: { currentSlug: string }): JSX.Element | null {
    const { customers } = useCustomers()
    const { stories } = useStaticQuery(graphql`
        query {
            stories: allMdx(
                filter: { fields: { slug: { regex: "/^/customers/" } } }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 3
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    `)
    const latestStories: Story[] = stories.nodes
        .filter((story: Story) => story.fields.slug !== currentSlug)
        .slice(0, STORIES_SHOWN)

    if (latestStories.length === 0) {
        return null
    }

    return (
        <div className="not-prose mt-12 rounded-md border border-primary bg-primary p-5">
            <h2 className="m-0 mb-4 text-xl font-bold">More customer stories</h2>
            <ul className="m-0 list-none space-y-4 p-0">
                {latestStories.map((story) => {
                    const customer = customers[story.fields.slug.split('/').pop() || '']
                    return (
                        <li key={story.fields.slug} className="flex items-center gap-4">
                            {customer && (
                                <div className="flex h-8 w-24 shrink-0 items-center">
                                    <CustomerLogo customer={customer} className="h-6 max-w-24" />
                                </div>
                            )}
                            <Link
                                to={story.fields.slug}
                                state={{ newWindow: true }}
                                className="font-semibold leading-tight text-primary hover:underline"
                            >
                                {story.frontmatter.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <Link
                to="/customers"
                state={{ newWindow: true }}
                className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold"
            >
                See all customer stories
                <IconArrowUpRight className="size-4 text-muted group-hover:text-primary" />
            </Link>
        </div>
    )
}
