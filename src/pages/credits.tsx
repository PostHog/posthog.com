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
            <p>Fun things you can find here:</p>
            <ol>
              <li>About → Display options</li>
              <li><Link to="/games" state={{ newWindow: true }}>Games</Link></li>
              <li>Page editor (<Link to="/customers" state={{ newWindow: true }}>notable customers.mdx</Link>)</li>
            </ol>
        </Editor>
    )
}

export default CreditsPage
