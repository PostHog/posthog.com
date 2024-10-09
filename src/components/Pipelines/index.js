import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import Layout from '../Layout'
import { SEO } from 'components/seo'
import { AnimatePresence, motion } from 'framer-motion'
import { IconSearch } from '@posthog/icons'
import Fuse from 'fuse.js'
import Select from 'components/Select'
import SideModal from 'components/Modal/SideModal'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { TemplateParametersFactory } from '../../templates/Handbook'

function PipelinesPage({ location }) {
    const {
        pipelines: { nodes, categories },
    } = useStaticQuery(query)

    const [searchValue, setSearchValue] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState('All')
    const nodesByCategory =
        selectedCategory === 'All' ? nodes : nodes.filter((node) => node.category.includes(selectedCategory))
    const fuse = useMemo(() => new Fuse(nodesByCategory, { keys: ['name', 'description'] }), [nodesByCategory])
    const filteredNodes = searchValue ? fuse.search(searchValue).map(({ item }) => item) : nodesByCategory
    const [selectedDestination, setSelectedDestination] = React.useState(null)
    const [modalOpen, setModalOpen] = React.useState(false)

    return (
        <Layout>
            <SEO
                title="CDP sources & destinations"
                description="Get all your data into PostHog with 60+ sources & destinations"
                image={`/og-images/apps.jpeg`}
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
            <div className="@container max-w-screen-2xl px-5 mx-auto grid md:grid-cols-4 py-12">
                <div className="md:col-span-4">
                    <h1 className="mb-2">CDP sources & destinations</h1>
                    <p>
                        Import from a data warehouse to analyze your data with PostHog product data and send it all to
                        25+ destinations.
                    </p>
                </div>
                <aside className="md:col-span-1">
                    <div className="md:block hidden">
                        <h2 className="text-lg opacity-75">Destinations</h2>
                        <ul className="list-none m-0 p-0">
                            {[{ fieldValue: 'All' }, ...categories].map((category) => {
                                const value = category.fieldValue
                                const active = selectedCategory === value
                                return (
                                    <li className="relative flex items-center" key={value}>
                                        <button
                                            onClick={() => setSelectedCategory(value)}
                                            className={`text-left py-1 bg-light dark:bg-dark z-10 relative transition-all ${
                                                active ? 'font-bold ml-2' : ' ml-0'
                                            }`}
                                        >
                                            {value}
                                        </button>
                                        <AnimatePresence>
                                            {active && (
                                                <motion.span
                                                    initial={{ opacity: 0, translateX: '100%' }}
                                                    animate={{ opacity: 1, translateX: '-100%' }}
                                                    exit={{ opacity: 0, translateX: '100%' }}
                                                    className="w-1 h-[70%] absolute left-0 bg-red rounded-full"
                                                />
                                            )}
                                        </AnimatePresence>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <Select
                        className="md:hidden block w-full bg-white border border-border dark:border-dark dark:bg-accent-dark !rounded-md mb-2"
                        placeholder="Destinations"
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        options={[
                            { value: 'All', label: 'All' },
                            ...categories.map(({ fieldValue }) => ({ value: fieldValue, label: fieldValue })),
                        ]}
                    />
                </aside>
                <section className="md:col-span-3">
                    <div className="w-full mb-5 rounded-md border border-border dark:border-dark py-3 px-4 bg-white dark:bg-accent-dark flex space-x-1.5">
                        <IconSearch className="w-5 opacity-60" />
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="bg-transparent w-full border-none outline-none"
                            placeholder="Search destinations"
                        />
                    </div>

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
                                                        src={`https://app.posthog.com/${icon_url}`}
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
        pipelines: allPostHogDestination {
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
            categories: group(field: category) {
                fieldValue
            }
        }
    }
`

export default PipelinesPage
