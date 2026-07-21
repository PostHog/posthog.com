import React from 'react'
import SEO from 'components/seo'
import Test from '../components/Home/Test'

export default function Home() {
    return (
        <>
            <SEO
                title="PostHog – We make your product self-driving"
                updateWindowTitle={false}
                description="PostHog automatically diagnoses problems, fixes bugs, and generates pull requests – all without you having to prompt it."
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
