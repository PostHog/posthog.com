import Layout from 'components/Layout'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Benefits } from '../components/Careers/Benefits'
import { CareersHero } from '../components/Careers/CareersHero'
import { InterviewProcess } from '../components/Careers/InterviewProcess'
import { OpenRoles } from '../components/Careers/OpenRoles'
import '../components/Careers/styles/index.scss'
import { Transparency } from '../components/Careers/Transparency'
import { WhyWereHere } from '../components/Careers/WhyWereHere'
import { WorkingAtPostHog } from '../components/Careers/WorkingAtPostHog'
import { SEO } from '../components/seo'
import { TeamQuote } from '../components/TeamQuote'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

const menu = [
    {
        name: 'Introduction',
        url: 'introduction',
    },
    {
        name: 'Transparency',
        url: 'transparency',
    },
    {
        name: 'Who we hire',
        url: 'who-we-hire',
    },
    {
        name: 'Interview process',
        url: 'interview-process',
    },
    {
        name: 'Benefits',
        url: 'benefits',
    },
    {
        name: 'Working here',
        url: 'working-at-posthog',
    },
    {
        name: 'Open roles',
        url: 'open-roles',
    },
]

const IndexPage = () => {
    const data = useStaticQuery(query)
    const latestJob = data?.allAshbyJobPosting?.nodes && data.allAshbyJobPosting.nodes[0]
    const latestJobCreatedAt = latestJob && new Date(latestJob['publishedDate'])

    const breakpoints = useBreakpoint()
    return (
        <Layout>
            <SEO
                title="Careers - PostHog"
                description="We're working to increase the number of successful products in the world.
                Adventurers needed."
                image={`/og-images/careers.jpeg${latestJobCreatedAt ? `?${latestJobCreatedAt.getTime()}` : ''}`}
            />

            <CareersHero />
            <div className="careers-anchor-navbar">
                <WhyWereHere />
                <Transparency />
                <TeamQuote
                    backgroundColor="bg-primary"
                    textColor="text-tan"
                    fontSize="text-4xl"
                    width="max-w-4xl"
                    value={
                        <>
                            I hate how much I enjoy working at PostHog.{' '}
                            <span className="text-red">It has ruined all other companies for me.</span> Thanks a lot.
                        </>
                    }
                    author="Charles Cook"
                    role="Business Operations"
                    img={
                        <StaticImage
                            width={100}
                            height={100}
                            imgClassName="rounded-full bg-red"
                            alt={`Charles Cook - Business Operations`}
                            src="../components/TeamQuote/images/charles.png"
                        />
                    }
                />
                <InterviewProcess />
                <TeamQuote
                    backgroundColor="bg-primary"
                    textColor="text-white"
                    fontSize="text-2xl"
                    width="max-w-3xl"
                    value={
                        <>
                            <span className="text-red">I feel so welcome to just be my true self here,</span> while also
                            being able to get consistent and honest feedback on how I can improve myself even further.{' '}
                            <span className="text-gray">
                                (Also, I made a TikTok of our company offsite in Portugal and my CEO made an account and
                                liked it, so that was cool.)
                            </span>
                        </>
                    }
                    author="Li Yi Yu"
                    role="Full Stack Engineer"
                    img={
                        <StaticImage
                            width={100}
                            height={100}
                            imgClassName="rounded-full bg-yellow"
                            alt={`Li Yi Yu - Full Stack Engineer`}
                            src="../components/TeamQuote/images/li.png"
                        />
                    }
                />
                <Benefits />
                <TeamQuote
                    backgroundColor=""
                    fontSize="text-3xl"
                    width="max-w-4xl"
                    value={
                        <>
                            Working at PostHog{' '}
                            <span className="text-red">
                                feels like successfully having a lot of cooks in the kitchen.
                            </span>{' '}
                            (People might not believe this or find it alarming, so proceed with caution!)
                        </>
                    }
                    author="Eric Duong"
                    role="Software Engineer"
                    img={
                        <StaticImage
                            width={100}
                            height={100}
                            imgClassName="rounded-full bg-blue"
                            alt={`Eric Duong - Software Engineer`}
                            src="../components/TeamQuote/images/eric.png"
                        />
                    }
                />
                <WorkingAtPostHog />
                <TeamQuote
                    backgroundColor="bg-black"
                    textColor="text-white"
                    fontSize="text-4xl"
                    width="max-w-4xl"
                    value={
                        <>
                            {' '}
                            <span className="text-red">Things are transparent and people welcome my feedback.</span> I
                            love this because I can make a difference not just for my team, but the entire company.
                        </>
                    }
                    author="Neil Kakkar"
                    role="Software Engineer"
                    img={
                        <StaticImage
                            width={100}
                            height={100}
                            imgClassName="rounded-full bg-yellow"
                            alt={`Neil Kakkar - Software Engineer`}
                            src="../components/TeamQuote/images/neil.png"
                        />
                    }
                />
                <OpenRoles />
            </div>
        </Layout>
    )
}

const query = graphql`
    query CareersQuery {
        allAshbyJobPosting(sort: { fields: publishedDate, order: DESC }) {
            nodes {
                publishedDate
                title
            }
        }
    }
`

export default IndexPage
