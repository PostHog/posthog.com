import { GetStartedModal } from 'components/GetStartedModal'
import Layout from 'components/Layout'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { AnchorScrollNavbar } from '../components/AnchorScrollNavbar'
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

const IndexPage = () => {
    const data = useStaticQuery(query)
    const latestJob = data?.allJobs?.nodes && data.allJobs.nodes[0]
    const latestJobCreatedAt = latestJob && new Date(latestJob['created_at'])

    return (
        <Layout>
            <SEO
                title="Careers - PostHog"
                description="We're working to increase the number of successful products in the world.
                We could use your help."
                image={`/og-images/careers.jpeg${latestJobCreatedAt ? `?${latestJobCreatedAt.getTime()}` : ''}`}
            />

            <CareersHero />
            <div className="careers-anchor-navbar">
                <WhyWereHere />
                <AnchorScrollNavbar />
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
                            src="../components/TeamQuote/images/Li.png"
                        />
                    }
                />
                <Benefits />
                <TeamQuote
                    backgroundColor=""
                    textColor="text-primary"
                    fontSize="text-2xl"
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
                    backgroundColor=""
                    textColor="text-primary"
                    fontSize="text-4xl"
                    width="max-w-4xl"
                    value={
                        <>
                            I'm not sure I've ever been more productive at work.{' '}
                            <span className="text-red">
                                I look forward to meeting-free Tuesdays and Thursdays almost as much as weekends.
                            </span>
                        </>
                    }
                    author="Chris Clark"
                    role="Product Designer"
                    img={
                        <StaticImage
                            width={100}
                            height={100}
                            imgClassName="rounded-full bg-yellow"
                            alt={`Chris Clark - Product Designer`}
                            src="../components/TeamQuote/images/chris.png"
                        />
                    }
                />
                <OpenRoles />
            </div>
            <GetStartedModal />
        </Layout>
    )
}

const query = graphql`
    query CareersQuery {
        allJobs(sort: { fields: created_at, order: DESC }) {
            nodes {
                created_at
                title
            }
        }
    }
`

export default IndexPage
