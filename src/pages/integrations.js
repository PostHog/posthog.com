import Card from 'components/Card'
import Checkbox from 'components/Checkbox'
import { heading, section } from 'components/Home/classes'
import { Check, Segment, Sentry, Zapier } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Logo from 'components/Logo'
import { SEO } from 'components/seo'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const logos = {
    Segment,
    Zapier,
    Sentry,
}

const maintainerIcons = {
    official: (
        <span title="Officially maintained">
            <Logo noText className="w-5 h-5" />
        </span>
    ),
    community: (
        <span title="Community maintained">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
        </span>
    ),
}

export default function Integrations({
    data: {
        allIntegrations: { integrations, maintainers },
    },
}) {
    const [filteredIntegrations, setFilteredIntegrations] = useState(null)
    const [filters, setFilters] = useState({
        maintainer: [],
    })

    const handleChange = (e, filter) => {
        const { value, checked } = e.target
        let newFilters = { ...filters }
        if (!checked) {
            newFilters[filter].splice(newFilters[filter].indexOf(value), 1)
        } else {
            newFilters = { ...newFilters, [filter]: [...newFilters[filter], value] }
        }
        setFilters(newFilters)
    }

    useEffect(() => {
        const filtered = integrations.filter((integration) => {
            return Object.keys(filters).every((key) => {
                return filters[key].some((filterBy) => {
                    return integration[key] === filterBy
                })
            })
        })
        setFilteredIntegrations(filtered.length <= 0 ? null : filtered)
    }, [filters])

    return (
        <Layout>
            <SEO title="Integrate PostHog" description="Keep your entire product stack in sync with PostHog" />
            <div>
                <section>
                    <div className={section()}>
                        <h1 className={heading()}>Integrations</h1>
                        <h2 className={heading('sm')}>Keep your entire product stack in sync with PostHog</h2>
                    </div>
                    <div
                        className={section(
                            'flex space-y-12 md:space-y-0 md:space-x-4 flex-col md:flex-row items-start relative'
                        )}
                    >
                        <aside className="w-[300px] md:sticky top-4">
                            <h5 className="border-b border-dashed border-gray-accent-light inline-block">Maintainer</h5>
                            <ul className="list-none p-0 m-0 flex flex-col space-y-2 mt-2">
                                {maintainers.map((maintainer) => {
                                    const { type } = maintainer
                                    return (
                                        <li key={type} className="flex items-center space-x-2 text-base font-semibold">
                                            <Checkbox value={type} onChange={(e) => handleChange(e, 'maintainer')} />
                                        </li>
                                    )
                                })}
                            </ul>
                        </aside>
                        <motion.ul
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.05,
                                    },
                                },
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 md:pl-6 m-0 flex-grow w-full"
                        >
                            {(filteredIntegrations || integrations).map((integration) => {
                                const { id, name, description, url, maintainer, verified } = integration
                                const Logo = logos[name]
                                const MaintainerIcon = maintainerIcons[maintainer]
                                return (
                                    <motion.li
                                        className="list-none"
                                        variants={{
                                            hidden: { translateY: '-20%', opacity: 0 },
                                            show: { translateY: 0, opacity: 1 },
                                        }}
                                        key={id}
                                    >
                                        <Card
                                            url={url}
                                            className="text-primary hover:text-primary p-6 relative block w-full h-full"
                                        >
                                            <h3 className="flex items-center">
                                                {Logo && (
                                                    <span>
                                                        <Logo className="mr-2" />
                                                    </span>
                                                )}
                                                <span>{name}</span>
                                            </h3>
                                            <p>{description}</p>
                                            <span className="absolute right-3 top-3 flex space-x-1">
                                                {verified && (
                                                    <span title="Verified">
                                                        <Check className="text-[green] h-5 w-5" />
                                                    </span>
                                                )}
                                                {MaintainerIcon && MaintainerIcon}
                                            </span>
                                        </Card>
                                    </motion.li>
                                )
                            })}
                        </motion.ul>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query IntegrationsQuery {
        allIntegration {
            maintainers: group(field: maintainer) {
                type: fieldValue
            }
            integrations: nodes {
                id
                name
                description
                url
                maintainer
                verified
            }
        }
    }
`
