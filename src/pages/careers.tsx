import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import { CareersHero } from '../components/Careers/CareersHero'
import { OpenRoles } from '../components/Careers/OpenRoles'
import { Transparency } from '../components/Careers/Transparency'
import { SEO } from '../components/seo'
import MegaQuote from 'components/Careers/MegaQuote'
import CompanyHandbook from 'components/Careers/Handbook'
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
import { JobListings } from 'components/Careers/JobListings'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { IconList } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import Tooltip from 'components/RadixUI/Tooltip'

const careersTableOfContents = [
    { url: '#hero', value: 'Open roles', depth: 0 },
    { url: '#small-teams', value: 'Small teams', depth: 0 },
    { url: '#pizza', value: 'Does pineapple belong on pizza?', depth: 0 },
    { url: '#compensation', value: 'Compensation', depth: 0 },
    { url: '#interview-process', value: 'Interview process', depth: 0 },
    { url: '#note', value: 'Founder note', depth: 0 },
    { url: '#quote', value: 'A really long quote', depth: 0 },
    { url: '#handbook', value: 'Company handbook', depth: 0 },
    { url: '#iep', value: 'IEP (Ideal employee profile)', depth: 0 },
    { url: '#unexpected-benefits', value: 'Unexpected benefits', depth: 0 },
    { url: '#benefits', value: 'The normal benefits', depth: 0 },
    { url: '#transparency', value: 'Transparency', depth: 0 },
    { url: '#fun-stuff', value: 'Fun stuff', depth: 0 },
    { url: '#team-quotes', value: 'Team quotes', depth: 0 },
]

const IndexPage = () => {
    const data = useStaticQuery(query)
    const latestJob = data?.allAshbyJobPosting?.nodes && data.allAshbyJobPosting.nodes[0]
    const latestJobCreatedAt = latestJob && new Date(latestJob['publishedDate'])
    const [showTableOfContents, setShowTableOfContents] = useState(false)

    const { handleTabChange, tabs, tabContainerClassName, className } = useCompanyNavigation({
        value: '/careers',
        content: (
            <ScrollArea className="h-full max-w-screen-xl mx-auto">
                <div className="fixed bottom-4 right-4 z-20">
                    <Popover
                        trigger={
                            <span className="[&>span>div]:rounded-full">
                                <Tooltip
                                    trigger={
                                        <OSButton
                                            icon={<IconList />}
                                            size="lg"
                                            className="size-10 p-1 rounded-full border shadow-lg bg-primary border-primary hover:bg-accent active:bg-accent hover:border-input"
                                        ></OSButton>
                                    }
                                    delay={0}
                                    sideOffset={12}
                                >
                                    Table of contents
                                </Tooltip>
                            </span>
                        }
                        dataScheme="primary"
                        contentClassName="w-64"
                        sideOffset={10}
                        open={showTableOfContents}
                        onOpenChange={setShowTableOfContents}
                    >
                        <ul className="not-prose grid list-none m-0 p-0">
                            {careersTableOfContents.map((item) => (
                                <li key={item.url}>
                                    <button
                                        className="font-semibold text-sm hover:underline block p-1"
                                        onClick={() => {
                                            setShowTableOfContents(false)
                                            const el = document.querySelector(item.url)
                                            if (!el) return
                                            el.scrollIntoView({ behavior: 'smooth' })
                                        }}
                                    >
                                        {item.value}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Popover>
                </div>
                <div className="max-w-7xl mx-auto">
                    <div id="hero" className="p-2">
                        <CareersHero />
                        <JobListings />
                    </div>
                    <div id="small-teams">
                        <SmallTeams />
                    </div>
                    <div id="pizza">
                        <Pizza />
                    </div>
                    <div id="compensation">
                        <Compensation />
                    </div>
                    <div id="interview-process">
                        <InterviewProcessOverview />
                    </div>
                    <div id="note">
                        <FounderNote />
                    </div>
                    <div id="quote">
                        <MegaQuote />
                    </div>
                    <div id="handbook">
                        <CompanyHandbook />
                    </div>
                    <div id="iep">
                        <IdealEmployeeProfile />
                    </div>
                    <div id="unexpected-benefits">
                        <BenefitsUnexpected />
                    </div>
                    <div id="benefits">
                        <BenefitsUsual />
                    </div>
                    <div id="transparency">
                        <Transparency />
                    </div>
                    <div id="fun-stuff">
                        <FunStuff />
                    </div>
                    <div id="team-quotes">
                        <TeamQuotes />
                    </div>
                    <div id="open-roles">
                        <OpenRoles />
                    </div>
                </div>
            </ScrollArea>
        ),
    })

    return (
        <>
            <SEO
                title="Careers - PostHog"
                description="We're working to increase the number of successful products in the world. Adventurers needed."
                image={`${process.env.GATSBY_CLOUDFRONT_OG_URL}/careers.jpeg${
                    latestJobCreatedAt ? `?${latestJobCreatedAt.getTime()}` : ''
                }`}
                imageType="absolute"
            />
            <Editor
                type="careers"
                maxWidth="100%"
                proseSize="base"
                bookmark={{
                    title: 'Careers',
                    description: 'Join the PostHog team',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/careers"
                    onValueChange={handleTabChange}
                    frame={false}
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                />
            </Editor>
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
