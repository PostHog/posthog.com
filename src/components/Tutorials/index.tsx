import React, { useEffect, useState } from 'react'
import { Calendar, Cards, List } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { docs } from '../../sidebars/sidebars.json'
import PostLayout from 'components/PostLayout'

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
                                    <ul className="flex space-x-4 list-none p-0 m-0">
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
                                        className="bg-[#E5E7E0] dark:bg-[#2C2C2C] rounded-md w-full"
                                        image={getImage(featuredImage)}
                                        width={600}
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
        tutorials: { nodes },
    },
    location,
}) {
    const data = nodes
    const [view, setView] = useState(location?.state?.view || 'card')

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
            <SEO title="Tutorials - PostHog" />

            <PostLayout article={false} survey={false} title={'Tutorials'} menu={docs} hideSidebar>
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
            </PostLayout>
        </Layout>
    )
}

export const tutorialsFragment = graphql`
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
                        gatsbyImageData(width: 36, height: 36)
                    }
                }
                name
            }
            featuredImage {
                childImageSharp {
                    gatsbyImageData(placeholder: NONE)
                }
            }
        }
    }
`
