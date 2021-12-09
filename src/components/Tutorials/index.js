import Breadcrumbs from 'components/Breadcrumbs'
import Chip from 'components/Chip'
import { Calendar, Cards, Chevron, List } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { motion } from 'framer-motion'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import slugify from 'slugify'

const Filters = ({ activeFilter, view, openFilter }) => {
    const {
        tutorials: { categories, contributors },
    } = useStaticQuery(filterQuery)
    const filterableData = [
        {
            title: 'Category',
            path: '/tutorials/categories',
            options: categories,
        },
        {
            title: 'Contributor',
            path: '/tutorials/contributors',
            options: contributors,
        },
    ]

    return (
        <ul className="list-none p-0 m-0 flex flex-col">
            {filterableData.map(({ title, path, options }) => {
                return (
                    <li key={title}>
                        <Filter
                            openFilter={openFilter}
                            view={view}
                            title={title}
                            path={path}
                            options={options}
                            activeFilter={activeFilter}
                        />
                    </li>
                )
            })}
        </ul>
    )
}

const Filter = ({ title, options, activeFilter, path, view, openFilter }) => {
    const [open, setOpen] = useState(
        openFilter === title || options.some(({ fieldValue }) => fieldValue === activeFilter)
    )

    return (
        <>
            <button className="flex justify-between items-baseline w-full" onClick={() => setOpen(!open)}>
                <h5 className="inline-block text-[15px] opacity-40 font-semibold leading-loose mb-2">{title}</h5>
                <span
                    style={{ transform: `rotate(${open ? '180' : '0'}deg)` }}
                    className="opacity-40 transition-transform"
                >
                    <Chevron />
                </span>
            </button>
            <motion.ul
                initial={{ height: open ? 'auto' : 0 }}
                animate={{ height: open ? 'auto' : 0 }}
                className="list-none p-0 m-0 flex flex-col space-y-2 overflow-hidden"
                style={{ marginBottom: open ? 20 : 0 }}
            >
                {options.map(({ fieldValue }) => {
                    const url = `${path}/${slugify(fieldValue, { lower: true })}`
                    const active = activeFilter === fieldValue
                    return (
                        <li key={fieldValue} className="flex items-center space-x-2 text-base font-semibold">
                            <Chip
                                active={active}
                                onClick={() =>
                                    navigate(active ? '/tutorials' : url, { state: { view, openFilter: title } })
                                }
                                size="sm"
                                className="text-[14px] font-semibold"
                                text={fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1)}
                            />
                        </li>
                    )
                })}
            </motion.ul>
        </>
    )
}

const CardView = ({ data }) => {
    return (
        <ul className="list-none p-0 m-0 flex flex-col space-y-10 md:space-y-20">
            {data.map((tutorial) => {
                const {
                    frontmatter: { featuredImage, Contributor, title, date },
                    id,
                    fields: { slug },
                } = tutorial
                return (
                    <li key={id}>
                        <div className="w-full text-black dark:text-white">
                            <div className="flex justify-between items-center mb-2">
                                {Contributor && (
                                    <ul className="flex space-x-2 list-none p-0 m-0">
                                        {Contributor.map(({ image, name, id }) => {
                                            return (
                                                <li key={id} className="flex space-x-2 items-center">
                                                    <div className="w-[36px] h-[36px] relative rounded-full overflow-hidden">
                                                        <img
                                                            className="absolute w-full h-full inset-0 object-cover"
                                                            src={image}
                                                        />
                                                    </div>
                                                    <span className="author text-[15px] font-semibold opacity-50">
                                                        {name}
                                                    </span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                                <span className="flex space-x-2 items-center ml-auto">
                                    <Calendar className="text-gray" />
                                    <time className="font-semibold opacity-50 text-[13px]">{date}</time>
                                </span>
                            </div>

                            <Link to={slug}>
                                {featuredImage ? (
                                    <GatsbyImage image={getImage(featuredImage)} />
                                ) : (
                                    <img width={700} height={441} src="/banner.png" />
                                )}
                            </Link>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

const ListView = ({ data }) => {
    return (
        <ul className="list-none p-0 m-0 flex flex-col space-y-4">
            {data.map((tutorial) => {
                const {
                    frontmatter: { featuredImage, Contributor, title, date },
                    id,
                    fields: { slug },
                } = tutorial
                return (
                    <li key={id} className="flex justify-between items-start">
                        <Link className="font-bold" to={slug}>
                            {title}
                        </Link>
                        <div className="flex-shrink-0">
                            {Contributor && (
                                <ul className="flex space-x-2 list-none p-0 m-0">
                                    {Contributor.map(({ image, name, id }) => {
                                        return (
                                            <li key={id} className="flex space-x-2 items-center">
                                                <div className="w-[24px] h-[24px] relative rounded-full overflow-hidden">
                                                    <img
                                                        className="absolute w-full h-full inset-0 object-cover"
                                                        src={image}
                                                    />
                                                </div>
                                                <span className="author text-[15px] font-semibold opacity-50 hidden sm:block">
                                                    {name}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default function Tutorials({
    data: {
        tutorials: { nodes, categories, contributors },
    },
    pageContext,
    location,
}) {
    const data = nodes
    const [view, setView] = useState(location?.state?.view || 'card')
    const { activeFilter } = pageContext

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage.getItem('preferred-theme')) {
            setView(window.localStorage.getItem('preferred-theme'))
        }
    }, [])

    const handleViewClick = (view) => {
        setView(view)
        localStorage.setItem('preferred-theme', view)
    }
    return (
        <Layout>
            <Breadcrumbs
                crumbs={[
                    { title: 'Tutorials', url: location?.pathname !== '/tutorials' && '/tutorials', state: { view } },
                ]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <SEO title="PostHog tutorials - PostHog" />
            <div
                style={{ gridAutoColumns: 'minmax(max-content, 1fr) minmax(auto, 700px) 1fr' }}
                className="w-full relative lg:grid lg:grid-flow-col items-start -mb-20"
            >
                <aside className="lg:sticky top-10 flex-shrink-0 w-full lg:w-[177px] justify-self-end px-5 lg:px-8 lg:box-content my-10 lg:my-0 lg:pt-10 lg:pb-20">
                    <nav>
                        <Filters openFilter={location?.state?.openFilter} view={view} activeFilter={activeFilter} />
                    </nav>
                </aside>
                <section className="h-full col-span-2 px-5 lg:px-8 border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-10 lg:mt-0 lg:pt-10 pb-20">
                    <div className="flex flex-col-reverse sm:flex-row justify-between items-end sm:items-center mb-10 space-y-4 space-y-reverse sm:space-y-0 sm:space-x-6">
                        <div className="flex justify-between items-center max-w-[700px] w-full">
                            <h1 className="font-bold text-2xl md:text-3xl m-0">PostHog tutorials</h1>
                            <div className="flex space-x-3 items-center">
                                <button onClick={() => handleViewClick('card')}>
                                    <Cards style={{ color: view === 'card' ? '#F54E00' : '#BFBFBC' }} />
                                </button>
                                <button onClick={() => handleViewClick('list')}>
                                    <List style={{ color: view === 'list' ? '#F54E00' : '#BFBFBC' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:max-w-[700px]">
                        {{
                            card: CardView,
                            list: ListView,
                        }[view]({ data })}
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export const TutorialsFragment = graphql`
    fragment TutorialsFragment on Mdx {
        id
        fields {
            slug
        }
        frontmatter {
            title
            date(formatString: "MMM 'YY")
            Category: topics
            Contributor: authorData {
                id
                image
                name
            }
            featuredImage {
                childImageSharp {
                    gatsbyImageData(width: 700, height: 441)
                }
            }
        }
    }
`

const filterQuery = graphql`
    query TutorialsFilterQuery {
        tutorials: allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }, limit: 1000) {
            categories: group(field: frontmatter___topics) {
                fieldValue
            }
            contributors: group(field: frontmatter___authorData___name) {
                fieldValue
            }
        }
    }
`
