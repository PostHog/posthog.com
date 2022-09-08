import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React from 'react'
import Link from 'components/Link'
import { CompensationCalculator } from 'components/CompensationCalculator'
import InterviewProcess from 'components/Job/InterviewProcess'
import Apply from 'components/Job/Apply'
import Sidebar from 'components/Job/Sidebar'
import { sfBenchmark } from 'components/CompensationCalculator/compensation_data/sf_benchmark'
import { benefits } from 'components/Careers/Benefits'
import NotProductIcons from 'components/NotProductIcons'

const Detail = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => {
    return (
        <li className="flex space-x-2">
            <span className="w-6 h-6">{icon}</span>
            <span className="grid">
                <h4 className="text-sm m-0 font-normal leading-none pt-1">
                    <span>{title}</span>
                </h4>
                <p className="text-[15px] m-0 mt-1">
                    <strong className="text-black">{value}</strong>
                </p>
            </span>
        </li>
    )
}

const Accordion = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }) => {
    return (
        <details open>
            <summary>
                <h2 id={id}>{title}</h2>
            </summary>
            {children}
        </details>
    )
}

export default function Job({
    data: {
        team,
        teamLead,
        teamInfo,
        allJobPostings,
        ashbyJobPosting: {
            departmentName,
            info,
            id,
            locationName,
            parent,
            fields: { tableOfContents, html, title, slug },
        },
    },
    pageContext: { teamName },
}) {
    const timezone = parent?.customFields?.find(({ title }) => title === 'Timezone(s)')?.value
    const menu = [
        {
            name: 'Work at PostHog',
        },
        {
            name: 'Careers home',
            url: '/careers',
        },
        {
            name: 'About us',
            url: '/handbook/company/story',
        },
        {
            name: 'Open roles',
            url: '',
            children: allJobPostings.nodes.map(({ fields: { title, slug } }) => {
                return {
                    name: title,
                    url: slug,
                }
            }),
        },
    ]

    return (
        <Layout>
            <SEO title={`${title} - PostHog`} image={`/og-images/${slug.replace(/\//g, '')}.jpeg`} />
            <div className="border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                <PostLayout
                    tableOfContents={[
                        ...tableOfContents,
                        { ...(sfBenchmark[title] ? { value: 'Salary', url: 'salary', depth: 0 } : {}) },
                        { value: 'Benefits', url: 'benefits', depth: 0 },
                        { value: 'Interview process', url: 'interview-process', depth: 0 },
                        { value: 'Apply', url: 'apply', depth: 0 },
                    ]}
                    hideSearch
                    hideSurvey
                    sidebar={
                        <Sidebar
                            teamSlug={teamInfo?.fields?.slug}
                            teamName={teamName}
                            team={team?.nodes}
                            teamLead={teamLead}
                        />
                    }
                    title="careers"
                    menu={menu}
                >
                    <div className="mb-8 relative mt-8 lg:mt-0">
                        <div>
                            <h1 className="m-0 text-5xl">{title}</h1>
                            <ul className="list-none m-0 p-0 md:items-center text-black/50 dark:text-white/50 mt-6 flex md:flex-row flex-col md:space-x-12 md:space-y-0 space-y-6">
                                <Detail title="Department" value={departmentName} icon={NotProductIcons.department} />
                                <Detail title="Location" value={locationName} icon={NotProductIcons.location} />
                                {timezone && (
                                    <Detail title="Timezone(s)" value={timezone} icon={NotProductIcons.timezone} />
                                )}
                            </ul>
                            <div className="job-content mt-12 w-full flex-shrink-0 transition-all">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: html,
                                    }}
                                />
                                {sfBenchmark[title] && (
                                    <Accordion title="Salary" id="salary">
                                        <p>
                                            We have a set system for compensation as part of being transparent. Salary
                                            varies based on location and level of experience.
                                        </p>
                                        <p>
                                            <Link to="/handbook/people/compensation">
                                                Learn more about compensation
                                            </Link>
                                        </p>
                                        <div className="mb-6">
                                            <CompensationCalculator
                                                descriptions={{
                                                    step: `We hire into the Established step by default and believe there's a place to have incremental steps to allow for more flexibility.`,
                                                    location: `The benchmark for each role we are hiring for is based on the market rate in San Francisco.`,
                                                    level: `We pay more experienced team members a greater amount since it is reasonable to expect this correlates with an increase in skill`,
                                                }}
                                                hideFormula
                                                hideRole
                                                initialJob={title}
                                            />
                                        </div>
                                    </Accordion>
                                )}
                                <Accordion title="Benefits" id="benefits">
                                    <ul className="list-none m-0 p-0 pb-4 grid md:grid-cols-2 grid-cols-1 gap-6">
                                        {benefits.map(({ title, image }) => {
                                            return (
                                                <li
                                                    key={title}
                                                    className="flex space-x-4 items-start font-medium leading-tight text-[15px]"
                                                >
                                                    <img className="max-w-[30px]" alt={title} src={image} />
                                                    <span>{title}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <p>
                                        Get more details about all our benefits on the{' '}
                                        <Link to="/careers#benefits">Careers page</Link>.
                                    </p>
                                </Accordion>
                                <Accordion title="Interview process" id="interview-process">
                                    <div className="mb-6">
                                        <InterviewProcess />
                                    </div>
                                </Accordion>
                                <Accordion title="Apply" id="apply">
                                    <div className="mb-6">
                                        <h4 className="!text-lg mb-0">(Now for the fun part...)</h4>
                                        <p>
                                            Just fill out this painless form and we'll get back to you within a few
                                            days. Thanks in advance!
                                        </p>
                                        <p className="opacity-50 text-sm">
                                            <span className="font-bold">Bolded fields</span> are required
                                        </p>
                                        <Apply id={id} info={info} />
                                    </div>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </PostLayout>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query JobQuery($id: String!, $teamName: String!, $teamNameInfo: String!) {
        teamLead: mdx(frontmatter: { team: { in: [$teamName] }, teamLead: { eq: true } }) {
            id
            frontmatter {
                name
                country
                jobTitle
                headshot {
                    id
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
        team: allMdx(filter: { frontmatter: { team: { in: [$teamName] } } }) {
            nodes {
                id
                frontmatter {
                    name
                    country
                    jobTitle
                    pineappleOnPizza
                    headshot {
                        id
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
        ashbyJobPosting(id: { eq: $id }) {
            id
            departmentName
            locationName
            fields {
                tableOfContents {
                    value
                    url
                    depth
                }
                html
                title
                slug
            }
            parent {
                ... on AshbyJob {
                    customFields {
                        value
                        title
                    }
                }
            }
            info {
                descriptionHtml
                applicationFormDefinition {
                    sections {
                        fields {
                            field {
                                type
                                title
                                isNullable
                                path
                            }
                        }
                    }
                }
            }
        }
        allJobPostings: allAshbyJobPosting {
            nodes {
                fields {
                    title
                    slug
                }
            }
        }
        teamInfo: mdx(frontmatter: { title: { eq: $teamNameInfo } }) {
            fields {
                slug
            }
        }
    }
`
