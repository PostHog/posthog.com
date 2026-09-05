import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import Hero from 'components/FieldGuide/Hero'
import NaturalistIntro from 'components/FieldGuide/NaturalistIntro'
import HowToUse from 'components/FieldGuide/HowToUse'
import TableOfContents from 'components/FieldGuide/TableOfContents'

export default function FieldGuide(): JSX.Element {
    // Scroll to an in-page section when linked via /field-guide#<id> (from the TOC).
    React.useEffect(() => {
        if (typeof window === 'undefined' || !window.location.hash) return
        const id = window.location.hash.slice(1)
        const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        const t = setTimeout(scroll, 350)
        return () => clearTimeout(t)
    }, [])

    return (
        <>
            <SEO
                title="The Field Guide to Wild Users - PostHog"
                description="A field guide to the species of users you'll spot in your session replays."
                image={`/images/og/default.png`}
            />
            <ReaderView
                leftSidebar={<TableOfContents />}
                hideRightSidebar
                hideTitle
                showQuestions={false}
                showAbout={false}
                padding={false}
                contentMaxWidthClass="max-w-none"
            >
                <Hero />
                <NaturalistIntro />
                <HowToUse />
            </ReaderView>
        </>
    )
}
