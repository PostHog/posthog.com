import Card from 'components/Card'
import Checkbox from 'components/Checkbox'
import Chip from 'components/Chip'
import { heading, section } from 'components/Home/classes'
import { Segment, Sentry, Zapier } from 'components/Icons/Icons'
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

const DataSection = ({ data: { data, filterableData }, dataType, setDataType }) => {
    const initialFilters = (filterableData) =>
        Object.fromEntries(Object.entries(filterableData).map(([key]) => [key, []]))
    const [filteredData, setFilteredData] = useState(null)
    const [filters, setFilters] = useState(initialFilters(filterableData))
    const handleChange = (e, filter, value) => {
        const { checked } = e.target
        let newFilters = { ...filters }
        if (!checked) {
            newFilters[filter].splice(newFilters[filter].indexOf(value), 1)
        } else {
            newFilters = { ...newFilters, [filter]: [...newFilters[filter], value] }
        }
        setFilters(newFilters)
    }

    useEffect(() => {
        const filtered = data.filter((item) => {
            return Object.keys(filters).every((key) => {
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

    useEffect(() => {
        setFilteredData(null)
        setFilters(initialFilters(filterableData))
    }, [filterableData])

    return (
        <div className={section('flex space-y-12 md:space-y-0 md:space-x-4 flex-col md:flex-row items-start relative')}>
            <aside className="w-[300px] md:sticky top-4">
                <ul className="list-none p-0 m-0 flex flex-col space-y-6">
                    <li>
                        <h5 className="border-b border-dashed border-gray-accent-light inline-block">Type</h5>
                        <ul className="list-none p-0 m-0 flex mt-2 space-x-2">
                            <li>
                                <Chip onClick={() => setDataType('plugins')} active={dataType === 'plugins'}>
                                    Plugin
                                </Chip>
                            </li>
                            <li>
                                <Chip onClick={() => setDataType('integrations')} active={dataType === 'integrations'}>
                                    Integration
                                </Chip>
                            </li>
                        </ul>
                    </li>
                    {Object.keys(filterableData).map((filter) => {
                        return (
                            <li key={filter}>
                                <h5 className="border-b border-dashed border-gray-accent-light inline-block">
                                    {filter}
                                </h5>
                                <ul className="list-none p-0 m-0 flex flex-col space-y-2 mt-2">
                                    {filterableData[filter].map(({ type }) => {
                                        return (
                                            <li
                                                key={type}
                                                className="flex items-center space-x-2 text-base font-semibold"
                                            >
                                                <Checkbox
                                                    checked={filters[filter]?.includes(type)}
                                                    value={type.replace('_', ' ')}
                                                    onChange={(e) => handleChange(e, filter, type)}
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
                {(filteredData || data).map((integration) => {
                    const { id, name, description, url, Maintainers, verified, logo } = integration

                    const Logo = logos[name]
                    const MaintainerIcon = maintainerIcons[Maintainers]
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
                                <h3 className="flex items-center text-xl">
                                    {logo ? (
                                        <GatsbyImage className="w-7 mr-2" image={getImage(logo)} />
                                    ) : (
                                        Logo && (
                                            <span>
                                                <Logo className="mr-2" />
                                            </span>
                                        )
                                    )}

                                    <span>{name}</span>
                                </h3>
                                <p>{description}</p>
                                <span className="absolute right-3 top-2 flex space-x-1">
                                    {MaintainerIcon && MaintainerIcon}
                                </span>
                            </Card>
                        </motion.li>
                    )
                })}
            </motion.ul>
        </div>
    )
}

export default function Integrations({ data: { allIntegration, allPlugin } }) {
    const data = {
        plugins: {
            data: allPlugin.plugins,
            filterableData: {
                Maintainers: allPlugin.maintainers,
                Categories: allPlugin.types,
            },
        },
        integrations: {
            data: allIntegration.integrations,
            filterableData: {
                Maintainers: allIntegration.maintainers,
            },
        },
    }
    const [dataType, setDataType] = useState('plugins')
    return (
        <Layout>
            <SEO title="Integrate PostHog" description="Keep your entire product stack in sync with PostHog" />
            <div>
                <section>
                    <div className={section()}>
                        <h1 className={heading()}>Integrations</h1>
                        <h2 className={heading('sm')}>Keep your entire product stack in sync with PostHog</h2>
                    </div>
                    <DataSection setDataType={setDataType} dataType={dataType} data={data[dataType]} />
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
                Maintainers: maintainer
                verified
            }
        }
        allPlugin {
            maintainers: group(field: maintainer) {
                type: fieldValue
            }
            types: group(field: type) {
                type: fieldValue
            }
            plugins: nodes {
                id
                Categories: type
                name
                description
                url
                Maintainers: maintainer
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
