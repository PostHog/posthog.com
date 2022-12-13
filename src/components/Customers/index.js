import { heading } from 'components/Home/classes'
import { RightArrow } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Quote } from 'components/Pricing/Quote'
import { SEO } from 'components/seo'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Card = ({ children, url, className = '' }) => {
    return (
        <Link
            to={url}
            className={`group bg-white rounded-[10px] overflow-hidden hover:shadow-xl hover:translate-y-[-2px] ${className}`}
        >
            {children}
        </Link>
    )
}

const FeaturedCustomer = ({ customer }) => {
    const {
        slug,
        frontmatter: { title, featuredImage, logo },
    } = customer
    return (
        <Card
            url={slug}
            className="max-w-[1140px] -mb-6 md:-mb-12 relative mx-auto flex flex-row-reverse space-x-4 space-x-reverse justify-between pt-16"
        >
            <div className="max-w-full md:max-w-[364px] w-full absolute md:relative inset-0 md:before:bg-transparent before:absolute before:inset-0 before:w-full before:h-full before:bg-white/80 before:z-10">
                <img
                    className="object-cover md:object-contain absolute w-full h-full object-bottom"
                    src={featuredImage?.publicURL}
                />
            </div>
            <div className="px-8 pb-9 relative z-20">
                <img src={logo?.publicURL} />
                <h2 className="text-3xl my-7">{title}</h2>
                <span to={slug} className="text-red hover:text-red font-bold flex space-x-1 items-center text-[17px]">
                    <span>Read case study</span>
                    <RightArrow className="w-5 h-5 bounce" />
                </span>
            </div>
        </Card>
    )
}

export default function Customers() {
    const data = useStaticQuery(query)
    const customers = data?.customers?.nodes
    const { featuredCustomer } = data
    return (
        <>
            <SEO title={`Customers - PostHog`} />
            <Layout>
                <section className="px-4">
                    <h1 className={heading('md', 'primary', 'mt-16 md:mt-28 mb-9')}>Customers</h1>
                    <FeaturedCustomer customer={featuredCustomer} />
                </section>
                <section className="bg-black dark py-16 md:py-32 px-4">
                    <div>
                        <Quote
                            logo="/images/customers/mention-me.svg"
                            name="Joe Saunderson"
                            title="Software Engineer, Mention Me"
                            imageSource="/images/customers/joe.png"
                            quote={
                                <span>
                                    “We looked at{' '}
                                    <span className="text-red">
                                        Amplitude, Mixpanel and Pendo and they were far too expensive.
                                    </span>{' '}
                                    Not only that, it was also very unclear how they worked in terms of data privacy.”
                                </span>
                            }
                        />
                    </div>
                </section>
                <section className="max-w-[1140px] mx-auto -mt-6 md:-mt-12 px-4">
                    <ul className="list-none p-0 m-0 grid md:grid-cols-2 gap-y-5 md:gap-y-10 gap-x-10">
                        {customers.map((customer, index) => {
                            const {
                                slug,
                                frontmatter: { title, logo, featuredImage },
                            } = customer
                            return (
                                <li key={index}>
                                    <Card className="inline-block relative h-full" url={slug}>
                                        <span className="absolute inset-0 w-full h-full z-0 before:absolute before:inset-0 before:w-full before:h-full before:bg-white/80">
                                            <img
                                                src={featuredImage?.publicURL}
                                                className="w-full h-full object-cover"
                                            />
                                        </span>
                                        <div className="relative px-9 py-9 flex flex-col h-full items-start">
                                            <img className="max-w-[200px]" src={logo?.publicURL} />
                                            <h3 className="text-3xl mb-24 mt-4 text-black">{title}</h3>
                                            <div className="text-red hover:text-red font-bold flex space-x-1 items-center text-[17px] mt-auto">
                                                <span>Read case study</span>
                                                <RightArrow className="w-5 h-5 bounce" />
                                            </div>
                                        </div>
                                    </Card>
                                </li>
                            )
                        })}
                    </ul>
                </section>
                <section className="my-16 md:my-32 px-4">
                    <div>
                        <Quote
                            logo="/images/customers/weweb.svg"
                            name="Quentin Durantay"
                            title="Growth, WeWeb"
                            imageSource="/images/customers/quentin.jpeg"
                            quote={
                                <span>
                                    “I love PostHog! The tool that finally made me churn from Amplitude.{' '}
                                    <span className="text-red">1/10th of the price and 10x the value.</span> I highly
                                    recommend it!”
                                </span>
                            }
                        />
                    </div>
                </section>
            </Layout>
        </>
    )
}

const query = graphql`
    query {
        customers: allMdx(
            filter: { fields: { slug: { regex: "/^/customers/" } }, frontmatter: { featuredCustomer: { ne: true } } }
        ) {
            nodes {
                body
                excerpt(pruneLength: 150)
                slug
                frontmatter {
                    title
                    customer
                    logo {
                        publicURL
                    }
                    description
                    industries
                    users
                    toolsUsed
                    featuredImage {
                        publicURL
                    }
                }
            }
        }
        featuredCustomer: mdx(frontmatter: { featuredCustomer: { eq: true } }) {
            slug
            frontmatter {
                title
                logo {
                    publicURL
                }
                featuredImage {
                    publicURL
                }
            }
        }
    }
`
