import CloudinaryImage from 'components/CloudinaryImage'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { kebabCase } from 'lib/utils'
import React, { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { shortcodes } from '../../mdxGlobalComponents'
import Link from 'components/Link'
import Layout from 'components/Layout'
import { SEO } from '../seo'
import TeamStat, { pineappleOnPizzaStat } from './TeamStat'
import { StaticImage } from 'gatsby-plugin-image'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import SideModal from 'components/Modal/SideModal'
import { Profile } from '../../templates/Team'

export const TeamMember = (props) => {
    const { avatar, lastName, firstName, companyRole, country, squeakId, location, biography, setActiveProfile } = props
    const name = [firstName, lastName].filter(Boolean).join(' ')

    return (
        <li className="h-40 relative @container group click [perspective:1000px]">
            <button
                onClick={() => setActiveProfile({ ...props, id: squeakId })}
                className={`flex justify-between h-full relative text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark w-full transition-transform preserve-3d text-left ${
                    biography ? 'group-hover:[transform:rotateY(-180deg)]' : ''
                }`}
            >
                <div className="flex flex-col justify-between px-4 md:px-6 py-4 w-full absolute h-full [backface-visibility:hidden] bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded">
                    <div className="mr-32 xl:mr-40">
                        <h3
                            className="mb-0.5 text-[15px] @sm:text-base @md:text-[17px] leading-tight"
                            id={kebabCase(name) + '-' + kebabCase(companyRole)}
                        >
                            {name}
                        </h3>
                        <p className="text-primary/50 text-sm @md:text-[15px] @lg:text-base dark:text-primary-dark/50 leading-tight">
                            {companyRole}
                        </p>
                    </div>

                    <span className="flex items-center gap-2">
                        {country === 'world' ? '🌎' : <ReactCountryFlag svg countryCode={country} />}
                        <span className="opacity-50 text-sm">
                            {country === 'world' ? 'Planet Earth' : location || country}
                        </span>
                    </span>
                    <figure className="m-0 -mt-8 p-0 absolute right-0 bottom-0">
                        <img
                            src={
                                avatar?.url ||
                                'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                            }
                            className="w-[200px]"
                        />
                    </figure>
                </div>
                <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(-180deg)] bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded">
                    <figure className="m-0 -mt-8 p-0 absolute left-0 bottom-0 [transform:rotateY(-180deg)]">
                        <img
                            src={
                                avatar?.url ||
                                'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                            }
                            className="w-[200px] grayscale brightness-0 opacity-20"
                        />
                    </figure>
                    <div className="overflow-hidden absolute h-full w-full inset-0 p-4 bg-accent dark:bg-accent-dark">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-sm bio-preview">
                            {biography}
                        </ReactMarkdown>
                        <div className="bg-gradient-to-t from-accent dark:from-accent-dark to-transparent absolute inset-0 w-full h-full" />
                    </div>
                </div>
            </button>
        </li>
    )
}

export default function People() {
    const {
        team: { teamMembers },
    } = useStaticQuery(teamQuery)

    const [activeProfile, setActiveProfile] = useState(false)

    const teamSize = teamMembers.length - 1

    // Some Stats were used as fallback until the actual data is added to the GraphQL Server
    const teamStats = [
        {
            data: pineappleOnPizzaStat(teamMembers) ? pineappleOnPizzaStat(teamMembers) : [60, 40],
            caption: '(Correctly) think pineapple belongs on pizza',
            icon: '🍍 + 🍕',
        },
        {
            data: [45, 55],
            caption: 'Are a former founder',
            icon: '💻',
        },
        {
            data: [100, 0],
            caption: 'Write code',
            icon: '☕️',
        },
        {
            data: [80, 20],
            caption: 'See themselves working at PostHog in 2 years',
            icon: '',
        },
    ]

    return (
        <Layout>
            <SEO title="Team - PostHog" />
            <SideModal open={!!activeProfile} setOpen={setActiveProfile}>
                <Profile {...activeProfile} />
            </SideModal>
            <div className="flex flex-col xl:flex-row gap-8 pt-10 md:pb-3 px-4 md:px-8 2xl:px-4 3xl:p-0 max-w-screen-2xl mx-auto">
                <div className="flex-1">
                    <h2 className="text-4xl">People</h2>

                    <div className="float-right">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/explorer-hog.png"
                            alt="Hiking hog"
                            width="250"
                            height="250"
                            placeholder="blurred"
                            className="w-[200px] sm:w-64 md:w-72 lg:w-auto lg:max-w-auto -mr-8 md:mr-0 -mt-4 md:mt-0"
                        />
                    </div>

                    <p>
                        We're proud to be a team of <strong>{teamSize}</strong> misfits. Why?
                    </p>

                    <p>Building an unusually great company starts with an unusual team.</p>

                    <p>
                        We don't care if you haven't finished (or attended) school, if you were super important at a
                        "Big Tech" company, or if you ran a startup that crashed and burned.
                    </p>

                    <p>
                        What we <em>do</em> care about is your ability to learn, iterate, and ship.
                    </p>

                    <p>
                        That's why we've hired in Belgium, the East and West coasts of the US, Canada, England, France,
                        Germany, Poland, and Colombia (among other places).
                    </p>

                    <p className="mb-1">
                        Interested in a hand-drawn sketch of your face? <Link to={`/careers`}>We're hiring.</Link>
                    </p>
                </div>

                <aside className="xl:border-l border-light dark:border-dark xl:pl-4">
                    <h3 className="text-base md:text-[15px] lg:text-base mb-0 leading-tight bg-accent dark:bg-accent-dark rounded p-2 text-center">
                        Team members who...{' '}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 justify-start md:justify-center overflow-x-auto">
                        {teamStats.map((teamStat, index) => {
                            return (
                                <TeamStat
                                    key={index}
                                    teamStatData={teamStat.data}
                                    caption={teamStat.caption}
                                    icon={teamStat.icon}
                                />
                            )
                        })}
                    </div>
                </aside>
            </div>
            <ul className="list-none pt-16 pb-8 m-0 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-12 max-w-screen-2xl mx-auto px-4 md:px-8 2xl:px-4 3xl:p-0">
                {teamMembers.map((teamMember, index) => {
                    return <TeamMember key={index} {...teamMember} setActiveProfile={setActiveProfile} />
                })}
            </ul>
        </Layout>
    )
}

export const teamQuery = graphql`
    query TeamQuery {
        team: allSqueakProfile(
            filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
            sort: { fields: startDate, order: ASC }
        ) {
            teamMembers: nodes {
                squeakId
                avatar {
                    url
                }
                biography
                lastName
                firstName
                companyRole
                country
                location
                pronouns
                pineappleOnPizza
                teams {
                    data {
                        attributes {
                            name
                        }
                    }
                }
            }
        }
    }
`
