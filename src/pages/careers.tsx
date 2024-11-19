import Layout from 'components/Layout'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import { CareersHero } from '../components/Careers/CareersHero'
import { OpenRoles } from '../components/Careers/OpenRoles'
import '../components/Careers/styles/index.scss'
import { Transparency } from '../components/Careers/Transparency'
import { SEO } from '../components/seo'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import MegaQuote from 'components/Careers/MegaQuote'
import CompanyHandbook from 'components/Careers/Handbook'
import NoHatingAllowed from '../components/NoHatingAllowed'
import { CareersCards } from '../components/NoHatingAllowed/data.js'
import IdealEmployeeProfile from 'components/Careers/IdealEmployeeProfile'
import BenefitsUnexpected from 'components/Careers/BenefitsUnexpected'
import BenefitsUsual from 'components/Careers/BenefitsUsual'
import Compensation from 'components/Careers/Compensation'
import { FounderNote } from 'components/Careers/FounderNote'
import { InterviewProcessOverview } from 'components/Careers/InterviewProcessOverview'
import TeamQuotes from 'components/Careers/TeamQuotes'
import { SmallTeams } from 'components/Careers/SmallTeams'
import { Pizza } from 'components/Careers/Pizza'
import FunStuff from 'components/Careers/FunStuff'
import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player'
import { motion } from 'framer-motion'

const Hogzilla = ({ onComplete }: { onComplete: () => void }) => {
    const [ready, setReady] = useState(false)
    return (
        <div>
            {!ready && <div className="h-screen w-full bg-tan fixed z-40" />}
            {ready && (
                <>
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 3.8 }}
                        className="h-screen w-full bg-tan fixed z-40"
                    />
                    <motion.div
                        initial={{ width: '50%' }}
                        animate={{ width: 0 }}
                        transition={{ duration: 1, delay: 3.8 }}
                        className="h-screen bg-tan fixed z-50"
                    />
                </>
            )}
            <div className="fixed top-0 left-0 w-full h-full z-[999999]">
                <DotLottiePlayer
                    onEvent={(event) => {
                        if (event === PlayerEvents.Complete) {
                            onComplete()
                        }
                        if (event === PlayerEvents.Ready) {
                            setReady(true)
                        }
                    }}
                    src="/lotties/careers/hogzilla.lottie"
                    autoplay
                />
            </div>
        </div>
    )
}

const IndexPage = () => {
    const data = useStaticQuery(query)
    const latestJob = data?.allAshbyJobPosting?.nodes && data.allAshbyJobPosting.nodes[0]
    const latestJobCreatedAt = latestJob && new Date(latestJob['publishedDate'])
    const [showHogzilla, setShowHogzilla] = useState(true)

    return (
        <Layout>
            <SEO
                title="Careers - PostHog"
                description="We're working to increase the number of successful products in the world.
                Adventurers needed."
                image={`${process.env.GATSBY_CLOUDFRONT_OG_URL}/careers.jpeg${
                    latestJobCreatedAt ? `?${latestJobCreatedAt.getTime()}` : ''
                }`}
                imageType="absolute"
            />
            {showHogzilla && <Hogzilla onComplete={() => setShowHogzilla(false)} />}
            <CareersHero />
            <SmallTeams />
            <Pizza />
            <FounderNote />
            <MegaQuote />
            <CompanyHandbook />
            <NoHatingAllowed data={CareersCards} youllHate="working here" size="text-4xl lg:text-5xl" />
            <IdealEmployeeProfile />
            <BenefitsUnexpected />
            <BenefitsUsual />
            <Compensation />
            <InterviewProcessOverview />
            <Transparency />
            <FunStuff />
            <TeamQuotes />
            <OpenRoles />
            <br />
            <br />
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
