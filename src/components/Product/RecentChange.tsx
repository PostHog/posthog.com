import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import Markdown from 'components/Squeak/components/Markdown'

export default function RecentChange({ team }) {
    const data = useStaticQuery(graphql`
        query RecentRoadmapChangeQuery {
            allRoadmap(filter: { complete: { eq: true } }, sort: { fields: date, order: DESC }) {
                nodes {
                    teams {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                    title
                    date(formatString: "MMM YYYY")
                    description
                    cta {
                        label
                        url
                    }
                }
            }
        }
    `)

    const [{ title, date, description, cta }] = data.allRoadmap.nodes.filter(({ teams: { data } }) =>
        data.some(({ attributes: { name } }) => name === team)
    )
    return (
        <div>
            <h4 className="opacity-60 text-base">Latest update</h4>
            <p className="text-sm opacity-60 m-0">{date}</p>
            <h4 className="text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow">{title}</h4>
            <div>
                <Markdown>{description}</Markdown>
            </div>

            {cta?.url && (
                <CallToAction to={cta.url} type="secondary" size="sm" className="mt-2">
                    {cta.label}
                </CallToAction>
            )}
        </div>
    )
}
