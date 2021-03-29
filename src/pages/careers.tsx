import React from 'react'
import scrollTo from 'gatsby-plugin-smoothscroll'

import { Header } from '../components/Header'
import { CallToAction } from '../components/CallToAction'
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

            <div className="careers-hero">
                <Header
                    onPostPage={false}
                    isBlogArticlePage={false}
                    isHomePage={true}
                    menuActiveKey="active"
                    transparentBackground={true}
                />

                <div className="w-11/12 pt-12 sm:py-24 mx-auto text-center relative z-10 rounded">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-white mb-0 pb-0 text-3xl">
                            We’re working to increase the number of successful products in the world
                        </h1>

                        <CallToAction
                            icon="down-arrow"
                            onClick={() => scrollTo('#open-roles')}
                            type="primary"
                            width="72"
                            className="my-12"
                        >
                            View open roles
                        </CallToAction>
                    </div>
                </div>
            </div>

            <div className="careers-anchor-navbar">
                <AnchorScrollNavbar />
                <WhyWereHere />
                <Culture />
                <InterviewProcess />
                <Benefits />
                <WorkingAtPostHog />
                <OpenRoles />
            </div>
            <Footer showNewsletter={false} />
            <GetStartedModal />
        </div>
    )
}

export default IndexPage
