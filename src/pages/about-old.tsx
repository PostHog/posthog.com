import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { AboutHero } from 'components/About/AboutHero'
import { AboutAnchorScrollNavbar } from 'components/About/AboutAnchorScrollNavbar'
import { AboutStory } from 'components/About/AboutStory'
import { AboutTransparency } from 'components/About/AboutTransparency'
import { AboutTeam } from 'components/About/AboutTeam'
import { AboutInvestors } from 'components/About/AboutInvestors'
import { AboutBlog } from 'components/About/AboutBlog'
import Explorer from 'components/Explorer'

const AboutPage = () => {
    return (
        <Explorer template="generic" slug="about" title="About PostHog">
            <SEO
                title="About PostHog"
                description="PostHog is building the world's first open source Product OS."
                image={`/images/about.png`}
            />

            <AboutHero />
            <AboutAnchorScrollNavbar />
            <AboutStory />
            <AboutTransparency />
            <AboutTeam />
            <AboutInvestors />
            <AboutBlog />
        </Explorer>
    )
}

export default AboutPage
