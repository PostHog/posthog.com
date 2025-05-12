import Layout from 'components/Layout'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { CareersHero } from '../components/Careers/CareersHero'
import { OpenRoles } from '../components/Careers/OpenRoles'
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
import OSTabs from 'components/OSTabs'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { Select } from 'components/RadixUI/Select'
import { productMenu, companyMenu } from '../navs'
import { useNavigate, useLocation } from '@gatsbyjs/reach-router'

const IndexPage = () => {
    const data = useStaticQuery(query)
    const latestJob = data?.allAshbyJobPosting?.nodes && data.allAshbyJobPosting.nodes[0]
    const latestJobCreatedAt = latestJob && new Date(latestJob['publishedDate'])

    const breakpoints = useBreakpoint()
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname.replace('/', '')

    const tabs = [
        {
            value: 'roles',
            label: 'Open roles',
            content: <CareersHero />,
        },
        {
            value: 'small-teams',
            label: 'Small teams',
            content: <SmallTeams />,
        },
        {
            value: 'pizza',
            label: 'Pineapple on pizza?',
            content: <Pizza />,
        },
        {
            value: 'salary',
            label: 'Salary calculator',
            content: <Compensation />,
        },
        {
            value: 'interview-process',
            label: 'Interview process',
            content: <InterviewProcessOverview />,
        },
        
        
    ]

    const selectOptions = [
        {
            label: 'Company',
            items: [
                { value: 'company', label: 'Company', icon: companyMenu.icon },
                ...companyMenu.children.map((item) => ({
                    value: item.url?.replace('/', '') || item.name.toLowerCase(),
                    label: item.name,
                    icon: item.icon,
                    color: item.color || undefined,
                })),
            ],
        },
    ]

    return (
        <>
            <SEO
                title="Careers - PostHog"
                description="We're working to increase the number of successful products in the world.
                Adventurers needed."
                image={`${process.env.GATSBY_CLOUDFRONT_OG_URL}/careers.jpeg${
                    latestJobCreatedAt ? `?${latestJobCreatedAt.getTime()}` : ''
                }`}
                imageType="absolute"
            />

            <HeaderBar showHome showBack showForward showSearch />
            <div data-scheme="secondary" className="bg-primary px-2">
            <Select
                groups={selectOptions}
                placeholder="Select a page"
                ariaLabel="Select a page"
                defaultValue={currentPath}
                onValueChange={(value) => navigate(`/${value}`)}
                className="w-full"
                dataScheme="primary"
            />
            </div>

            <OSTabs tabs={tabs} defaultValue="roles" />

            
            <FounderNote />
            <MegaQuote />
            <CompanyHandbook />
            <NoHatingAllowed data={CareersCards} youllHate="working here" size="text-4xl lg:text-5xl" />
            <IdealEmployeeProfile />
            <BenefitsUnexpected />
            <BenefitsUsual />
            
            <Transparency />
            <FunStuff />
            <TeamQuotes />
            <OpenRoles /> 
           
        </>
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
