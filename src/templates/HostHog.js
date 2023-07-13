import { MDXProvider } from '@mdx-js/react'
import { FeatureSnapshot } from 'components/FeatureSnapshot'
import { Hero } from 'components/Hero'
import { Check, Close, LinkedIn } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import Subscribe from 'components/Subscribe'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { MdxCodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

const Title = () => (
    <h1 className="text-4xl md:text-6xl m-0 mt-3 -mb-5">
        Join us for our first community meetup <span className="text-red">in London</span>
    </h1>
)

const Disclaimer = () => (
    <p className="mt-3 !leading-tight">
        <small className="text-black opacity-75 ">Attendance is free, but space is limited. RSVPs are required.</small>
    </p>
)

export default function HostHog({ data }) {
    const {
        id,
        body,
        excerpt,
        frontmatter: { date, venue, from, to, city, agenda, speakers, description, featuredImage, ogImage },
    } = data.mdx

    const WhereWhen = () => {
        return (
            <div className="flex space-x-8  pt-4 sm:mb-0 mb-4">
                <div>
                    <h4 style={{ margin: '0px 0px 4px 0px', fontSize: 14 }} className="text-black opacity-50">
                        Where
                    </h4>
                    <p style={{ fontSize: 14, lineHeight: '1.5', margin: 0 }}>
                        <strong>{venue.name}</strong>
                        <br />
                        {venue.address}
                    </p>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-bold inline-flex items-center space-x-1"
                        href={`https://maps.google.com/?q=${venue.address}`}
                    >
                        <span>Map</span>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.32514 0.338357L2.16485 0.337936C1.59733 0.337936 1.12426 0.811012 1.12426 1.37853C1.12426 1.94606 1.59733 2.41913 2.16485 2.41913L5.81269 2.43017L0.586328 7.65653C0.176498 8.06636 0.176498 8.71849 0.586329 9.12832C0.996159 9.53815 1.64829 9.53815 2.05812 9.12832L7.28448 3.90196L7.28448 7.5396C7.28448 8.10712 7.75755 8.5802 8.32508 8.5802C8.6191 8.5802 8.88234 8.46481 9.07165 8.27549C9.26097 8.08618 9.37677 7.82336 9.37635 7.52892L9.37635 1.38966C9.37635 1.11616 9.27123 0.842657 9.07165 0.643081C8.87208 0.443507 8.60932 0.327677 8.32514 0.338357Z"
                                fill="#BFBFBC"
                            />
                        </svg>
                    </a>
                </div>
                <div>
                    <h4 style={{ margin: '0px 0px 4px 0px', fontSize: 14 }} className="text-black opacity-50">
                        When
                    </h4>
                    <p style={{ fontSize: 14, lineHeight: '1.5', margin: 0 }}>
                        <strong>{date}</strong>
                        <br />
                        18:00 - 20:30
                    </p>
                </div>
            </div>
        )
    }

    const Agenda = () => {
        return (
            <div>
                <h3>Agenda</h3>
                {agenda.map(({ to, from, description, emoji }) => {
                    return (
                        <>
                            <h6 className="mt-4 mb-0">
                                {from} - {to} {emoji && emoji}
                            </h6>
                            <p style={{ margin: 0, fontSize: 15 }}>{description}</p>
                        </>
                    )
                })}
            </div>
        )
    }

    const Speakers = () => {
        return (
            <div className="mt-6 sm:mt-0 -mx-5 sm:mx-0">
                <h3 className="pl-5 sm:pl-0">Speakers</h3>
                <ul
                    className="flex space-x-6 p-0 px-4 sm:px-0 sm:space-x-4 justify-between whitespace-nowrap overflow-x-auto"
                    style={{ listStyle: 'none', margin: 0 }}
                >
                    {speakers.map(({ name, title, company, linkedIn, image }) => {
                        return (
                            <li key={name}>
                                <GatsbyImage image={getImage(image)} />
                                <h5 style={{ marginTop: 22, fontSize: 18, margin: 0 }}>{name}</h5>
                                <p
                                    style={{ fontSize: 16, color: 'black', opacity: '.50', margin: 0 }}
                                    className="font-semibold !leading-snug"
                                >
                                    {title},<br />
                                    {company}
                                </p>
                                {linkedIn && (
                                    <a
                                        style={{
                                            color: '#151515',
                                            marginTop: 12,
                                            display: 'inline-block',
                                            opacity: 0.5,
                                        }}
                                        href={linkedIn}
                                    >
                                        <LinkedIn className="w-[21px] h-[21px]" />
                                    </a>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    const FeaturedImage = () => {
        return (
            <div className="self-start relative w-full before:absolute before:h-full before:w-full before:bg-gray-accent before:rounded-sm before:-bottom-3 before:-right-3">
                <img className="w-full relative" src={featuredImage?.publicURL} />
            </div>
        )
    }
    const components = {
        pre: MdxCodeBlock,
        Hero,
        Section,
        FeatureSnapshot,
        Check,
        Close,
        a: A,
        Title,
        WhereWhen,
        Disclaimer,
        Agenda,
        Speakers,
        FeaturedImage,
        ...shortcodes,
    }

    return (
        <Layout>
            <SEO title={`HostHog ${city} - PostHog`} description={description || excerpt} image={ogImage.publicURL} />
            <div className="max-w-[1070px] mx-auto mt-14 px-5">
                <article>
                    <p className="text-[20px] font-semibold opacity-50 text-black m-0">HostHog: {city} 2022</p>
                    <section className="article-content">
                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </section>
                </article>
                <div className="border-t border-gray-accent-light border-dashed pt-10">
                    <h3 className="m-0">Can’t make it to {city}?</h3>
                    <p className="mt-1 mb-16 sm:mb-8 text-lg">
                        Our mailing list subscribers are the first to find out when we're planning a HostHog event
                        closer to you.
                    </p>
                    <Subscribe />
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query HostHogQuery($id: String!) {
        mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            frontmatter {
                description
                date(formatString: "dddd, Do MMMM")
                ogImage {
                    publicURL
                }
                featuredImage {
                    publicURL
                }
                venue {
                    name
                    address
                }
                agenda {
                    from
                    to
                    description
                    emoji
                }
                speakers {
                    name
                    title
                    company
                    linkedIn
                    image {
                        childImageSharp {
                            gatsbyImageData(width: 100, height: 124)
                        }
                    }
                }
                city
                from
                to
            }
        }
    }
`
