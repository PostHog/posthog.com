import React from 'react'

import { CareersHero } from '../components/Careers/CareersHero'
import { AnchorScrollNavbar } from '../components/AnchorScrollNavbar'
import { WhyWereHere } from '../components/Careers/WhyWereHere'
import { Transparency } from '../components/Careers/Transparency'
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
        <>
            <SEO
                title="Careers - PostHog"
                description="Why We're Here PostHog is increasing the number of successful products in the world. We do that by providing a platform for open-source product…"
            />

            <CareersHero />
            <div className="careers-anchor-navbar">
                <AnchorScrollNavbar />
                <WhyWereHere />
                <Transparency />
                <InterviewProcess />
                <Benefits />
                <WorkingAtPostHog />
                <OpenRoles />
            </div>
            <Footer showNewsletter={false} backgroundClass="careers-footer" />
            <GetStartedModal />
        </>
    )
}

export default IndexPage
