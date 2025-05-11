import React from 'react'
import { SEO } from 'components/seo'
import Editor from 'components/Editor'
import Link from 'components/Link'

const CreditsPage = () => {
    return (
        <Editor slug="credits" title="About this website">
            <SEO
                title="About this website"
                description="PostHog is building the world's first open source Product OS."
                image={`/images/about.png`}
            />
            <p>There’s a problem with many large websites. Often times, you want to reference content on different pages. Browsers invented tabs, but it feel more like a bandaid than a solution.</p>
            <p>AI offers the promise of getting all the content you need on a single page, but it requires:</p>
            <ul className="mb-3">
                <li>knowing the question you want to ask.</li>
                <li>trusting that the AI will provide accurate information.</li>
            </ul>
            <p>As website creators, we can organize the content as best we can, but we’ll never overcome the natural human behavior of wanting to explore on our own.</p>
            <p>So instead of fighting this, we built PostHog.com to act more like an operating system where you can multi-task and open multiple pages simultaneously. And since we all know how to use an OS, there's not much of a learning curve.</p>
            <p>This also lends toward breaking out of the mold of whitespace and simplicity in exchange for power and information density – something important to our audience.</p>
            <p>So welcome to the new PostHog.com. Be curious, click on things, and discover all the easter eggs that we hope will spark joy in your experience.</p>

            <p>
                &mdash; Cory &amp; Eli<br />
                <Link to="/teams/website-vibes" state={{ newWindow: true }}>Website & Vibes Team</Link>
            </p>
        </Editor>
    )
}

export default CreditsPage
