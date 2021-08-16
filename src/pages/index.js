import React from 'react'

import { Header } from '../components/Header'
import { Hero } from '../components/LandingPage/Hero'
import { Features } from '../components/LandingPage/Features'
import { Blockquote } from '../components/LandingPage/Blockquote'
import { PrivateCloud } from '../components/LandingPage/PrivateCloud'
import { Tutorials } from '../components/LandingPage/Tutorials'
import { RecentBlogPosts } from '../components/LandingPage/RecentBlogPosts'
import { Footer } from '../components/Footer/Footer'
import { GetStartedModal } from 'components/GetStartedModal'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import { useValues } from 'kea'

import { SEO } from '../components/seo'

import '../components/LandingPage/styles/index.scss'

const IndexPage = () => {
    useValues(posthogAnalyticsLogic) // mount this logic
    return (
        <div className="w-screen overflow-x-hidden">
            <SEO
                title="PostHog - Open-Source Product Analytics"
                description="Self-hosted product analytics stack, to deploy on your infrastructure."
            />
            <Header onPostPage={false} menuActiveKey="active" onHomePage />
            <Hero />
            <Features />
            <Blockquote />
            <PrivateCloud />
            <Tutorials />
            <RecentBlogPosts />
            <Footer showNewsletter />
            <GetStartedModal />
        </div>
    )
}

export default IndexPage
