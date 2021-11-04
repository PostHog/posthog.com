import { CallToAction } from 'components/CallToAction'
import { RightArrow } from 'components/Icons/Icons'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import slugify from 'slugify'
import Divider from './Divider'

const useNextStepsData = () => {
    return useStaticQuery(
        graphql`
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
    )
}

export const InstallingPostHog = () => {
    return (
        <>
            <p>
                There are multiple ways to run PostHog - it all depends on your stage of company, business goals or
                security requirements. Not sure which is right for you?{' '}
                <Link className="group inline-flex items-center">
                    Compare plans and benefits <RightArrow className="w-4 h-4 bounce" />
                </Link>
            </p>
            <Divider className="my-4" />
            <ul className="list-none p-0 m-0">
                <li>
                    <h5>Self-host</h5>
                    <p>Maintain full control of customer data by hosting on your own infrastructure.</p>

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
                        Join our <Link>Slack</Link> to ask questions directly to the PostHog team - or search for
                        similar questions from others in the community.
                    </p>
                    <Divider className="my-8" />
                </li>
            </ul>
        </>
    )
}

export const PlansPricing = () => {
    return (
        <>
            <ul className="list-none p-0 m-0 space-y-3 mb-3">
                <li>
                    <strong>Self-hosted</strong> plans starts at $1,000/mo with 8 million monthly events.
                </li>
                <li>
                    <strong>PostHog Cloud</strong> is free up to 1 million monthly events, then charged per event after.
                </li>
                <li>
                    Pricing is <strong>$0.000025 per event</strong> after included allotments, with volume discounts
                    available.
                </li>
            </ul>
            <CallToAction>Compare plans & calculate pricing</CallToAction>
            <Divider className="my-8" />
        </>
    )
}

export const Customers = () => {
    const { customers } = useNextStepsData()
    return (
        <>
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
                            <p className="text-[14px] text-gray-accent-dark">{toolsUsed.join(', ')}</p>
                        </li>
                    )
                })}
            </ul>
            <Divider className="my-8" />
        </>
    )
}

export const Tutorials = () => {
    const { tutorials } = useNextStepsData()
    return (
        <>
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
        </>
    )
}

export const LearnMore = () => {
    return (
        <>
            <ul className="p-0 pl-4 m-0 space-y-2 list-outside">
                <li>
                    <Link to="/product">Explore the product</Link>
                </li>
                <li>
                    <Link to="/handbook/company/story">Read our story</Link>
                </li>
                <li>
                    <Link href="https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA">Visit our YouTube</Link>
                </li>
                <li>
                    <Link to="/slack">Join our Slack</Link>
                </li>
                <li>
                    <Link to="/handbook/company/team">Meet the team</Link>
                </li>
            </ul>
            <Divider className="my-8" />
        </>
    )
}

const Title = ({ title, number }) => {
    return (
        <h3 id={slugify(title)}>
            {number}. {title}
        </h3>
    )
}

export default function Steps({ steps = [] }) {
    return (
        <section className="max-w-[500px] mx-auto next-steps-content">
            <ol className="list-none p-0 m-0">
                {steps.map((step, index) => {
                    const { title, component } = step
                    return (
                        <>
                            <Title number={index + 1} title={title} />
                            {component}
                        </>
                    )
                })}
            </ol>
        </section>
    )
}
