import React from 'react'

import { CareersHero } from '../components/Careers/CareersHero'
import { AnchorScrollNavbar } from '../components/AnchorScrollNavbar'
import { WhyWereHere } from '../components/Careers/WhyWereHere'
import { Culture } from '../components/Careers/Culture'
import { InterviewProcess } from '../components/Careers/InterviewProcess'
import { Benefits } from '../components/Careers/Benefits'
import { WorkingAtPostHog } from '../components/Careers/WorkingAtPostHog'
import { OpenRoles } from '../components/Careers/OpenRoles'
import { Footer } from '../components/Footer/Footer'
import { GetStartedModal } from 'components/GetStartedModal'
import { SEO } from '../components/seo'

import '../components/Careers/styles/index.scss'

const IndexPage = () => {
    return (
        <div>
            {/* @todo update SEO */}
            <SEO
                title="PostHog - Open-Source Product Analytics"
                description="Self-hosted product analytics stack, to deploy on your infrastructure."
            />

            <CareersHero />
            <div className="careers-anchor-navbar">
                <AnchorScrollNavbar />
                <WhyWereHere />
                <Culture />
                <InterviewProcess />
                <Benefits />
                <WorkingAtPostHog />
                <OpenRoles />
            </div>
            <Footer showNewsletter={false} backgroundClass="careers-footer" />
            <GetStartedModal />
        </div>
    )
}

export default IndexPage
