import Breadcrumbs from 'components/Breadcrumbs'
import Checkbox from 'components/Checkbox'
import { Calendar, Cards, List } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import { Link, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'

const CardView = ({ data }) => {
    return (
        <ul className="list-none p-0 m-0 flex flex-col space-y-20">
            {data.map((tutorial) => {
                const {
                    frontmatter: { featuredImage, Contributor, title },
                    parent: {
                        fields: { date },
                    },
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
                    frontmatter: { featuredImage, Contributor, title },
                    parent: {
                        fields: { date },
                    },
                    id,
                    fields: { slug },
                } = tutorial
                return (
                    <li key={id} className="flex justify-between items-center">
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

export default function Tutorials() {
    const {
        tutorials: { nodes, categories, contributors },
    } = useStaticQuery(query)

    const data = nodes
    const filterableData = {
        Category: categories,
        Contributor: contributors,
    }
    const [view, setView] = useState('card')
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
                        if (key === 'Contributor') {
                            return item.frontmatter[key]?.some((author) => author.name === filterBy)
                        } else {
                            return item.frontmatter[key]?.includes(filterBy)
                        }
                    })
                )
            })
        })
        setFilteredData(filtered)
    }, [filters])

    return (
        <Layout>
            <Breadcrumbs
                crumbs={[{ title: 'Tutorials' }]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <div
                style={{ gridAutoColumns: 'minmax(max-content, 1fr) minmax(auto, 700px) 1fr' }}
                className="w-full relative lg:grid lg:grid-flow-col items-start -mb-20"
            >
                <aside className="lg:sticky top-10 flex-shrink-0 w-[177px] justify-self-end pr-8 box-content pt-10 pb-20">
                    <nav>
                        <ul className="list-none p-0 m-0 flex flex-col space-y-4">
                            <li>
                                <h5 className="inline-block text-[15px] opacity-40 font-semibold leading-loose">
                                    Category
                                </h5>
                                <ul className="list-none p-0 m-0 flex flex-col space-y-2">
                                    {categories.map(({ category }) => {
                                        return (
                                            <li
                                                key={category}
                                                className="flex items-center space-x-2 text-base font-semibold"
                                            >
                                                <Checkbox
                                                    className="text-[14px] opacity-70 font-semibold"
                                                    onChange={(e) => handleFilterChange(e, 'Category', category)}
                                                    value={category}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li>
                                <h5 className="inline-block text-[15px] opacity-40 font-semibold leading-loose">
                                    Contributor
                                </h5>
                                <ul className="list-none p-0 m-0 flex flex-col space-y-2">
                                    {contributors.map(({ contributor }) => {
                                        return (
                                            <li
                                                key={contributor}
                                                className="flex items-center space-x-2 text-base font-semibold"
                                            >
                                                <Checkbox
                                                    className="text-[14px] opacity-70 font-semibold"
                                                    onChange={(e) => handleFilterChange(e, 'Contributor', contributor)}
                                                    value={contributor}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <section className="col-span-2 px-8 border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark pt-10 pb-20">
                    <div
                        className={
                            {
                                card: 'lg:max-w-[700px]',
                                list: 'max-w-full',
                            }[view]
                        }
                    >
                        <div className="mb-10 flex justify-between items-center max-w-[700px]">
                            <h1 className="font-bold text-3xl">PostHog tutorials</h1>
                            <div className="flex space-x-3 items-center">
                                <button onClick={() => setView('card')}>
                                    <Cards style={{ color: view === 'card' ? '#F54E00' : '#BFBFBC' }} />
                                </button>
                                <button onClick={() => setView('list')}>
                                    <List style={{ color: view === 'list' ? '#F54E00' : '#BFBFBC' }} />
                                </button>
                            </div>
                        </div>
                        {{
                            card: CardView,
                            list: ListView,
                        }[view]({ data: filteredData || data })}
                    </div>
                </section>
            </div>
        </Layout>
    )
}

const query = graphql`
    query TutorialsQuery {
        tutorials: allMdx(filter: { fields: { slug: { regex: "/^/docs/tutorials/" } } }, limit: 1000) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
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
                parent {
                    ... on File {
                        fields {
                            date: gitLogLatestDate(formatString: "MMM 'YY")
                        }
                    }
                }
            }
            categories: group(field: frontmatter___topics) {
                category: fieldValue
            }
            contributors: group(field: frontmatter___authorData___name) {
                contributor: fieldValue
            }
        }
    }
`
