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
import { Footer } from '../components/Footer/Footer'
import { GetStartedModal } from 'components/GetStartedModal'
import { SEO } from '../components/seo'

import '../components/Careers/styles/index.scss'

const IndexPage = () => {
    return (
        <>
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
                <div className="bg-primary">
                    <blockquote className="max-w-4xl mx-auto py-16">
                        <h4 className="leading-snug text-white">
                            I love PostHog's level of autonomy and transparency.{' '}
                            <span className="text-red">We have a lot of freedom and trust in the team,</span> but we
                            also hold each other accountable and don’t shy away from giving (and receiving) a lot of
                            feedback. Plus the team helped me to pick up some basic coding skills, which is amazing!
                        </h4>
                        <footer className="flex mt-4">
                            <div className="flex-0 mr-4">
                                <StaticImage
                                    width={100}
                                    height={100}
                                    alt="Eltje Lange, People & Talent"
                                    src="../../contents/images/team/Eltje.png"
                                    className="rounded-full bg-tan"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <h4 className="text-white mb-0 leading-tight">Eltje Lange</h4>
                                <h4 className="text-white text-opacity-50 mb-0 leading-tight">People &amp; Talent</h4>
                            </div>
                        </footer>
                    </blockquote>
                </div>
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
