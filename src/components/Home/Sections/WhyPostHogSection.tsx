import React from 'react'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import SupportSmallTeamLink from 'components/Home/SupportSmallTeamLink'

export const WhyPostHogSection = () => (
    <div id="why-posthog">
        <h2>Why PostHog?</h2>

        <Markdown>{`We're different from most companies for a bunch of reasons:

- **Transparency.** You can read our [company handbook](/handbook), our [sales manual](/handbook/growth/sales/overview), and [company strategy](/handbook/why-does-posthog-exist).
- **We ship fast.** See our [changelog](/changelog).`}</Markdown>

        <ul>
            <li>
                <strong>
                    <em>Actually</em>-technical support.
                </strong>{' '}
                Our <SupportSmallTeamLink /> all have engineering backgrounds.
            </li>
        </ul>

        <Link to="/about" state={{ newWindow: true }}>
            Read more about us
        </Link>
    </div>
)

export default WhyPostHogSection
