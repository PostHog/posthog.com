import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import Hero from 'components/FieldGuide/Hero'
import NaturalistIntro from 'components/FieldGuide/NaturalistIntro'
import GuideBody from 'components/FieldGuide/GuideBody'
import TableOfContents from 'components/FieldGuide/TableOfContents'

export default function FieldGuide(): JSX.Element {
    // Scroll to an in-page section when linked via /field-guide#<id> (from the TOC, or
    // from a species entry's "Back to the map"). The plate and the hogs load late and
    // push the target down, so one scroll lands short: keep re-aligning until the
    // anchor settles at the top, and give way the moment the reader scrolls themselves.
    React.useEffect(() => {
        if (typeof window === 'undefined' || !window.location.hash) return
        const id = window.location.hash.slice(1)
        let timer: ReturnType<typeof setTimeout>
        let waited = 0
        let ticks = 0
        let settled = 0
        const stop = () => {
            clearTimeout(timer)
            window.removeEventListener('wheel', stop)
            window.removeEventListener('touchmove', stop)
        }
        const align = () => {
            const el = document.getElementById(id)
            // The section may not have mounted yet, so wait for it rather than racing a
            // fixed delay — a one-shot scroll lands at the top of the page instead.
            if (!el) {
                if (++waited < 250) timer = setTimeout(align, 120)
                else stop()
                return
            }
            if (Math.abs(el.getBoundingClientRect().top) > 4) {
                el.scrollIntoView({ block: 'start' })
                settled = 0
            } else {
                settled++
            }
            // Then hold it there until the art below stops shifting it. On a settled page
            // this exits in under half a second.
            if (settled < 3 && ++ticks < 60) timer = setTimeout(align, 120)
            else stop()
        }
        window.addEventListener('wheel', stop, { passive: true })
        window.addEventListener('touchmove', stop, { passive: true })
        timer = setTimeout(align, 100)
        return stop
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
                <GuideBody />
                <NaturalistIntro />
            </ReaderView>
        </>
    )
}
