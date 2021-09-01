import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { CareersHero } from '../components/Careers/CareersHero'
import { AnchorScrollNavbar } from '../components/AnchorScrollNavbar'
import { WhyWereHere } from '../components/Careers/WhyWereHere'
import { Transparency } from '../components/Careers/Transparency'
import { InterviewProcess } from '../components/Careers/InterviewProcess'
import { Benefits } from '../components/Careers/Benefits'
import { WorkingAtPostHog } from '../components/Careers/WorkingAtPostHog'
import { OpenRoles } from '../components/Careers/OpenRoles'
import { GetStartedModal } from 'components/GetStartedModal'
import { SEO } from '../components/seo'
import { TeamQuote } from '../components/TeamQuote'
import Layout from 'components/Layout'
import '../components/Careers/styles/index.scss'

const IndexPage = () => {
    return (
        <Layout>
            <SEO
                title="Careers - PostHog"
                description="We're working to increase the number of successful products in the world.
                We could use your help."
            />

            <CareersHero />
            <div className="careers-anchor-navbar">
                <WhyWereHere />
                <AnchorScrollNavbar />
                <Transparency />
                <TeamQuote
                    backgroundColor="bg-primary"
                    textColor="text-white"
                    fontSize=""
                    width="max-w-4xl"
                    value={
                        <>
                            I love PostHog's level of autonomy and transparency.{' '}
                            <span className="text-red"> We have a lot of freedom and trust in the team,</span> but we
                            also hold each other accountable and don’t shy away from giving (and receiving) a lot of
                            feedback. Plus the team helped me to pick up some basic coding skills, which is amazing!"
                        </>
                    }
                    author="Eltje Lange"
                    role="People & Talent"
                    img={
                        <StaticImage
                            width={100}
                            height={100}
                            className="rounded-full bg-tan"
                            alt={`Eltje Lange - People & Talent`}
                            src="../components/TeamQuote/images/Eltje.png"
                        />
                    }
                />
                <InterviewProcess />
                <TeamQuote
                    backgroundColor="bg-primary"
                    textColor="text-tan"
                    fontSize=""
                    width="max-w-2xl"
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
                            className="rounded-full bg-red"
                            alt={`Charles Cook - Business Operations`}
                            src="../components/TeamQuote/images/Charles.png"
                        />
                    }
                />
                <Benefits />
                <TeamQuote
                    backgroundColor=""
                    textColor="text-primary"
                    fontSize="text-2xl"
                    width="max-w-3xl"
                    value={
                        <>
                            It's a lot of fun and a unique experience to get to{' '}
                            <span className="text-red">work with people from all over the world</span> around a unified
                            goal.
                        </>
                    }
                    author="Kunal Pathak"
                    role="Growth Engineer"
                    img={
                        <StaticImage
                            width={100}
                            height={100}
                            className="rounded-full bg-yellow"
                            alt={`Kunal Pathak - Growth Engineer`}
                            src="../components/TeamQuote/images/Kunal.png"
                        />
                    }
                />
                <WorkingAtPostHog />
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
                            className="rounded-full bg-blue"
                            alt={`Eric Duong - Software Engineer`}
                            src="../components/TeamQuote/images/Eric.png"
                        />
                    }
                />
                <OpenRoles />
            </div>
            <GetStartedModal />
        </Layout>
    )
}

export default IndexPage
