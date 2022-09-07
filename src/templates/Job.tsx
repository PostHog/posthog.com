import { button, CallToAction } from 'components/CallToAction'
import Layout from 'components/Layout'
import PostLayout, { Contributor, ContributorImage, ShareLinks, SidebarSection } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React, { useRef, useState } from 'react'
import { countryCodeEmoji } from 'country-code-emoji'
import Tooltip from 'components/Tooltip'
import { kebabCase } from 'lib/utils'
import Link from 'components/Link'
import { CompensationCalculator } from 'components/CompensationCalculator'
import slugify from 'slugify'

const interviewProcess = [
    {
        title: 'Application',
        description:
            'Our talent team will review your application to see how your skills and experience align with our needs.',
        badge: 'You are here',
    },
    {
        title: 'Culture interview',
        description:
            'Our goal is to explore your motivations to join our team, learn why you’d be a great fit, and answer questions about us.',
        badge: '30-min video call',
    },
    {
        title: 'Technical interview',
        description: `You'll meet the hiring team who will evaluate skills needed to be successful in your role. No live coding.`,
        badge: '45 minutes, varies by role',
    },
    {
        title: 'PostHog SuperDay',
        description: `You’ll join a standup, meet the team, and work on a task related to your role, offering a realistic view of what it’s like working at PostHog.`,
        badge: 'Paid day of work',
    },
    {
        title: 'Offer',
        description: `If everyone’s happy, we’ll make you an offer to join us - YAY!`,
        badge: 'Pop the champagne (after you sign)',
    },
]

const InterviewProcess = () => {
    return (
        <>
            <p>We do 2-3 short interviews, then pay you to do some real-life (or close to real-life) work.</p>
            <ul className="list-none m-0 p-0 grid gap-y-4">
                {interviewProcess.map(({ title, description, badge }, index) => {
                    return (
                        <li className="flex items-start space-x-4" key={title}>
                            <div className="w-12 h-12 bg-gray-accent-light rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                                <span>{index + 1}</span>
                            </div>
                            <div>
                                <h5 className="m-0 flex items-center flex-wrap">
                                    <span className="mr-2">{title}</span>
                                    <span className="text-base opacity-50">{badge}</span>
                                </h5>
                                <p className="m-0">{description}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

const JobSidebar = ({ team, teamLead }) => {
    return (
        <>
            {team?.length > 0 && (
                <SidebarSection title="Meet your team">
                    <ul className="list-none m-0 p-0 flex flex-wrap team-group">
                        {team.map(({ frontmatter: { headshot, name, country, jobTitle } }) => {
                            return (
                                <li
                                    key={name}
                                    className="first:-ml-0 -ml-4 transition-all relative hover:scale-[1.2] active:scale-[1.1] mb-1"
                                >
                                    <Link to={`/handbook/company/team#${kebabCase(name) + '-' + kebabCase(jobTitle)}`}>
                                        <Tooltip
                                            placement="top-end"
                                            className="whitespace-nowrap"
                                            title={
                                                <div className="flex space-x-1 items-center">
                                                    <span>{name}</span>
                                                    <span>{countryCodeEmoji(country)}</span>
                                                </div>
                                            }
                                        >
                                            <span className="relative">
                                                <ContributorImage
                                                    name={name}
                                                    image={headshot}
                                                    className="w-[40px] h-[40px]"
                                                />
                                            </span>
                                        </Tooltip>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </SidebarSection>
            )}
            {teamLead && (
                <SidebarSection title="Team lead">
                    <Link
                        to={`/handbook/company/team#${
                            kebabCase(teamLead?.frontmatter?.name) + '-' + kebabCase(teamLead?.frontmatter?.jobTitle)
                        }`}
                        className="flex space-x-2 items-center"
                    >
                        <ContributorImage
                            className="w-[40px] h-[40px]"
                            image={teamLead?.frontmatter?.headshot}
                            name={teamLead?.frontmatter?.name}
                        />
                        <p className="author text-base font-semibold m-0">{teamLead?.frontmatter?.name}</p>
                        <span className="text-lg">{countryCodeEmoji(teamLead?.frontmatter?.country)}</span>
                    </Link>
                </SidebarSection>
            )}
        </>
    )
}

const allowedFileTypes = ['application/pdf']

const components = {
    string: ({ title, required, path }) => (
        <input
            data-path={path}
            required={required}
            className="w-full block bg-white p-1.5 rounded-sm shadow-sm border border-black/20 text-base dark:bg-white/10 dark:text-white"
            placeholder={title}
            name={title}
        />
    ),
    email: ({ title, required, path }) => (
        <input
            data-path={path}
            required={required}
            className="w-full block bg-white p-1.5 rounded-sm shadow-sm border border-black/20 text-base dark:bg-white/10 dark:text-white"
            type="email"
            placeholder={title}
            name={title}
        />
    ),
    longtext: ({ title, required, path }) => (
        <textarea
            rows={5}
            data-path={path}
            required={required}
            className="w-full block bg-white p-1.5 rounded-sm shadow-sm border border-black/20 text-base dark:bg-white/10 dark:text-white"
            placeholder={title}
            name={title}
        />
    ),
    file: ({ title, required, path }) => {
        const [fileName, setFileName] = useState()
        const inputRef = useRef(null)

        const handleDrop = (e) => {
            setFileName(e.target.files.item(0).name)
        }

        return (
            <div className="relative h-52 border border-gray-accent-light dark:border-gray-accent-dark border-dashed rounded-md flex justify-center items-center text-black/50 dark:text-white/50  bg-white">
                <input
                    ref={inputRef}
                    onChange={handleDrop}
                    data-path={path}
                    required={required}
                    className="opacity-0 absolute w-full h-full inset-0 cursor-pointer"
                    placeholder={title}
                    name={title}
                    type="file"
                    accept={allowedFileTypes.join(',')}
                />
                <div className="absolute">
                    {fileName ? (
                        <p className="m-0">{fileName}</p>
                    ) : (
                        <p className="flex space-x-1 items-center m-0">
                            <button
                                onClick={() => inputRef?.current.click()}
                                type="button"
                                className={button('primary', undefined, 'cursor-pointer', 'sm')}
                            >
                                Upload file
                            </button>
                            <span>or drag and drop here</span>
                        </p>
                    )}
                </div>
            </div>
        )
    },
}

function Apply({ id, info }) {
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const form = new FormData()
        let error = null
        for (const [name, value] of data) {
            const el = e.target.querySelector(`[name="${name}"]`)
            const path = el.dataset.path
            if (el.type === 'file') {
                if (!allowedFileTypes.includes(value.type)) {
                    error = `Allowed file types: ${allowedFileTypes.join(', ')}`
                    break
                }
                form.append(name, value)
                form.append(path, name)
            } else {
                form.append(path, value)
            }
        }
        setError(error)
        if (error) return
        form.append('jobPostingId', id)
        fetch('/.netlify/functions/apply', {
            method: 'POST',
            body: form,
        })
            .then((res) => res.json())
            .then((submission) => setSubmitted(true))
    }
    return submitted ? (
        <p>Thanks for your submission!</p>
    ) : (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-3 ">
                {info?.applicationFormDefinition?.sections?.map(({ fields }) => {
                    return fields.map(({ field }) => {
                        const required = !field?.isNullable
                        return (
                            <div key={field?.path}>
                                <label
                                    className={`opacity-70 mb-1 inline-block ${required ? 'font-bold' : ''}`}
                                    htmlFor={field?.title}
                                >
                                    {field?.title}
                                </label>
                                {components[field?.type?.toLowerCase()] &&
                                    components[field?.type?.toLowerCase()]({
                                        title: field?.title,
                                        required,
                                        path: field?.path,
                                    })}
                            </div>
                        )
                    })
                })}
            </div>
            {error && <p className="font-bold text-red m-0 mt-4">{error}</p>}
            <button className={`${button()} mt-6 shadow-none`}>Submit</button>
        </form>
    )
}

export default function Job({
    data: {
        team,
        teamLead,
        allJobPostings,
        ashbyJobPosting: {
            title,
            departmentName,
            info,
            id,
            locationName,
            parent,
            fields: { tableOfContents, html },
        },
    },
    pageContext: { slug },
}) {
    const timezone = parent?.customFields?.find(({ title, value }) => title === 'Timezone(s)')?.value
    return (
        <Layout>
            <SEO title={`${title} - PostHog`} />
            <div className="border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                <PostLayout
                    tableOfContents={[
                        ...tableOfContents,
                        { value: 'Salary', url: 'salary', depth: 0 },
                        { value: 'Apply', url: 'apply', depth: 0 },
                        { value: 'Interview process', url: 'interview-process', depth: 0 },
                    ]}
                    hideSearch
                    hideSurvey
                    sidebar={<JobSidebar team={team?.nodes} teamLead={teamLead} />}
                    title="careers"
                    menu={[
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
                            children: allJobPostings.nodes.map(({ title }) => {
                                return {
                                    name: title,
                                    url: `/careers/${slugify(title, { lower: true })}`,
                                }
                            }),
                        },
                    ]}
                >
                    <div className="mb-8 relative">
                        <div>
                            <h1 className="m-0 text-5xl">{title}</h1>
                            <ul className="list-none m-0 p-0 md:items-center text-black/50 dark:text-white/50 mt-6 flex md:flex-row flex-col md:space-x-6 md:space-y-0 space-y-6">
                                <li className="flex space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                                            clipRule="evenodd"
                                        />
                                        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                                    </svg>

                                    <span className="grid">
                                        <h4 className="text-base m-0 font-normal leading-none">
                                            <span>Department</span>
                                        </h4>
                                        <p className="text-sm m-0 mt-1">
                                            <strong className="text-black">{departmentName}</strong>
                                        </p>
                                    </span>
                                </li>
                                <li className="flex space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>

                                    <span className="grid">
                                        <h4 className="text-base m-0 font-normal leading-none">
                                            <span>Location</span>
                                        </h4>
                                        <p className="text-sm m-0 mt-1">
                                            <strong className="text-black">{locationName}</strong>
                                        </p>
                                    </span>
                                </li>
                                {timezone && (
                                    <li className="flex space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>

                                        <span className="grid">
                                            <h4 className="text-base m-0 font-normal leading-none">
                                                <span>Timezone(s)</span>
                                            </h4>
                                            <p className="text-sm m-0 mt-1">
                                                <strong className="text-black">{timezone}</strong>
                                            </p>
                                        </span>
                                    </li>
                                )}
                            </ul>
                            <div className="job-content mt-12 w-full flex-shrink-0 transition-all">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: html,
                                    }}
                                />

                                <details open>
                                    <summary>
                                        <h2 id="salary">Salary</h2>
                                    </summary>
                                    <p>
                                        We have a set system for compensation as part of being transparent. Salary
                                        varies based on location and level of experience.{' '}
                                        <Link to="/handbook/people/compensation">Learn more about compensation.</Link>
                                    </p>
                                    <div className="mb-6">
                                        <CompensationCalculator
                                            descriptions={{
                                                step: `We hire into the Established step by default and believe there's a place to have incremental steps to allow for more flexibility.`,
                                                location: `The benchmark for each role we are hiring for is based on the market rate in San Francisco.`,
                                                level: `We pay more experienced team members a greater amount since it is reasonable to expect this correlates with an increase in skill`,
                                            }}
                                            hideFormula
                                            initialJob={title}
                                        />
                                    </div>
                                </details>
                                <details open>
                                    <summary>
                                        <h2 id="interview-process">Interview process</h2>
                                    </summary>
                                    <div className="mb-6">
                                        <InterviewProcess />
                                    </div>
                                </details>
                                <details open>
                                    <summary>
                                        <h2 id="apply">Apply</h2>
                                    </summary>
                                    <div className="mb-6">
                                        <h4 className="!text-lg mb-0">Now for the fun part!</h4>
                                        <p>
                                            Just fill out this painless form and we'll get back to you within a few
                                            days. Thanks in advance!
                                        </p>
                                        <p className="opacity-50 font-bold">Bolded fields are required</p>
                                        <Apply id={id} info={info} />
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </PostLayout>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query JobQuery($id: String!, $team: String!) {
        teamLead: mdx(frontmatter: { team: { in: [$team] }, teamLead: { eq: true } }) {
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
        team: allMdx(filter: { frontmatter: { team: { in: [$team] } } }) {
            nodes {
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
        }
        ashbyJobPosting(id: { eq: $id }) {
            id
            title
            departmentName
            locationName
            fields {
                tableOfContents {
                    value
                    url
                    depth
                }
                html
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
                title
            }
        }
    }
`
