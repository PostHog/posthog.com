import React from 'react'
import SEO from 'components/seo'
import Test from '../components/Home/Test'

export default function Home() {
    return (
        <>
            <SEO
                title="PostHog – We make your product self-driving"
                updateWindowTitle={false}
                description="All your developer tools in one place. PostHog gives engineers everything to build, test, measure, and ship successful products faster. Get started free."
                image="/images/og/default.png"
                languageAlternates={[
                    { hrefLang: 'en', href: '/' },
                    { hrefLang: 'ko', href: '/ko' },
                    { hrefLang: 'x-default', href: '/' },
                ]}
            />
            <Test />
        </>
    )
}
