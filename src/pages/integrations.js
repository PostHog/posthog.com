import Breadcrumbs from 'components/Breadcrumbs'
import { CallToAction } from 'components/CallToAction'
import Card from 'components/Card'
import Checkbox from 'components/Checkbox'
import { heading, section } from 'components/Home/classes'
import { Puzzle, Segment, Sentry, Zapier } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Logo from 'components/Logo'
import { SEO } from 'components/seo'
import { motion } from 'framer-motion'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
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

const Filters = ({ filterableData, filters, handleFilterChange }) => {
    return (
        <aside className="w-[300px] md:sticky top-20">
            <div className="mb-5">
                <h5>Search</h5>
                <input
                    id="integrations-search"
                    className="w-full text-xs text-primary dark:text-primary-dark outline-none bg-transparent py-2 placeholder-primary-50::placeholder dark:placeholder-primary-dark-50::placeholder border border-solid rounded-sm"
                    placeholder="BigQuery Export"
                    style={{ paddingLeft: 5, borderColor: '#9A9A9A', maxWidth: 175, paddingRight: 4 }}
                    onChange={(e) => handleFilterChange(e, 'search', e.target.value)}
                />
            </div>

            <ul className="list-none p-0 m-0 flex flex-col space-y-6">
                {Object.keys(filterableData).map((filter) => {
                    return (
                        <li key={filter}>
                            <h5 className="inline-block">{filter}</h5>
                            <ul className="list-none p-0 m-0 flex flex-col space-y-2">
                                {filterableData[filter].map((type) => {
                                    return (
                                        <li key={type} className="flex items-center space-x-2 text-base font-semibold">
                                            <Checkbox
                                                checked={filters[filter]?.includes(type)}
                                                value={type.replace('_', ' ')}
                                                onChange={(e) => handleFilterChange(e, filter, type)}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}

const Cards = ({ data }) => {
    return (
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 md:pl-6 m-0 flex-grow w-full gap-4"
        >
            {data.map((integration) => {
                const {
                    id,
                    name,
                    description,
                    url,
                    slug,
                    Maintainer,
                    verified,
                    logo,
                    internal: { type },
                } = integration

                const Logo = logos[name]
                const MaintainerIcon = maintainerIcons[Maintainer]
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
                            url={slug || url}
                            className="text-primary dark:text-white hover:text-primary dark:hover:text-white p-6 relative block w-full h-full dark:bg-gray-accent-dark"
                        >
                            <h3 className="flex flex-col text-xl text-primary dark:text-white">
                                {logo ? (
                                    <GatsbyImage
                                        className="w-12 mb-4 p-4 rounded bg-white shadow"
                                        image={getImage(logo)}
                                    />
                                ) : (
                                    Logo && (
                                        <span className="w-12 h-12 mb-4 p-4 rounded bg-white shadow relative text-primary dark:text-primary">
                                            <Logo className="w-full h-full absolute object-cover inset-0 p-2" />
                                        </span>
                                    )
                                )}

                                <span>{name}</span>
                            </h3>
                            <p className="opacity-75">{description}</p>
                            <span className="absolute right-3 top-2 flex space-x-1">
                                {MaintainerIcon && MaintainerIcon}
                                {type === 'Plugin' && (
                                    <span title="Plugin" className="text-gray">
                                        <Puzzle className="w-5 h-5" />
                                    </span>
                                )}
                            </span>
                        </Card>
                    </motion.li>
                )
            })}
        </motion.ul>
    )
}

export default function Integrations({ data: { allIntegration, allPlugin } }) {
    const data = [...allPlugin.plugins, ...allIntegration.integrations]
    const filterableData = {
        Maintainer: ['official', 'community'],
        Category: ['data_in', 'data_out', 'ingestion_filtering'],
    }

    const [filteredData, setFilteredData] = useState(null)
    const [filters, setFilters] = useState(Object.fromEntries(Object.entries(filterableData).map(([key]) => [key, []])))
    const handleFilterChange = (e, filter, value) => {
        let newFilters = { ...filters }
        if (filter === 'search') {
            newFilters.search = value
        } else {
            const { checked } = e.target
            if (!checked) {
                newFilters[filter].splice(newFilters[filter].indexOf(value), 1)
            } else {
                newFilters = { ...newFilters, [filter]: [...newFilters[filter], value] }
            }
        }

        setFilters(newFilters)
    }

    useEffect(() => {
        const filtered = data.filter((item) => {
            return Object.keys(filters).every((key) => {
                if (key === 'search') {
                    return item.name.toLowerCase().includes(filters[key].toLowerCase())
                }
                return (
                    filters[key].length <= 0 ||
                    filters[key].some((filterBy) => {
                        return item[key] === filterBy
                    })
                )
            })
        })
        setFilteredData(filtered)
    }, [filters])

    // In order to show integrations correctly, a valid GitHub API key
    // must be added as an environment variable GITHUB_API_KEY.

    return (
        <Layout>
            <SEO title="Integrate PostHog" description="Keep your entire product stack in sync with PostHog" />
            <div className="px-4 sticky top-[-2px] bg-tan dark:bg-primary z-10">
                <Breadcrumbs
                    crumbs={[
                        {
                            title: 'Integrations',
                        },
                    ]}
                    darkModeToggle
                />
            </div>
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
                        <Filters
                            filterableData={filterableData}
                            filters={filters}
                            handleFilterChange={handleFilterChange}
                        />
                        <div className="flex-grow w-full">
                            <Cards data={filteredData || data} />
                            <div className="text-center mt-12">
                                <h2 className={heading('sm')}>Didn't find the integration you need?</h2>
                                <CallToAction className="mt-4" to="/docs/plugins/build">
                                    Build your own!
                                </CallToAction>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query IntegrationsQuery {
        allIntegration {
            integrations: nodes {
                id
                internal {
                    type
                }
                name
                description
                url
                Maintainer: maintainer
                verified
            }
        }
        allPlugin {
            plugins: nodes {
                id
                internal {
                    type
                }
                Category: type
                name
                description
                url
                slug
                Maintainer: maintainer
                verified
                logo {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`
