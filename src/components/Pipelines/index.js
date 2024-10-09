import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import Layout from '../Layout'
import { SEO } from 'components/seo'
import { AnimatePresence, motion } from 'framer-motion'
import { IconSearch, IconDecisionTree } from '@posthog/icons'
import Fuse from 'fuse.js'
import Select from 'components/Select'
import SideModal from 'components/Modal/SideModal'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { TemplateParametersFactory } from '../../templates/Handbook'
import { useLayoutData } from 'components/Layout/hooks'
import { Hero } from 'components/Products/Hero'
import { StaticImage } from 'gatsby-plugin-image'
import { MenuItem, menuVariants } from 'components/PostLayout/Menu'

const sources = [
    {
        id: 'source-stripe',
        name: 'Stripe',
        description: 'Payment processing platform',
        icon_url: '/static/services/stripe.png',
        category: ['Custom'],
    },
    {
        id: 'source-hubspot',
        name: 'Hubspot',
        description: 'CRM platform',
        icon_url: '/static/services/hubspot.png',
        category: ['CRM'],
    },
    {
        id: 'source-postgres',
        name: 'Postgres',
        description: 'Open source relational database',
        icon_url: '/static/services/postgres.png',
        category: ['Custom'],
    },
    {
        id: 'source-mysql',
        name: 'MySQL',
        description: 'Popular open-source database',
        icon_url: '/static/services/mysql.png',
        category: ['Custom'],
    },
    {
        id: 'source-mssql',
        name: 'MSSQL',
        description: 'Microsoft SQL Server',
        icon_url: '/static/services/sql-azure.png',
        category: ['Custom'],
    },
    {
        id: 'source-zendesk',
        name: 'Zendesk',
        description: 'Customer service software',
        icon_url: '/static/services/zendesk.png',
        category: ['Customer Success'],
    },
    {
        id: 'source-snowflake',
        name: 'Snowflake',
        description: 'Cloud data platform',
        icon_url: '/static/services/snowflake.png',
        category: ['Analytics'],
    },
    {
        id: 'source-salesforce',
        name: 'Salesforce',
        description: 'Customer relationship management',
        icon_url: '/static/services/salesforce.png',
        category: ['CRM'],
    },
    {
        id: 'source-vitally',
        name: 'Vitally',
        description: 'Customer success platform',
        icon_url: '/static/services/vitally.png',
        category: ['Customer Success'],
    },
    {
        id: 'source-bigquery',
        name: 'BigQuery',
        description: 'Google Cloud data warehouse',
        icon_url: '/static/services/bigquery.png',
        category: ['Analytics'],
    },
]

const Category = ({ onClick, value, active }) => {
    return (
        <>
            <button
                onClick={() => onClick(value)}
                className={`group text-left text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark flex w-full justify-between items-center relative text-[15px] md:px-0 md:pl-3 py-0.5 rounded cursor-pointer px-2 md:border-none border border-border dark:border-dark ${
                    active ? 'border-inherit dark:border-inherit' : ''
                }`}
            >
                <AnimatePresence>
                    {active && (
                        <motion.span
                            variants={menuVariants}
                            className="absolute w-[4px] bg-red rounded-[2px] top-[2px] h-[calc(100%_-_4px)] left-0 md:inline hidden"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        />
                    )}
                </AnimatePresence>
                <MenuItem color={active} name={value} />
            </button>
        </>
    )
}

const Categories = ({ type, categories, onClick, selectedCategory, selectedType }) => {
    return (
        <li className="mt-3">
            <p className="flex gap-2 items-baseline text-sm font-semibold md:mx-3 mb-1">
                <span className="opacity-25">{type}</span>
            </p>
            <ul className="list-none m-0 p-0 md:block flex whitespace-nowrap flex-wrap md:mx-0 -mx-1">
                {['All', ...categories].map((category) => {
                    const active = selectedType === type && selectedCategory === category
                    return (
                        <li className="md:m-0 m-1" key={category}>
                            <Category key={category} value={category} onClick={onClick} active={active} />
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

function PipelinesPage({ location }) {
    const {
        destinations: { nodes },
    } = useStaticQuery(query)

    const [searchValue, setSearchValue] = React.useState('')

    const [selectedCategory, setSelectedCategory] = React.useState('All')
    const [selectedType, setSelectedType] = React.useState('All')

    const pipelines = {
        Sources: sources,
        Destinations: nodes,
    }

    const nodesByCategory = useMemo(() => {
        if (selectedType === 'All') {
            return Object.values(pipelines).flat()
        }
        return pipelines[selectedType].filter(
            (node) => selectedCategory === 'All' || node.category.includes(selectedCategory)
        )
    }, [selectedType, selectedCategory, pipelines])
    const fuse = useMemo(() => new Fuse(nodesByCategory, { keys: ['name', 'description'] }), [nodesByCategory])
    const filteredNodes = searchValue ? fuse.search(searchValue).map(({ item }) => item) : nodesByCategory
    const [selectedDestination, setSelectedDestination] = React.useState(null)
    const [modalOpen, setModalOpen] = React.useState(false)
    const { fullWidthContent } = useLayoutData()

    const product = {
        slug: 'cdp',
        lowercase: 'cdp',
        capitalized: 'CDP',
        freeTier: '10m rows',
    }

    return (
        <Layout>
            <SEO
                title="CDP sources & destinations"
                description="Get all your data into PostHog with 60+ sources & destinations"
                image={`images/og/cdp.jpg`}
            />
            <SideModal
                title={
                    selectedDestination ? (
                        <div className="flex space-x-2">
                            <div className="size-7 flex-shrink-0">
                                <img
                                    className="w-full"
                                    src={`https://app.posthog.com/${selectedDestination.icon_url}`}
                                    alt={selectedDestination.name}
                                />
                            </div>
                            <span>{selectedDestination.name}</span>
                        </div>
                    ) : (
                        ''
                    )
                }
                open={modalOpen}
                setOpen={setModalOpen}
                className="max-w-screen-md"
            >
                {selectedDestination && (
                    <div className="article-content">
                        <MDXProvider
                            components={{
                                TemplateParameters: TemplateParametersFactory(selectedDestination.inputs_schema),
                            }}
                        >
                            <MDXRenderer>{selectedDestination.mdx.body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                )}
            </SideModal>

            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="sky-blue"
                    icon={<IconDecisionTree />}
                    product={product.capitalized}
                    title="Customer data platform"
                    description="Import from a data warehouse to analyze your data with PostHog product data and send it all to 25+ destinations."
                    beta
                />

                <div className="text-center -mb-12 md:-mb-28">
                    <StaticImage
                        src="../../images/products/screenshot-cdp.png"
                        alt="Screenshot of PostHog's CDP"
                        className="w-full max-w-[1280px]"
                        placeholder="none"
                    />
                </div>
            </div>

            <div className="@container max-w-screen-2xl px-5 mx-auto grid md:grid-cols-4 py-12">
                <div className="md:col-span-4 md:mb-4">
                    <h2 className="text-center text-2xl lg:text-4xl">Sources &amp; destinations library</h2>

                    <div className="md:max-w-lg mx-auto mb-5 rounded-md border border-border dark:border-dark py-3 px-4 bg-white dark:bg-accent-dark flex space-x-1.5">
                        <IconSearch className="w-5 opacity-60" />
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="bg-transparent w-full border-none outline-none"
                            placeholder="Search destinations"
                        />
                    </div>
                </div>
                <aside className="md:col-span-1">
                    <Category
                        active={selectedType === 'All' && selectedCategory === 'All'}
                        value="All sources & destinations"
                        onClick={() => {
                            setSelectedType('All')
                            setSelectedCategory('All')
                        }}
                    />
                    <ul className="list-none m-0 p-0">
                        {Object.keys(pipelines).map((type) => {
                            const values = pipelines[type]
                            return (
                                <Categories
                                    key={type}
                                    categories={[...new Set(values.flatMap((value) => value.category))].sort()}
                                    selectedCategory={selectedCategory}
                                    selectedType={selectedType}
                                    onClick={(value) => {
                                        setSelectedType(type)
                                        setSelectedCategory(value)
                                    }}
                                    type={type}
                                />
                            )
                        })}
                    </ul>
                </aside>
                <section className="md:col-span-3 md:mt-0 mt-5">
                    <ul className="list-none m-0 p-0 grid @lg:grid-cols-2 @2xl:grid-cols-1 @3xl:grid-cols-2 @6xl:grid-cols-3 gap-2 md:gap-4">
                        {filteredNodes.map((destination) => {
                            const { id, name, description, icon_url } = destination
                            const Container = destination.mdx ? 'button' : 'div'
                            return (
                                <li key={id}>
                                    <Container
                                        {...(destination.mdx
                                            ? {
                                                  onClick: () => {
                                                      setSelectedDestination(destination)
                                                      setModalOpen(true)
                                                  },
                                              }
                                            : {})}
                                        className={`flex items-start text-left size-full border border-light dark:border-dark rounded-md bg-white dark:bg-accent-dark p-4 relative border-b-3 ${
                                            destination.mdx
                                                ? 'click hover:top-[-1px] active:top-[1px] transition-all duration-75'
                                                : ''
                                        }`}
                                    >
                                        <div>
                                            <div className="flex space-x-3 items-center">
                                                <div className="size-7 flex-shrink-0">
                                                    <img
                                                        className="w-full"
                                                        src={`https://app.posthog.com${icon_url}`}
                                                        alt={name}
                                                    />
                                                </div>

                                                <h3 className="m-0 leading-none text-base">{name}</h3>
                                            </div>
                                            <p className="opacity-70 !text-[15px] m-0 ml-10 text-base leading-snug">
                                                {description}
                                            </p>
                                        </div>
                                    </Container>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </div>
        </Layout>
    )
}

const query = graphql`
    query {
        destinations: allPostHogDestination {
            nodes {
                id
                name
                category
                description
                icon_url
                mdx {
                    body
                }
                inputs_schema {
                    key
                    type
                    label
                    secret
                    required
                    description
                }
            }
        }
    }
`

export default PipelinesPage
