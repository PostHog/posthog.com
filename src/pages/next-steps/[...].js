import React, { useEffect, useState } from 'react'
import Layout from 'components/SignUp/Layout'
import Logo from 'components/Logo'
import { heading } from 'components/SignUp/classes'
import { Quote } from 'components/Pricing/Quote'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import { RightArrow } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'
import { graphql, useStaticQuery } from 'gatsby'
import { Link as ScrollLink } from 'react-scroll'
import { SEO } from 'components/seo'
import GithubSlugger from 'github-slugger'
const slugger = new GithubSlugger()

const Card = ({ className = '', children }) => {
    return <div className={`my-16 p-11 rounded-md ${className}`}>{children}</div>
}

const Divider = ({ className = '' }) => {
    return <hr className={`bg-transparent border-t border-b-0 border-gray-accent-light border-dashed ${className}`} />
}

const DotLeaderLink = ({ text, number }) => {
    return (
        <ScrollLink
            to={`#${slugger.slug(text)}`}
            className="flex items-baseline before:border-b-2 before:border-dotted before:border-gray-accent-light before:flex-grow before:order-2 before:mx-2 text-primary hover:text-primary font-bold"
        >
            {text}
            <span className="order-3">{number}</span>
        </ScrollLink>
    )
}

export default function NextSteps({ location }) {
    const [customer, setCustomer] = useState({
        name: '',
        logo: '',
    })
    const [loading, setLoading] = useState(true)
    const { customers, tutorials } = useStaticQuery(query)
    const tableOfContents = [
        'Installing PostHog',
        'Plans & pricing',
        'How teams are using PostHog',
        'Popular tutorials',
        'Learn more about PostHog',
    ]
    useEffect(() => {
        async function getCustomer() {
            const name = location.pathname.split('/')[2]
            if (name) {
                const customer = await fetch(`/.netlify/functions/customer?name=${name}`).then((res) => res.json())
                setCustomer(customer)
            }
            setLoading(false)
        }
        getCustomer()
    }, [])
    return (
        <div style={{ opacity: loading ? '0' : '1' }}>
            <Layout crumbs={[{ title: 'Next steps' }]}>
                <SEO title="Next Steps - PostHog" />
                <div className="px-5 max-w-[600px] mx-auto">
                    <div className="flex justify-center items-center my-16 space-x-4 transition-opacity">
                        <Logo noText />
                        <span className="text-2xl">❤️</span>
                        <img className="w-[64px]" src={customer.logo} />
                    </div>
                    <h1 className={heading()}>Next steps</h1>
                    <Card className="bg-white">
                        <h3>Hey {customer.name} team! 👋</h3>
                        <p className="text-[17px] leading-[1.7]">
                            We’ve created this handy guide to answer common questions you or your team may have.
                        </p>
                        <p className="text-[17px] leading-[1.7]">
                            If you have questions that aren’t covered here, just shoot us an email!
                        </p>
                        <Quote
                            name="James Hawkins"
                            title="Co-founder & CEO"
                            image={<StaticImage width={80} src="../../images/james.png" />}
                        />
                    </Card>
                    <Card className="bg-gray-accent-light">
                        <aside>
                            <h5 className="opacity-40 text-center mb-6">Table of contents</h5>
                            <ol className="list-none p-0 m-0 font-bold space-y-2">
                                {tableOfContents.map((item, index) => (
                                    <li key={index}>
                                        <DotLeaderLink text={item} number={index + 1} />
                                    </li>
                                ))}
                            </ol>
                        </aside>
                    </Card>
                    <section className="max-w-[500px] mx-auto next-steps-content">
                        <ol className="list-none p-0 m-0">
                            <li>
                                <h3>1. Installing PostHog</h3>
                                <p>
                                    There are multiple ways to run PostHog - it all depends on your stage of company,
                                    business goals or security requirements. Not sure which is right for you?{' '}
                                    <Link className="group inline-flex items-center">
                                        Compare plans and benefits <RightArrow className="w-4 h-4 bounce" />
                                    </Link>
                                </p>
                                <Divider className="my-4" />
                                <ul className="list-none p-0 m-0">
                                    <li>
                                        <h5>Self-host</h5>
                                        <p>
                                            Maintain full control of customer data by hosting on your own
                                            infrastructure.
                                        </p>

                                        <CallToAction className="mb-2">View deployment instructions</CallToAction>
                                        <p className="!text-[14px]">
                                            Ready to upgrade?{' '}
                                            <Link className="group inline-flex items-center">
                                                Get a license key <RightArrow className="w-4 h-4 bounce" />
                                            </Link>
                                        </p>
                                        <Divider className="my-4" />
                                    </li>
                                    <li>
                                        <h5>PostHog Cloud</h5>
                                        <p>Create an account, install tracking code, and get started in minutes.</p>
                                        <CallToAction className="mb-2">Try PostHog Cloud - free</CallToAction>
                                        <Divider className="my-4" />
                                    </li>
                                    <li>
                                        <h5>Hosting or deployment questions?</h5>
                                        <p>
                                            Join our <Link>Slack</Link> to ask questions directly to the PostHog team -
                                            or search for similar questions from others in the community.
                                        </p>
                                        <Divider className="my-8" />
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h3>2. Plans & pricing</h3>
                                <ul className="list-none p-0 m-0 space-y-3 mb-3">
                                    <li>
                                        <strong>Self-hosted</strong> plans starts at $1,000/mo with 8 million monthly
                                        events.
                                    </li>
                                    <li>
                                        <strong>PostHog Cloud</strong> is free up to 1 million monthly events, then
                                        charged per event after.
                                    </li>
                                    <li>
                                        Pricing is <strong>$0.000025 per event</strong> after included allotments, with
                                        volume discounts available.
                                    </li>
                                </ul>
                                <CallToAction>Compare plans & calculate pricing</CallToAction>
                                <Divider className="my-8" />
                            </li>
                            <li>
                                <h3>3. How teams are using PostHog</h3>
                                <ul className="p-0 pl-4 m-0 space-y-2 list-outside">
                                    {customers.nodes.map((customer) => {
                                        const {
                                            id,
                                            fields: { slug },
                                            frontmatter: { title, toolsUsed },
                                        } = customer
                                        return (
                                            <li key={id}>
                                                <Link to={slug}>{title}</Link>
                                                <p className="text-[14px] text-gray-accent-dark">
                                                    {toolsUsed.join(', ')}
                                                </p>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <Divider className="my-8" />
                            </li>
                            <li>
                                <h3>4. Popular tutorials</h3>
                                <ul className="p-0 pl-4 m-0 space-y-2 list-outside">
                                    {tutorials.nodes.map((tutorial) => {
                                        const {
                                            id,
                                            slug,
                                            frontmatter: { title },
                                        } = tutorial
                                        return (
                                            <li key={id}>
                                                <Link to={slug}>{title}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <Divider className="my-8" />
                            </li>
                            <li>
                                <h3>5. Learn more about PostHog</h3>
                                <ul className="p-0 pl-4 m-0 space-y-2 list-outside">
                                    <li>
                                        <Link to="/product">Explore the product</Link>
                                    </li>
                                    <li>
                                        <Link to="/handbook/company/story">Read our story</Link>
                                    </li>
                                    <li>
                                        <Link href="https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA">
                                            Visit our YouTube
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/slack">Join our Slack</Link>
                                    </li>
                                    <li>
                                        <Link to="/handbook/company/team">Meet the team</Link>
                                    </li>
                                </ul>
                                <Divider className="my-8" />
                            </li>
                        </ol>
                    </section>
                    <section className="text-center">
                        <h2 className="text-[36px]">Anything else? Get in touch.</h2>
                        <p className="text-[17px]">
                            <strong>Just email</strong> <a href="mailto:hey@posthog.com">hey@posthog.com</a> and we’ll
                            get back to you in a jiffy.
                        </p>
                    </section>
                </div>
            </Layout>
        </div>
    )
}

const query = graphql`
    query NextStepsQuery {
        customers: allMdx(filter: { fields: { slug: { regex: "/^/customers/" } } }, limit: 3) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                    toolsUsed
                }
            }
        }
        tutorials: allMdx(filter: { frontmatter: { featuredTutorial: { eq: true } } }, limit: 3) {
            nodes {
                slug
                frontmatter {
                    title
                }
            }
        }
    }
`
