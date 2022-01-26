import Breadcrumbs from 'components/Breadcrumbs'
import { Calendar, Cards, List } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import slugify from 'slugify'

const Filters = ({ view, location, activeFilter }) => {
    const {
        tutorials: { categories },
    } = useStaticQuery(filterQuery)
    const filterableData = [
        {
            title: 'Category',
            path: '/tutorials/categories',
            options: categories,
        },
    ]

    return (
        <ul className="list-none p-0 m-0 flex flex-col space-y-4">
            {filterableData.map(({ title, path, options }) => {
                return (
                    <li key={title}>
                        <Filter view={view} title={title} path={path} options={options} activeFilter={activeFilter} />
                    </li>
                )
            })}
        </ul>
    )
}

const Filter = ({ title, options, path, view, activeFilter }) => {
    return (
        <>
            <h5 className="m-0 inline-block text-[15px] px-4 font-semibold opacity-[.85]">{title}</h5>
            <ul className="list-none p-0 m-0 flex flex-col space-y-3 overflow-hidden pl-4 mt-3">
                <li
                    className={`flex items-center space-x-2 text-base font-semibold relative ${
                        !activeFilter ? 'active-product' : ''
                    }`}
                >
                    <Link
                        className={`transition-colors text-base hover:opacity-70 font-semibold text-primary dark:text-white hover:text-primary dark:hover:text-white ${
                            !activeFilter ? '!opacity-100' : 'opacity-50'
                        }`}
                        to="/tutorials"
                        state={{ view }}
                    >
                        All
                    </Link>
                </li>
                {options.map(({ fieldValue }) => {
                    const url = `${path}/${slugify(fieldValue, { lower: true })}`
                    const active = activeFilter === fieldValue
                    return (
                        <li
                            key={fieldValue}
                            className={`flex items-center space-x-2 text-base font-semibold relative ${
                                active ? 'active-product' : ''
                            }`}
                        >
                            <Link
                                className={`transition-colors text-base hover:opacity-70 font-semibold text-primary dark:text-white hover:text-primary dark:hover:text-white ${
                                    active ? '!opacity-100' : 'opacity-50'
                                }`}
                                to={url}
                                state={{ view }}
                            >
                                {fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1)}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

const CardView = ({ data }) => {
    return (
        <ul className="list-none p-0 m-0 flex flex-col space-y-10 md:space-y-20">
            {data.map((tutorial) => {
                const {
                    frontmatter: { featuredImage, Contributor, date },
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
                                                        <GatsbyImage
                                                            className="bg-[#E5E7E0] dark:bg-[#2C2C2C]"
                                                            image={getImage(image)}
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
                                    <GatsbyImage
                                        className="bg-[#E5E7E0] dark:bg-[#2C2C2C] rounded-md"
                                        image={getImage(featuredImage)}
                                    />
                                ) : (
                                    <img width={700} height={395} src="/banner.png" />
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
        <ul className="list-none p-0 m-0 flex flex-col space-y-6 sm:space-y-8">
            {data.map((tutorial) => {
                const {
                    frontmatter: { Contributor, title, featuredImage },
                    id,
                    fields: { slug },
                } = tutorial
                return (
                    <li key={id} className="flex items-center">
                        <Link to={slug} className="hidden sm:block mr-6">
                            {featuredImage ? (
                                <GatsbyImage
                                    className="w-[213px] rounded-sm bg-[#E5E7E0] dark:bg-[#2C2C2C]"
                                    image={getImage(featuredImage)}
                                />
                            ) : (
                                <img className="w-[213px] rounded-md" width={700} height={395} src="/banner.png" />
                            )}
                        </Link>

                        <div>
                            <Link className="font-bold sm:text-[20px]" to={slug}>
                                {title}
                            </Link>
                            {Contributor && (
                                <ul className="flex space-x-2 list-none p-0 m-0 mt-1">
                                    {Contributor.map(({ image, name, id }) => {
                                        return (
                                            <li key={id} className="flex space-x-2 items-center">
                                                <div className="w-[24px] h-[24px] relative rounded-full overflow-hidden">
                                                    <GatsbyImage
                                                        className="bg-[#E5E7E0] dark:bg-[#2C2C2C]"
                                                        image={getImage(image)}
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
                className="w-full relative lg:grid lg:grid-flow-col items-start -mb-20 gap-4"
            >
                <aside className="pl-5 hidden lg:block lg:sticky top-10 flex-shrink-0 w-full lg:w-[231px] justify-self-end my-10 lg:my-0 lg:pt-10 lg:pb-20">
                    <nav>
                        <Filters location={location} view={view} activeFilter={activeFilter} />
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
                image {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                name
            }
            featuredImage {
                childImageSharp {
                    gatsbyImageData(width: 700, height: 395, placeholder: NONE)
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
