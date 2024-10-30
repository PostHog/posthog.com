import Layout from 'components/Layout'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
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
                image={`${process.env.GATSBY_CLOUDFRONT_OG_URL}/careers.jpeg${
                    latestJobCreatedAt ? `?${latestJobCreatedAt.getTime()}` : ''
                }`}
                imageType="absolute"
            />

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
